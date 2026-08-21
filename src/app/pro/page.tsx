import type { Metadata } from "next";
import Link from "next/link";
import { AppScreenShell } from "@/components/app-screen-shell";
import { ralliiProPricing } from "@/data/pro";

export const metadata: Metadata = { title: "Rallii Rail Pro", description: "The future high-utility journey companion tier for Rallii Rail." };

export default function ProPage() {
  return <AppScreenShell title="Rallii Rail Pro" context="Deeper journey guidance without limiting ordinary discovery." backHref="/saved" backLabel="Saved">
    <section className="pro-intro"><p className="eyebrow">Prepared for native subscriptions</p><h2>Never miss the view.</h2><p>Rallii Rail Pro is designed around utility on the train: Scenic Alerts, offline journey packs, richer operational context, and an unlimited private rail library.</p></section>
    <section className="pro-features" aria-label="Rallii Pro features"><article><h3>Scenic Alerts</h3><p>Foreground guidance for supported routes, using direction and progress along the prepared railway.</p></article><article><h3>Offline journeys</h3><p>Architecture prepared for native journey packs; downloads are not available in this web milestone.</p></article><article><h3>Unlimited library</h3><p>Keep every saved journey together. The free library currently supports two journeys.</p></article></section>
    <div className="pro-pricing" aria-label="Planned Rallii Rail Pro pricing"><span><strong>{ralliiProPricing.monthly.displayPrice}</strong> / {ralliiProPricing.monthly.period}</span><span><strong>{ralliiProPricing.yearly.displayPrice}</strong> / {ralliiProPricing.yearly.period}</span></div>
    <p className="pro-disclaimer">Purchases are not available yet. Pricing is configurable and may change before native release.</p>
    <Link className="action-button focus-ring" href="/discover">Continue discovering</Link>
  </AppScreenShell>;
}
