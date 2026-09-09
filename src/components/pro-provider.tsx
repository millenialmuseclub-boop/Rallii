"use client";
import { useEffect, useState } from "react";
import { ProContext } from "@/hooks/use-entitlements";
import { createProStore, type PurchaseProvider } from "@/lib/pro-store";

export function ProProvider({ children, provider }: { children: React.ReactNode; provider?: PurchaseProvider }) {
  const [store] = useState(() => createProStore(provider));
  useEffect(() => {
    const disconnect = store.connect();
    if (store.getSnapshot().purchasesAvailable) void store.refreshEntitlements();
    const refresh = () => { if (document.visibilityState === "visible" && store.getSnapshot().purchasesAvailable) void store.refreshEntitlements(); };
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("online", refresh);
    return () => { disconnect(); document.removeEventListener("visibilitychange", refresh); window.removeEventListener("online", refresh); };
  }, [store]);
  return <ProContext.Provider value={store}>{children}</ProContext.Provider>;
}
