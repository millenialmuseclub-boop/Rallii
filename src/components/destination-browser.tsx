import type { ReactNode } from "react";

export function DestinationBrowser<T extends { slug: string; name: string; region: string }>({ items, render }: { items: T[]; describe: (item: T) => string; render: (item: T) => ReactNode }) {
  const regionLabel = (item: T) => item.region.startsWith("US ") ? "United States" : item.region;
  const regions = [...new Set(items.map(regionLabel))];
  return <div className="destination-browser">{regions.map(name => {
    const entries = items.filter(item => regionLabel(item) === name);
    return <section className="destination-region" key={name} aria-label={name}>
      <header className="destination-region-heading"><h3>{name}</h3><span>{entries.length} {entries.length === 1 ? "place" : "places"}</span></header>
      <div className="destination-grid">{entries.map(item => <div key={item.slug}>{render(item)}</div>)}</div>
    </section>;
  })}</div>;
}
