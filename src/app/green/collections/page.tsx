import { EditorialCover } from "@/green/components/editorial-cover";
import { publishedCollections } from "@/green/data/collections";
import { firstPhotographedSlug } from "@/green/data/media";
export const metadata = { title: "Collections" };
export default function CollectionsPage() { return <main className="screen shell"><header className="screen-intro"><p className="eyebrow">Collections</p><h1>Editorial paths through Green.</h1><p>Focused ways to enter the catalogue by access, architecture and landscape.</p></header><div className="editorial-index-grid">{publishedCollections.map((collection) => <EditorialCover key={collection.slug} courseSlug={firstPhotographedSlug(collection.courseSlugs)} href={`/green/collections/${collection.slug}`} eyebrow="Rallii Collection" title={collection.title} description={collection.shortDescription} meta={`${collection.courseSlugs.length} courses`} />)}</div></main>; }
