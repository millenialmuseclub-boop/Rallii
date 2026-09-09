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
    canAccessRoute: (accessTier = "free") => accessTier === "free" || hasPro,
    canUseScenicAlerts: hasPro,
    // These capabilities are not implemented, even for subscribers.
    canUseOffline: false,
    canUseAdvancedSchedules: false,
    canUseCollections: hasPro,
    personalLibraryLimit: hasPro ? null : 2,
  };
}
export const defaultEntitlements = createEntitlements("free");
