"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activities, isFamilyPath, activityForPath, rememberActivity } from "@/lib/activities";

export function ActivitySwitcher() {
  const path = usePathname();
  const active = isFamilyPath(path) ? undefined : activityForPath(path);
  return <nav className="activity-switcher" aria-label="Rallii activities">
    {activities.map((activity) => <Link key={activity.id} href={activity.href}
      aria-current={active === activity.id ? "true" : undefined}
      onClick={() => rememberActivity(activity.id)}>{activity.label}</Link>)}
  </nav>;
}

