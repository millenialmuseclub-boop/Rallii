"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [{ href: "/green/", label: "Discover", icon: "⌁" }, { href: "/green/map", label: "Map", icon: "⌖" }, { href: "/green/compare", label: "Compare", icon: "⇄",desktopOnly:true },{href:"/green/plan",label:"Plan",icon:"□"}, { href: "/green/my-green", label: "My Green", icon: "◇" }];
export function Navigation({ mobile = false }: { mobile?: boolean }) { const path = usePathname().replace(/\/$/, "") || "/";const visible=mobile?items.filter(i=>!i.desktopOnly):items;return <nav className={mobile ? "mobile-nav" : "desktop-nav"} aria-label={mobile ? "Mobile navigation" : "Primary navigation"}><ul>{visible.map((item) => { const active = item.href === "/green/" ? path === "/green" : path.startsWith(item.href); return <li key={item.href}><Link href={item.href} aria-current={active ? "page" : undefined}><i aria-hidden="true">{item.icon}</i><span>{item.label}</span></Link></li>; })}</ul></nav>; }
