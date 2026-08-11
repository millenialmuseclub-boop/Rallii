import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell flex h-16 items-center justify-between sm:h-20">
        <Link className="font-serif text-2xl tracking-tight focus-ring" href="/" aria-label="Rallii home">
          Rallii
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-5 text-sm text-stone-600 sm:gap-7">
            <li><Link className="nav-link focus-ring" href="/#featured">Discover</Link></li>
            <li className="hidden sm:block"><span className="cursor-default" aria-disabled="true">Search</span></li>
            <li className="hidden sm:block"><span className="cursor-default" aria-disabled="true">Saved</span></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
