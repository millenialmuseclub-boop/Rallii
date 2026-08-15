import Link from "next/link";
import { PrimaryNavigation } from "@/components/primary-navigation";

export function SiteHeader() {
  return (
    <><header className="site-header">
      <div className="site-shell flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link className="font-serif text-2xl tracking-tight focus-ring" href="/" aria-label="Rallii home">
          Rallii
        </Link>
        <PrimaryNavigation />
      </div>
    </header><div className="mobile-top-bar"><Link className="focus-ring" href="/">Rallii</Link><Link className="focus-ring" href="/saved">Saved</Link></div><PrimaryNavigation mobile /></>
  );
}
