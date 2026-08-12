import Link from "next/link";
import { PrimaryNavigation } from "@/components/primary-navigation";

export function SiteHeader() {
  return <><header className="site-header" style={{ display: "block" }}><div className="app-top-bar"><Link className="app-wordmark focus-ring" href="/" aria-label="Rallii home"><span>R</span><b>Rallii</b></Link><div className="app-top-actions"><Link className="icon-button focus-ring" href="/search" aria-label="Search journeys"><SearchIcon /></Link><Link className="app-avatar focus-ring" href="/plan" aria-label="Open Plan Journey">RJ</Link></div></div><PrimaryNavigation /></header><PrimaryNavigation mobile /></>;
}

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.25" /><path d="m15.5 15.5 4 4" /></svg>; }
