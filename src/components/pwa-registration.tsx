"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

export function PwaRegistration() {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (!("serviceWorker" in navigator)) return;

    let refreshing = false;
    const refreshForUpdate = () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", refreshForUpdate);
    void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).then((registration) => registration.update());

    return () => navigator.serviceWorker.removeEventListener("controllerchange", refreshForUpdate);
  }, []);
  return null;
}
