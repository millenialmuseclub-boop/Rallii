"use client";
import { useSyncExternalStore } from "react";
import { parseShoppingList, type ShoppingList } from "@/green/lib/shopping-list";

const storageKey = "rallii-green-shopping-list";
const server = () => "";
const snapshot = () => typeof window === "undefined" ? "" : localStorage.getItem(storageKey) ?? "";
function subscribe(callback: () => void) { const storage = (event: StorageEvent) => { if (event.key === storageKey) callback(); }; window.addEventListener("storage", storage); window.addEventListener("rallii-green:shopping-change", callback); return () => { window.removeEventListener("storage", storage); window.removeEventListener("rallii-green:shopping-change", callback); }; }

export function useShoppingList() {
  const raw = useSyncExternalStore(subscribe, snapshot, server);
  const list = parseShoppingList(raw || null);
  const update = (change: (current: ShoppingList) => ShoppingList) => { localStorage.setItem(storageKey, JSON.stringify(change(list))); window.dispatchEvent(new Event("rallii-green:shopping-change")); };
  return { list, update, ready: true };
}
