import type { AccessTier } from "@/types/intelligence";

export type EntitlementState = "free" | "pro" | "expired" | "purchase-pending" | "restore-successful" | "network-unavailable";
export interface Entitlements {
  state: EntitlementState;
  isPro: boolean;
  canAccessRoute: (accessTier?: AccessTier) => boolean;
  canUseScenicAlerts: boolean;
  canUseOffline: boolean;
  canUseAdvancedSchedules: boolean;
  canUseCollections: boolean;
  personalLibraryLimit: number | null;
}
export function createEntitlements(state: EntitlementState): Entitlements {
  const hasPro = state === "pro" || state === "restore-successful";
  return {
    state, isPro: hasPro,
    // All shipped capabilities are free in this release, regardless of legacy membership.
    canAccessRoute: () => true,
    canUseScenicAlerts: true,
    // These capabilities are not implemented, even for subscribers.
    canUseOffline: false,
    canUseAdvancedSchedules: false,
    canUseCollections: true,
    personalLibraryLimit: null,
  };
}
export const defaultEntitlements = createEntitlements("free");
