import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return <><SiteHeader /><main className="site-shell flex min-h-[65vh] items-center py-20"><div className="max-w-xl"><p className="eyebrow">Rallii route library</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Journey not found</h1><p className="mt-5 text-lg leading-8 text-stone-600">This route isn’t in Rallii yet.</p><Link className="primary-link focus-ring mt-8" href="/discover">Discover journeys <span aria-hidden="true">→</span></Link></div></main></>;
}
