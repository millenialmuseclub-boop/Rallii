"use client";

import { useEffect } from "react";
import { checkForOtaUpdate, markAppReady } from "@/lib/ota-updater";

export function NativeOtaUpdater() {
  useEffect(() => {
    void markAppReady();
    void checkForOtaUpdate();
  }, []);

  return null;
}
