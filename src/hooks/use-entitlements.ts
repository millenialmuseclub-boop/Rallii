"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useSyncExternalStore } from "react";
import { createProStore } from "@/lib/pro-store";

export const ProContext = createContext(createProStore());
export function useEntitlements() {
  const router = useRouter();
  const store = useContext(ProContext);
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  return { ...state, openPaywall: () => router.push("/pro/"), proStatus: state.state, refreshEntitlements: store.refreshEntitlements, restorePurchases: store.restorePurchases, purchase: store.purchase };
}
