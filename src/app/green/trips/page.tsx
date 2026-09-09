import { EditorialCover } from "@/green/components/editorial-cover";
import { publishedTrips } from "@/green/data/trips";
export const metadata = { title: "Green Trips" };
export default function TripsPage() { return <main className="screen shell"><header className="screen-intro"><p className="eyebrow">Green Trips</p><h1>Courses that make more sense together.</h1><p>Editorial sequences built from the existing catalogue—not bookings or rigid itineraries.</p></header><div className="editorial-index-grid">{publishedTrips.map((trip) => <EditorialCover key={trip.slug} courseSlug={trip.stops[0].courseSlug} href={`/green/trips/${trip.slug}`} eyebrow={trip.eyebrow} title={trip.title} description={trip.introduction} meta={`${trip.duration} · ${trip.stops.length} courses`} />)}</div></main>; }
