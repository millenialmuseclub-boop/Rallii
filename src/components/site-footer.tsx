import Link from "next/link";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return <footer className={`site-footer${compact ? " site-footer--compact" : ""}`}><div className="site-shell site-footer__inner">
    {compact ? <div className="site-footer-brand"><Link href="/" aria-label="Rallii home">Rallii</Link><span>© {new Date().getFullYear()} Rallii</span></div> : <span>© {new Date().getFullYear()} Rallii</span>}
    <nav aria-label="Legal information"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
  </div></footer>;
}
