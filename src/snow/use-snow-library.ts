"use client";
import { useSyncExternalStore } from "react";
import { parseSnowLibrary, snowSnapshot, subscribeToSnow, writeSnowSave } from "./library";
const serverSnapshot=()=>"";
export function useSnowLibrary(){const raw=useSyncExternalStore(subscribeToSnow,snowSnapshot,serverSnapshot);return {library:parseSnowLibrary(raw),setSave:writeSnowSave}}
