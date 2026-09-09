import Link from "next/link";
import { Navigation } from "@/green/components/navigation";
import { ActivitySwitcher } from "@/components/activity-switcher";

export function SiteShell({ children }: { children: React.ReactNode }) { return <><header className="site-header"><div className="shell header-inner"><Link className="wordmark" href="/" aria-label="Rallii family home"><span>Rallii</span> Green</Link><ActivitySwitcher /><Navigation /></div></header><div className="mobile-bar"><Link className="wordmark" href="/"><span>Rallii</span> Green</Link><ActivitySwitcher /></div>{children}<footer><div className="shell"><p><b>Rallii</b> — extraordinary ways to experience a place.</p><div><p>Green is an editorial discovery guide. Confirm operational details with the course.</p><nav aria-label="Legal and support"><Link href="/green/privacy">Privacy</Link><Link href="/green/support">Support</Link><Link href="/green/about">About</Link></nav></div></div></footer><Navigation mobile /></>; }
