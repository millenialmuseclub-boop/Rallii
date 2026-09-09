"use client";

import { useCallback, useSyncExternalStore } from "react";

const fallback = new Map<string, string>();

// Session-only browsing preferences. Saved places keep their existing stores.
export function useBrowseState<T extends string>(key: string, initial: T) {
  const subscribe = useCallback((notify: () => void) => {
    window.addEventListener("rallii:browse", notify);
    return () => window.removeEventListener("rallii:browse", notify);
  }, []);
  const snapshot = useCallback(() => {
    try { return (fallback.get(key) as T | undefined) ?? (sessionStorage.getItem(key) as T | null) ?? initial; } catch { return (fallback.get(key) as T | undefined) ?? initial; }
  }, [key, initial]);
  const value = useSyncExternalStore(subscribe, snapshot, () => initial);
  const setValue = useCallback((next: T) => {
    fallback.set(key, next);
    try { sessionStorage.setItem(key, next); } catch { /* Browsing remains available. */ }
    window.dispatchEvent(new Event("rallii:browse"));
  }, [key]);
  return [value, setValue] as const;
}
