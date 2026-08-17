import type { AccessTier } from "@/types/intelligence";

export type EntitlementState = "free" | "pro" | "expired" | "purchase-pending" | "restore-successful" | "network-unavailable";
export interface Entitlements {
  state: EntitlementState;
  canAccessRoute: (accessTier?: AccessTier) => boolean;
  canUseScenicAlerts: boolean;
  canUseOffline: boolean;
  canUseAdvancedSchedules: boolean;
  personalLibraryLimit: number | null;
}

export function createEntitlements(state: EntitlementState): Entitlements {
  const hasPro = state === "pro" || state === "restore-successful";
  return {
    state,
    canAccessRoute: (accessTier = "free") => accessTier === "free" || hasPro,
    canUseScenicAlerts: hasPro,
    canUseOffline: hasPro,
    canUseAdvancedSchedules: hasPro,
    personalLibraryLimit: hasPro ? null : 2,
  };
}

export const defaultEntitlements = createEntitlements("free");
