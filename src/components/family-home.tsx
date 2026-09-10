import { snowMedia } from "@/snow/media";
import Image from "next/image";
import Link from "next/link";
import { FamilyHeader } from "@/components/family-header";
import { FamilySavedPreview } from "@/components/family-saved-preview";
import { SaveRouteButton } from "@/components/save-route-button";
import { SaveTrail } from "@/trail/save-trail";
import { LibraryActions } from "@/green/components/library-actions";
import { routeMediaBySlug } from "@/data/route-media";
import { courseMedia } from "@/green/data/media";
import { trailMedia } from "@/trail/media";
import { mtbMedia } from "@/mtb/media";
import { SaveMtb } from "@/mtb/save-mtb";
import { SaveSnow } from "@/snow/save-snow";
import { TrailCredit } from "@/trail/trail-photo";
const rail = routeMediaBySlug["glacier-express"];
const green = courseMedia.find(item => item.courseSlug === "pebble-beach")!;
const modes = [
  { name: "Rail", href: "/rail/", number: "01", line: "Let the journey be the destination.", description: "Remarkable railways, the best side to sit, and the moments worth looking up for.", image: rail.path, alt: rail.alt, label: "See the world by rail", credit: rail.creator, source: rail.sourcePageUrl, license: rail.licenseName, licenseUrl: rail.licenseUrl },
  { name: "Green", href: "/green/", number: "02", line: "A great round. An even better place.", description: "Courses with character, coastal fairways and a whole trip beyond the eighteenth.", image: green.src, alt: green.alt, label: "Find a place to play", credit: green.creator, source: green.sourceUrl, license: green.license, licenseUrl: green.licenseUrl },
  { name: "Trail", href: "/trail/", number: "03", line: "Follow your curiosity outside.", description: "From forest wanderings to alpine climbs. Thirty trails to make time for.", image: trailMedia.moss.src, alt: trailMedia.moss.alt, label: "Take the trail", credit: trailMedia.moss.credit, source: trailMedia.moss.sourceUrl, license: trailMedia.moss.license, licenseUrl: trailMedia.moss.licenseUrl },
  { name: "MTB", href: "/mtb/", number: "04", line: "Find your line. Make a day of it.", description: "Forest flow, red rock and mountain descents. Thirty places worth bringing your bike.", image: mtbMedia["crested-butte"].src, alt: mtbMedia["crested-butte"].alt, label: "Find your next ride", credit: mtbMedia["crested-butte"].credit, source: mtbMedia["crested-butte"].sourceUrl, license: mtbMedia["crested-butte"].license, licenseUrl: mtbMedia["crested-butte"].licenseUrl },
  { name: "Snow", href: "/snow/", number: "05", line: "Follow winter.", description: "Mountain towns, high alpine days and twelve snow destinations to begin.", image: snowMedia["whistler-blackcomb"].src, alt: snowMedia["whistler-blackcomb"].alt, label: "Find your snow", credit: snowMedia["whistler-blackcomb"].credit, source: snowMedia["whistler-blackcomb"].sourceUrl, license: snowMedia["whistler-blackcomb"].license, licenseUrl: snowMedia["whistler-blackcomb"].licenseUrl },
];
export function FamilyHome() {
  return <><FamilyHeader /><main className="rallii-editorial">
    <section className="rallii-home-hero"><Image src={trailMedia.vernal.src} alt={trailMedia.vernal.alt} fill priority unoptimized sizes="100vw" /><div className="rallii-hero-shade" /><div className="rallii-container rallii-hero-copy"><p className="rallii-kicker">One world. More ways to experience it.</p><h1>Go somewhere<br />worth <em>remembering.</em></h1><p>Through the mountains. Along the fairway.<br />A little further down the trail.</p><a className="rallii-button rallii-button-light" href="#explore">Find your next way outside <span>↗</span></a></div><div className="rallii-container rallii-hero-caption"><span>Field notes No. 01 / Yosemite, California</span><Link href="/trail/mist-trail/">Discover Vernal Fall →</Link></div></section>
    <div className="rallii-container"><TrailCredit imageKey="vernal" /></div>
    <section id="explore" className="rallii-container rallii-section"><div className="rallii-section-heading"><div><p className="rallii-kicker">Explore Rallii</p><h2>One curiosity.<br /><em>More ways to follow it.</em></h2></div><p>For the journey, the round, the walk, the ride.<br />And everything you find along the way.</p></div>
      <div className="rallii-modes">{modes.map(mode => <article className="rallii-mode" key={mode.name}><Link className="rallii-mode-image" href={mode.href}><Image src={mode.image} alt={mode.alt} fill unoptimized sizes="(max-width: 650px) 100vw, 33vw" /><span className="rallii-mode-number">{mode.number} / Rallii</span><h3>{mode.name}</h3><span className="rallii-mode-arrow">↗</span></Link><div className="rallii-mode-copy"><h4>{mode.line}</h4><p>{mode.description}</p><Link className="rallii-text-link" href={mode.href}>{mode.label} →</Link></div><small className="trail-credit photo-credit"><a href={mode.source} target="_blank" rel="noreferrer">{mode.credit}</a> · <a href={mode.licenseUrl} target="_blank" rel="noreferrer">{mode.license}</a></small></article>)}</div>
    </section>
    <section className="rallii-featured-band"><div className="rallii-container rallii-section"><div className="rallii-section-heading"><div><p className="rallii-kicker">Featured right now / Editor’s picks</p><h2>Places that stay with you.</h2></div><p>Five very good reasons to go.</p></div><div className="rallii-featured-list">
      <article><span className="rallii-feature-index">01 / Rail</span><div><h3><Link href="/routes/glacier-express/">Glacier Express</Link></h3><p>Switzerland · A slow passage through the Alps</p></div><SaveRouteButton slug="glacier-express" /><Link className="rallii-feature-go" href="/routes/glacier-express/" aria-label="Explore Glacier Express">↗</Link></article>
      <article><span className="rallii-feature-index">02 / Green</span><div><h3><Link href="/green/courses/pebble-beach/">Pebble Beach Golf Links</Link></h3><p>California · The Pacific, in play</p></div><LibraryActions slug="pebble-beach" compact /><Link className="rallii-feature-go" href="/green/courses/pebble-beach/" aria-label="Explore Pebble Beach">↗</Link></article>
      <article><span className="rallii-feature-index">03 / Trail</span><div><h3><Link href="/trail/mist-trail/">Mist Trail to Vernal Fall</Link></h3><p>Yosemite · Granite steps and waterfall spray</p></div><SaveTrail slug="mist-trail" name="Mist Trail to Vernal Fall" compact /><Link className="rallii-feature-go" href="/trail/mist-trail/" aria-label="Explore Mist Trail">↗</Link></article>
      <article><span className="rallii-feature-index">04 / MTB</span><div><h3><Link href="/mtb/whistler-bike-park/">Whistler Mountain Bike Park</Link></h3><p>British Columbia · A mountain built around the descent</p></div><SaveMtb slug="whistler-bike-park" name="Whistler Mountain Bike Park" compact /><Link className="rallii-feature-go" href="/mtb/whistler-bike-park/" aria-label="Explore Whistler Mountain Bike Park">↗</Link></article>
      <article><span className="rallii-feature-index">05 / Snow</span><div><h3><Link href="/snow/whistler-blackcomb/">Whistler Blackcomb</Link></h3><p>British Columbia · Two mountains and a winter-built village</p></div><SaveSnow slug="whistler-blackcomb" name="Whistler Blackcomb" compact /><Link className="rallii-feature-go" href="/snow/whistler-blackcomb/" aria-label="Explore Whistler Blackcomb">↗</Link></article>
    </div></div></section>
    <FamilySavedPreview />
    <section className="rallii-container rallii-family-pro"><div><p className="rallii-kicker">Across the Rallii family</p><h2>More to your journey.<br /><em>All together.</em></h2><p>Bring Rail, Green, Trail, MTB and Snow into the same trip, with private collections and notes. Keep your plans together, wherever curiosity takes you.</p><Link className="rallii-button rallii-button-light" href="/my-rallii/">Open My Rallii ↗</Link></div><div><p className="rallii-pro-label">Plan with more possibility</p><ul><li>Trip collections across activities & private notes</li><li>Unlimited Rail saves & supported Scenic Alerts</li></ul><p className="rallii-pro-note">All available features are free.</p></div></section>
    <p className="rallii-signoff">A little curiosity goes a long way. <span>Rallii</span></p>
  </main></>;
}
