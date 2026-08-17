"use client";

import { defaultEntitlements } from "@/lib/entitlements";

// RevenueCat or another native purchase provider can replace this boundary later.
export function useEntitlements() { return defaultEntitlements; }
