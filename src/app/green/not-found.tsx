import Link from "next/link";
export default function NotFound() { return <main className="screen shell"><div className="empty-state"><p className="eyebrow">Off course</p><h1>That course is not in Green.</h1><p>The catalogue is curated, and this address may have moved.</p><Link className="primary-button" href="/green/">Return to Discover</Link></div></main>; }
