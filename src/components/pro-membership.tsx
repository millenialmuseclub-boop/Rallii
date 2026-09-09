"use client";
import Link from "next/link";
import { useEntitlements } from "@/hooks/use-entitlements";
export function ProMembership() {
  const pro = useEntitlements();
  return <div className="family-membership">
    <h2>{pro.isPro ? "Your next trip, all together." : "Bring your next trip together."}</h2>
    <p>Private trip collections and notes across Rail, Green, Trail, MTB and Snow. One membership for all five activities.</p>
    {!pro.purchasesAvailable ? <p className="family-membership-notice">Membership purchases are not available in this version yet. Existing members can restore purchases below.</p> : null}
    <div className="family-actions">
      {pro.purchasesAvailable && !pro.isPro ? <button type="button" disabled={pro.isLoadingEntitlements} onClick={() => void pro.purchase()}>View membership options</button> : null}
      <button type="button" disabled={pro.isLoadingEntitlements} onClick={() => void pro.restorePurchases()}>Restore purchases</button>
      {pro.purchasesAvailable ? <button type="button" disabled={pro.isLoadingEntitlements} onClick={() => void pro.refreshEntitlements()}>Refresh membership</button> : null}
    </div>
    <p role="status" aria-live="polite">{pro.isLoadingEntitlements ? "Checking your membership…" : pro.error || pro.message}</p>
    <div className="family-benefits">
      <article><p className="eyebrow">Across all five activities</p><h3>A place for the whole trip.</h3><p>Group saved journeys, courses and outdoor destinations into private collections, with your own trip notes.</p></article>
      <article><p className="eyebrow">Rail</p><h3>More journeys. Timely reminders.</h3><p>Unlimited Rail saves and foreground Scenic Alerts on supported routes in Ride Mode.</p></article>
    </div>
    <details className="pro-planned"><summary>Planned tools · not available yet</summary><p>Enhanced outdoor maps, offline guides, GPS progress, MTB elevation profiles and ride tracking are planned. They are not included as available features.</p></details>
    <p>Discovery, course comparisons, and Green, Trail, MTB and Snow saves remain free. Existing collections stay readable if your membership ends.</p>
    <Link className="rallii-text-link" href="/my-rallii/">Open your saved library →</Link>
  </div>;
}
