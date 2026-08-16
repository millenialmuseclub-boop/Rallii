export type PartnerWidgetKind = "stays" | "flights" | "cars" | "activities";

export function PartnerWidgetFrame({ kind, title }: { kind: PartnerWidgetKind; title: string }) {
  return <div className="partner-plan__widget"><iframe title={title} className="partner-plan__partner-frame" data-kind={kind} loading="lazy" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" src={`/partner-widget?kind=${kind}`} /><p className="partner-plan__widget-fallback">If the partner tool does not load, refresh the page or try again later.</p></div>;
}
