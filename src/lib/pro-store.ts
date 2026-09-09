import { createEntitlements } from "./entitlements.ts";

export const PRO_ENTITLEMENT = "rallii_pro";
/** Implement with verified customer information from the purchase SDK, never localStorage. */
export interface PurchaseProvider {
  refresh(): Promise<{ activeEntitlements: readonly string[] }>;
  restore(): Promise<{ activeEntitlements: readonly string[] }>;
  purchase(): Promise<{ activeEntitlements: readonly string[] } | null>;
  subscribe?(listener: (customer: { activeEntitlements: readonly string[] }) => void): () => void;
}
export function createProStore(provider?: PurchaseProvider) {
  let snapshot = { ...createEntitlements("free"), isLoadingEntitlements: false, purchasesAvailable: !!provider, error: "", message: "" };
  const serverSnapshot = snapshot;
  const listeners = new Set<() => void>();
  let revision = 0;
  let pending: Promise<void> | undefined;
  const emit = () => listeners.forEach(listener => listener());
  const apply = (customer: { activeEntitlements: readonly string[] }) => {
    snapshot = { ...snapshot, ...createEntitlements(customer.activeEntitlements.includes(PRO_ENTITLEMENT) ? "pro" : "free"), error: "" };
  };
  const run = (action: "refresh" | "restore" | "purchase"): Promise<void> => {
    if (pending) return pending;
    if (!provider) {
      snapshot = { ...snapshot, error: "Purchases and restoration are not available in this version yet." };
      emit(); return Promise.resolve();
    }
    const request = ++revision;
    snapshot = { ...snapshot, isLoadingEntitlements: true, error: "", message: "" }; emit();
    pending = Promise.resolve().then(async () => {
      try {
        const customer = await provider[action]();
        if (request !== revision) return;
        if (customer) apply(customer);
        snapshot = { ...snapshot, message: !customer ? "Purchase cancelled." : action === "restore" ? snapshot.isPro ? "Rallii Pro restored for all activities." : "No active Rallii Pro membership was found." : "" };
      } catch {
        if (request === revision) snapshot = { ...snapshot, error: "We could not check your membership. Check your connection and try again." };
      } finally {
        snapshot = { ...snapshot, isLoadingEntitlements: false }; pending = undefined; emit();
      }
    });
    return pending;
  };
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    refreshEntitlements: () => run("refresh"),
    restorePurchases: () => run("restore"),
    purchase: () => run("purchase"),
    connect: () => provider?.subscribe?.(customer => { revision++; apply(customer); emit(); }) ?? (() => {}),
  };
}
export type ProStore = ReturnType<typeof createProStore>;

