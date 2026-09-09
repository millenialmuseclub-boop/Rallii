// Register only released activities. Future activities own their own route namespace.
export const activities = [
  { id: "rail", label: "Rail", href: "/" },
  { id: "green", label: "Green", href: "/green/" },
] as const;
export type Activity = (typeof activities)[number]["id"];
export const ACTIVITY_KEY = "rallii:activity:v1";
export function activityForPath(path: string): Activity {
  return path === "/green" || path.startsWith("/green/") ? "green" : "rail";
}
export function launchActivity(path: string, native: boolean, saved: string | null): Activity {
  return native && path === "/" && saved === "green" ? "green" : activityForPath(path);
}
export function rememberActivity(activity: Activity) {
  try { window.localStorage.setItem(ACTIVITY_KEY, activity); } catch { /* Navigation still works when storage is unavailable. */ }
}

export function isFamilyPath(path: string): boolean {
  return /^\/(pro|my-rallii)\/?$/.test(path);
}
