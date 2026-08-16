import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-shell site-footer__inner"><span>© {new Date().getFullYear()} Rallii</span><nav aria-label="Legal information"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div></footer>;
}
