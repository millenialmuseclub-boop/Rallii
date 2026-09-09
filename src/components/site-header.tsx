import { ActivitySwitcher } from "@/components/activity-switcher";
import Link from "next/link";
import { PrimaryNavigation } from "@/components/primary-navigation";
import { RalliiMark } from "@/components/rallii-mark";

export function SiteHeader({ family = false }: { family?: boolean }) {
  return (
    <><header className="site-header">
      <div className="site-shell flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link className="flex items-center gap-2.5 font-serif text-2xl tracking-tight focus-ring" href="/" aria-label={family ? "Rallii home" : "Rallii Rail home"}>
          <RalliiMark className="h-7 w-7 shrink-0" />
          <span>{family ? "Rallii" : "Rallii Rail"}</span>
        </Link>
        <div className="flex items-center gap-5">
          <ActivitySwitcher />
          <PrimaryNavigation />
        </div>
      </div>
    </header><div className="mobile-top-bar"><Link className="flex items-center gap-2 focus-ring" href="/"><RalliiMark className="h-6 w-6" /><span>{family ? "Rallii" : "Rallii Rail"}</span></Link><ActivitySwitcher /></div><PrimaryNavigation mobile /></>
  );
}
