// Register only released activities. Future activities own their own route namespace.
export const activities = [
  { id: "rail", label: "Rail", href: "/rail/" },
  { id: "green", label: "Green", href: "/green/" },
  { id: "trail", label: "Trail", href: "/trail/" },
  { id: "mtb", label: "MTB", href: "/mtb/" },
  { id: "snow", label: "Snow", href: "/snow/" },
] as const;
export type Activity = (typeof activities)[number]["id"];
export const ACTIVITY_KEY = "rallii:activity:v1";
export function activityForPath(path: string): Activity {
  if (path === "/snow" || path.startsWith("/snow/")) return "snow";
  if (path === "/mtb" || path.startsWith("/mtb/")) return "mtb";
  if (path === "/trail" || path.startsWith("/trail/")) return "trail";
  return path === "/green" || path.startsWith("/green/") ? "green" : "rail";
}
export function launchActivity(path: string, native: boolean, saved: string | null): Activity {
  return native && path === "/" && (saved === "green" || saved === "trail" || saved === "mtb" || saved === "snow") ? saved : activityForPath(path);
}
export function rememberActivity(activity: Activity) {
  try { window.localStorage.setItem(ACTIVITY_KEY, activity); } catch { /* Navigation still works when storage is unavailable. */ }
}

export function isFamilyPath(path: string): boolean {
  return path === "/" || /^\/(pro|my-rallii)\/?$/.test(path);
}

export const ACTIVITY_PATHS_KEY = "rallii:activity-paths:v1";
export function parseActivityPaths(raw: string | null): Partial<Record<Activity, string>> {
  try {
    const value = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(activities.flatMap(({ id }) => {
      const path = value[id];
      return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") && !/[\\\\\u0000-\u001f]/.test(path) && !isFamilyPath(path.split(/[?#]/)[0]) && activityForPath(path.split(/[?#]/)[0]) === id ? [[id, path]] : [];
    }));
  } catch { return {}; }
}
