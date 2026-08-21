import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-shell site-footer__inner"><span>© {new Date().getFullYear()} Rallii Rail</span><nav aria-label="Legal information"><Link href="/pro">Rallii Rail Pro</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="https://jordypop.vercel.app" target="_blank" rel="noreferrer">JordyPop</a></nav></div></footer>;
}
