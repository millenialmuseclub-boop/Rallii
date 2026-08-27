import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getRouteMedia } from "@/data/route-media";
import { railGear, railCreatorShops, type RailGearCategory } from "@/data/rail-gear";

export const metadata: Metadata = { title: "Rail Gear", description: "A concise field guide to preparing for a better rail journey." };

const themes: Array<{ category: RailGearCategory; title: string; description: string }> = [
  { category: "Pack", title: "Make every transfer easier.", description: "A few considered pieces keep platforms, stations, and arrivals calm." },
  { category: "Comfort", title: "Settle in for the long view.", description: "Small comforts make a scenic day feel spacious rather than over-packed." },
  { category: "Tech", title: "Keep the journey connected.", description: "Power and audio essentials for maps, cameras, and quiet carriage time." },
  { category: "Wear", title: "Dress for the landscape.", description: "Comfortable layers and shoes that work from the platform to the place beyond it." },
];

function GearPhoto({ routeSlug }: { routeSlug: string }) {
  const media = getRouteMedia(routeSlug);
  if (!media) return null;
  return <figure className="rail-gear-list__photo"><Image src={media.path} alt={media.alt} fill sizes="92px" quality={72} /><figcaption>Journey scene · <a href={media.sourcePageUrl} target="_blank" rel="noreferrer">{media.creator}</a></figcaption></figure>;
}

export default function GearPage() {
  return <AppScreenShell title="Rail Gear" context="A considered field guide for the platform, the carriage, and the place beyond it." backHref="/plan" backLabel="Plan">
    <section className="rail-gear-intro" aria-labelledby="rail-gear-intro-title"><p className="eyebrow">Prepare for the journey</p><h2 id="rail-gear-intro-title">Bring less. Bring what helps.</h2><p>Rallii gear notes are practical prompts, not a shopping list. Choose what suits your route, weather, and way of travelling.</p><div className="rail-gear-links"><Link className="action-button focus-ring" href="/discover">Find a journey</Link><Link className="action-button focus-ring" href="/plan">Plan around a route</Link></div></section>
    <div className="rail-gear-themes">{themes.map((theme) => { const items = railGear.filter((item) => item.category === theme.category); return <section className="rail-gear-theme" key={theme.category} aria-labelledby={`gear-${theme.category.toLowerCase()}`}><div className="rail-gear-theme__heading"><p className="eyebrow">{theme.category}</p><h2 id={`gear-${theme.category.toLowerCase()}`}>{theme.title}</h2><p>{theme.description}</p></div><ul className="rail-gear-list">{items.map((item) => <li key={item.name}><GearPhoto routeSlug={item.imageRouteSlug} /><div><h3>{item.name}</h3><p>{item.reason}</p><small>{item.suitableJourneyTypes.join(" · ")}</small></div><a className="focus-ring" href={item.href} target="_blank" rel="sponsored noreferrer">View maker ↗</a></li>)}</ul></section>; })}</div>
    <section className="rail-gear-editors" aria-labelledby="gear-editors-title"><p className="eyebrow">Editorial lists</p><h2 id="gear-editors-title">More from Rallii Rail</h2><div><a className="focus-ring" href={railCreatorShops.shopMy} target="_blank" rel="sponsored noreferrer"><strong>Jordy’s field notes</strong><span>A personal edit for long scenic days ↗</span></a><a className="focus-ring" href={railCreatorShops.ltk} target="_blank" rel="sponsored noreferrer"><strong>Travel edit</strong><span>A compact companion list ↗</span></a></div></section>
    <aside className="rail-gear-disclosure"><strong>Affiliate disclosure</strong><p>Some external links may earn Rallii a commission at no extra cost to you. Rallii does not set prices, confirm availability, or process purchases.</p></aside>
  </AppScreenShell>;
}
