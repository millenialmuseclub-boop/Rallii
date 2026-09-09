import { EditorialCover } from "@/green/components/editorial-cover";
import { publishedDestinations } from "@/green/data/destinations";
import { firstPhotographedSlug } from "@/green/data/media";
export const metadata = { title: "Destinations" };
export default function DestinationsPage() { return <main className="screen shell"><header className="screen-intro"><p className="eyebrow">Destinations</p><h1>Build around the geography.</h1><p>Prepared places where the land explains the golf.</p></header><div className="editorial-index-grid">{publishedDestinations.map((destination) => <EditorialCover key={destination.slug} courseSlug={firstPhotographedSlug(destination.courseSlugs)} href={`/green/destinations/${destination.slug}`} eyebrow="Destination" title={destination.name} description={destination.shortDescription} meta={`${destination.courseSlugs.length} courses`} />)}</div></main>; }
