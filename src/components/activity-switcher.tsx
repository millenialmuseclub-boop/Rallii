"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ACTIVITY_PATHS_KEY, parseActivityPaths, activities, isFamilyPath, activityForPath, rememberActivity } from "@/lib/activities";

export function ActivitySwitcher() {
  const path = usePathname();
  const router = useRouter();
  const active = isFamilyPath(path) ? undefined : activityForPath(path);
  return <nav className="activity-switcher" aria-label="Rallii activities">
    {activities.map((activity) => <Link key={activity.id} href={activity.href}
      aria-current={active === activity.id ? "true" : undefined}
      onClick={event => {
        rememberActivity(activity.id);
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        try {
          const paths = parseActivityPaths(localStorage.getItem(ACTIVITY_PATHS_KEY));
          if (!isFamilyPath(path)) {
            paths[activityForPath(path)] = path + window.location.search;
            localStorage.setItem(ACTIVITY_PATHS_KEY, JSON.stringify(paths));
          }
          const remembered = paths[activity.id];
          if (remembered) { event.preventDefault(); router.push(remembered); }
        } catch { /* Use the normal link. */ }
      }}>{activity.label}</Link>)}
  </nav>;
}

