import Link from "next/link";
import { PrimaryNavigation } from "@/components/primary-navigation";
import { RalliiMark } from "@/components/rallii-mark";

export function SiteHeader() {
  return (
    <><header className="site-header">
      <div className="site-shell flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link className="flex items-center gap-2.5 font-serif text-2xl tracking-tight focus-ring" href="/" aria-label="Rallii Rail home">
          <RalliiMark className="h-7 w-7 shrink-0" />
          <span>Rallii Rail</span>
        </Link>
        <PrimaryNavigation />
      </div>
    </header><div className="mobile-top-bar"><Link className="flex items-center gap-2 focus-ring" href="/"><RalliiMark className="h-6 w-6" /><span>Rallii Rail</span></Link><Link className="focus-ring" href="/saved">Saved</Link></div><PrimaryNavigation mobile /></>
  );
}
