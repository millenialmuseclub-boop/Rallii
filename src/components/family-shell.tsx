"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { ACTIVITY_KEY, ACTIVITY_PATHS_KEY, activities, parseActivityPaths, isFamilyPath, activityForPath, launchActivity, rememberActivity } from "@/lib/activities";
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
      if (launchActivity(path, Capacitor.isNativePlatform(), saved) !== activity || (path === "/" && Capacitor.isNativePlatform() && saved === "rail")) {
        restoring.current = true;
        let destination: string = activities.find(item => item.id === saved)?.href ?? "/rail/";
        try { destination = parseActivityPaths(localStorage.getItem(ACTIVITY_PATHS_KEY))[saved as typeof activity] ?? destination; } catch { /* Use mode home. */ }
        router.replace(destination);
        return;
      }
    }
    if (restoring.current && path === "/") return;
    restoring.current = false;
    if (!isFamilyPath(path)) {
      rememberActivity(activity);
      try {
        const paths = parseActivityPaths(localStorage.getItem(ACTIVITY_PATHS_KEY));
        paths[activity] = path + window.location.search;
        localStorage.setItem(ACTIVITY_PATHS_KEY, JSON.stringify(paths));
      } catch { /* Discovery works without device storage. */ }
    }
  }, [activity, path, router]);
  return <div data-experience={activity === "trail" ? "rail" : activity}>{children}{activity !== "green" ? <SiteFooter /> : null}</div>;
}
