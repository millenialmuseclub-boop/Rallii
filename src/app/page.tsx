import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getRouteBySlug } from "@/data/routes";

export default function HomePage() {
  const route = getRouteBySlug("glacier-express");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="site-shell flex min-h-[62vh] items-center py-20 sm:py-28">
          <div className="max-w-4xl">
            <p className="eyebrow">Curated rail journeys</p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">Rallii</h1>
            <p className="mt-7 max-w-3xl font-serif text-3xl leading-tight text-stone-700 sm:text-5xl">
              Know where to sit, what to see, and when to look.
            </p>
            <p className="mt-7 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
              Thoughtful guides to the world’s great train journeys, built around the view outside your window.
            </p>
          </div>
        </section>

        {route ? (
          <section className="border-t border-stone-300 py-16 sm:py-24" id="featured" aria-labelledby="featured-title">
            <div className="site-shell">
              <p className="eyebrow">Featured journey</p>
              <div className="mt-5 overflow-hidden bg-[#d9dfd5] lg:grid lg:grid-cols-[1.2fr_0.8fr]">
                <div className="mountain-placeholder min-h-72 p-7 sm:min-h-96 sm:p-10" aria-label="Glacier Express photography placeholder">
                  <span className="media-note">Swiss Alps · Photography coming soon</span>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-600">{route.summary.country}</p>
                  <h2 id="featured-title" className="mt-3 font-serif text-4xl sm:text-5xl">{route.summary.name}</h2>
                  <p className="mt-3 font-serif text-xl text-stone-600">{route.summary.origin} → {route.summary.destination}</p>
                  <p className="mt-6 text-sm leading-6 text-stone-600">{route.summary.shortDescription}</p>
                  <Link className="primary-link focus-ring mt-8 self-start" href="/routes/glacier-express">
                    Explore Journey <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
