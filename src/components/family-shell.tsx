"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { ACTIVITY_KEY, isFamilyPath, activityForPath, launchActivity, rememberActivity } from "@/lib/activities";
import { SiteFooter } from "@/components/site-footer";

export function FamilyShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const launched = useRef(false);
  const restoring = useRef(false);
  const activity = activityForPath(path);
  useEffect(() => {
    if (!launched.current) {
      launched.current = true;
      let saved = null;
      try { saved = window.localStorage.getItem(ACTIVITY_KEY); } catch { /* Rail is the default. */ }
      if (launchActivity(path, Capacitor.isNativePlatform(), saved) !== activity) {
        restoring.current = true;
        router.replace("/green/");
        return;
      }
    }
    if (restoring.current && path === "/") return;
    restoring.current = false;
    if (!isFamilyPath(path)) rememberActivity(activity);
  }, [activity, path, router]);
  return <div data-experience={activity}>{children}{activity === "rail" ? <SiteFooter /> : null}</div>;
}

