"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ACTIVITY_PATHS_KEY, parseActivityPaths, activities, isFamilyPath, activityForPath, rememberActivity } from "@/lib/activities";

export function ActivitySwitcher({ compact = false }: { compact?: boolean }) {
  const path = usePathname();
  const router = useRouter();
  const active = isFamilyPath(path) ? undefined : activityForPath(path);
  if (compact) return <label className="phone-activity"><span className="sr-only">Switch activity</span><select value={active ?? ""} onChange={event => {
    const id = event.target.value as typeof activities[number]["id"];
    const activity = activities.find(item => item.id === id);
    if (!activity) return;
    rememberActivity(id);
    let destination: string = activity.href;
    try {
      const paths = parseActivityPaths(localStorage.getItem(ACTIVITY_PATHS_KEY));
      if (!isFamilyPath(path)) paths[activityForPath(path)] = path + window.location.search;
      localStorage.setItem(ACTIVITY_PATHS_KEY, JSON.stringify(paths));
      destination = paths[id] ?? destination;
    } catch { /* Switching also works without device storage. */ }
    router.push(destination);
  }}><option value="" disabled>Activities</option>{activities.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>;
  return <nav className="activity-switcher" aria-label="Rallii activities">
    {activities.map((activity) => <Link key={activity.id} href={activity.href} data-activity={activity.id}
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

