import Link from "next/link";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return <main className="policy-page shell"><p className="eyebrow">Connection paused</p><h1>You&apos;re offline</h1><p>Previously visited pages and saved Green activity may still be available. Reconnect to explore new courses, maps, and planning links.</p><Link className="button-link" href="/green/">Try Discover again</Link></main>;
}
