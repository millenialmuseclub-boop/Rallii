import Link from "next/link";
import { CourseVisual } from "@/green/components/course-visual";
import { Suspense } from "react";
import { DiscoveryQuery } from "@/green/components/query-content";
import { LibraryActions } from "@/green/components/library-actions";
import { publishedCollections } from "@/green/data/collections";
import { publishedCourses } from "@/green/data/courses";
import { publishedDestinations } from "@/green/data/destinations";
import { publishedTrips } from "@/green/data/trips";
import { firstPhotographedSlug } from "@/green/data/media";


export default function DiscoverPage() {
  const featured = publishedCourses[0];
  const trip = publishedTrips[1]; const destination = publishedDestinations[2]; const collection = publishedCollections[3];
  const highlights = [
    { href: `/green/trips/${trip.slug}`, courseSlug: firstPhotographedSlug(trip.stops.map((stop) => stop.courseSlug)), eyebrow: "Green Trips", title: trip.title, meta: `${trip.duration} · ${trip.stops.length} courses` },
    { href: `/green/destinations/${destination.slug}`, courseSlug: firstPhotographedSlug(destination.courseSlugs), eyebrow: "Destinations", title: destination.name, meta: `${publishedDestinations.length} prepared places` },
    { href: `/green/collections/${collection.slug}`, courseSlug: firstPhotographedSlug(collection.courseSlugs), eyebrow: "Collections", title: collection.title, meta: `${publishedCollections.length} editorial paths` },
  ].map((item) => ({ ...item, course: publishedCourses.find((course) => course.slug === item.courseSlug)! }));
  return <main className="green-discovery">
    <section className="opening opening--compact shell"><div className="family-kicker"><span>Rallii Green</span><Link href="/">All activities →</Link></div><div className="opening-grid"><div className="opening-copy"><p className="eyebrow">Remarkable places to play</p><h1>Find the round worth the journey.</h1><p>Memorable courses, remarkable settings, and a whole trip beyond the eighteenth.</p><div className="opening-actions"><Link className="primary-button" href="#catalogue">Find a course</Link><Link className="text-button" href="/green/plan">Open Plan →</Link></div></div></div></section>
    <Suspense fallback={<p className="shell" role="status">Loading course discovery…</p>}><DiscoveryQuery /></Suspense>
    <section className="shell green-featured-section" aria-label="Featured course"><div className="featured featured--compact"><CourseVisual course={featured} hero /><div className="featured-copy"><p className="eyebrow">Featured · {featured.location.region}</p><h2>{featured.name}</h2><p className="headline">{featured.editorial.headline}</p><LibraryActions slug={featured.slug} /></div></div></section>
    <nav className="discover-hub discover-hub--visual shell" aria-label="Explore Rallii Green">{highlights.map((item) => <Link href={item.href} key={item.eyebrow}><CourseVisual course={item.course} compact /><div><p className="eyebrow">{item.eyebrow}</p><h2>{item.title}</h2><span>{item.meta} →</span></div></Link>)}</nav>

  </main>;
}
