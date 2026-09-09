import { ActivitySwitcher } from "@/components/activity-switcher";
import Link from "next/link";
import { PrimaryNavigation } from "@/components/primary-navigation";
import { RalliiMark } from "@/components/rallii-mark";

export function SiteHeader({ family = false }: { family?: boolean }) {
  return (
    <><header className="site-header">
      <div className="site-shell flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link className="rallii-site-brand focus-ring" href="/" aria-label="Rallii home">
          <RalliiMark className="h-8 w-8 shrink-0" title="Rallii" />
          <strong>Rallii</strong>{!family ? <span>/ Rail</span> : null}
        </Link>
        <div className="flex items-center gap-5">
          <ActivitySwitcher />
          <PrimaryNavigation />
        </div>
      </div>
    </header><div className="mobile-top-bar"><Link className="rallii-site-brand focus-ring" href="/"><RalliiMark className="h-7 w-7" title="Rallii" /><strong>Rallii</strong>{!family ? <span>/ Rail</span> : null}</Link><ActivitySwitcher /></div><PrimaryNavigation mobile /></>
  );
}
