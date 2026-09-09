"use client";
import { useSyncExternalStore } from "react";
import { mtbSnapshot, parseMtbLibrary, subscribeToMtb, writeMtbSave } from "./library";
const serverSnapshot = () => "";
export function useMtbLibrary() {
  const raw = useSyncExternalStore(subscribeToMtb, mtbSnapshot, serverSnapshot);
  return { library: parseMtbLibrary(raw), setSave: writeMtbSave };
}
