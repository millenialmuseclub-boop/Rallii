import Link from "next/link";
import { ActivitySwitcher } from "./activity-switcher";
import { RalliiMark } from "./rallii-mark";
export function FamilyHeader({ trail = false, mode }: { trail?: boolean; mode?: "MTB" | "Snow" }) {
  return <header className="rallii-header"><div className="rallii-container rallii-header-inner">
    <Link className="rallii-wordmark" href="/" aria-label="Rallii home"><RalliiMark title="Rallii" /><strong>Rallii</strong>{trail || mode ? <span>/ {mode ?? "Trail"}</span> : null}</Link>
    <nav className="rallii-family-nav" aria-label="Family navigation"><Link href="/">Home</Link><Link href="/#explore">Explore</Link><Link href="/my-rallii/">Saved</Link><Link href="/pro/">Pro ↗</Link></nav>
    <ActivitySwitcher />
  </div></header>;
}
