export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/search", label: "Search" },
  { href: "/plan", label: "Plan" },
  { href: "/saved", label: "Saved" },
] as const;

export function isNavigationItemActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
