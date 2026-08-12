export const primaryNavigation = [
  { href: "/discover", label: "Discover" },
  { href: "/search", label: "Search" },
  { href: "/saved", label: "My Journeys" },
] as const;

export function isNavigationItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
