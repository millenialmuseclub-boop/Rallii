import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";

export function SiteHeader() {
  return (
    <><header className="site-header">
      <div className="site-shell flex h-16 items-center justify-between sm:h-20">
        <Link className="font-serif text-2xl tracking-tight focus-ring" href="/" aria-label="Rallii home">
          Rallii
        </Link>
        <nav className="hidden sm:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-7 text-sm text-stone-600">
            <li><Link className="nav-link focus-ring" href="/discover">Discover</Link></li>
            <li><Link className="nav-link focus-ring" href="/search">Search</Link></li>
            <li><Link className="nav-link focus-ring" href="/compare">Compare</Link></li>
            <li><Link className="nav-link focus-ring" href="/saved">Saved</Link></li>
          </ul>
        </nav>
      </div>
    </header><MobileNavigation /></>
  );
}
