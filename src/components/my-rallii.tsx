"use client";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import { useCourseLibrary } from "@/green/hooks/use-course-library";
import { useTrailLibrary } from "@/trail/use-trail-library";
import { SaveTrail } from "@/trail/save-trail";
import { useEntitlements } from "@/hooks/use-entitlements";
import { COLLECTIONS_KEY, parseCollections, updateCollection, type TripCollection } from "@/lib/pro-collections";

export interface SavedExperience { activity: "rail" | "green" | "trail"; slug: string; name: string; href: string }
function snapshot() { try { return localStorage.getItem(COLLECTIONS_KEY) ?? ""; } catch { return ""; } }
function subscribe(callback: () => void) {
  const storage = (event: StorageEvent) => { if (!event.key || event.key === COLLECTIONS_KEY) callback(); };
  window.addEventListener("storage", storage); window.addEventListener(COLLECTIONS_KEY, callback);
  return () => { window.removeEventListener("storage", storage); window.removeEventListener(COLLECTIONS_KEY, callback); };
}
const serverSnapshot = () => "";
export function MyRallii({ experiences }: { experiences: SavedExperience[] }) {
  const { statuses } = useTravelLibrary();
  const { library } = useCourseLibrary();
  const { library: trailLibrary } = useTrailLibrary();
  const { isPro } = useEntitlements();
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const collections = parseCollections(raw);
  const [filter, setFilter] = useState<"all" | "rail" | "green" | "trail">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [draft, setDraft] = useState<TripCollection>();
  const [message, setMessage] = useState("");
  const savedStatus = (item: SavedExperience) => item.activity === "rail" ? statuses[item.slug] : item.activity === "green" ? library.courses[item.slug] : trailLibrary.trails[item.slug];
  const saved = experiences.filter(item => savedStatus(item));
  const visible = saved.filter(item => (filter === "all" || item.activity === filter) && (statusFilter === "all" || (statusFilter === "been" ? ["been", "played"].includes(savedStatus(item)) : ["want_to_go", "want_to_play"].includes(savedStatus(item)))));
  function save() {
    if (!draft || !isPro || !draft.name.trim()) return;
    try {
      const next = updateCollection(parseCollections(snapshot()), draft, isPro);
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify({ version: 1, collections: next }));
      window.dispatchEvent(new Event(COLLECTIONS_KEY)); setDraft(undefined); setMessage("Collection saved on this device.");
    } catch { setMessage("Your collection could not be saved. Device storage may be full or unavailable. Your notes are still here; copy them before leaving."); }
  }
  return <div className="family-workspace">
    <p>Private to this device. Your Rail journeys, Green courses and Trail hikes, together.</p>
    <div className="family-actions" aria-label="Filter saved experiences">{(["all", "rail", "green", "trail"] as const).map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value.charAt(0).toUpperCase() + value.slice(1)}</button>)}</div>
    <div className="family-actions" aria-label="Filter saved status">{[["all", "All statuses"], ["want", "Want to Go"], ["been", "Been"]].map(([value, label]) => <button key={value} type="button" aria-pressed={statusFilter === value} onClick={() => setStatusFilter(value)}>{label}</button>)}</div>
    {visible.length ? <ul className="family-saved-list">{visible.map(item => <li key={`${item.activity}:${item.slug}`}><span className="eyebrow">{item.activity}</span><div><Link href={item.href}>{item.name} →</Link>{item.activity === "trail" ? <SaveTrail slug={item.slug} name={item.name} /> : null}</div></li>)}</ul> : <p>No saved experiences in this view yet. Discover a <Link href="/discover/">rail journey</Link>, <Link href="/green/">golf course</Link> or <Link href="/trail/">hiking trail</Link>.</p>}
    <div className="family-actions"><Link href="/saved/">Manage Rail saves</Link><Link href="/green/my-green/">Manage Green saves</Link></div>
    <section className="family-collections" aria-labelledby="collections-title"><p className="eyebrow">Rallii Pro</p><h2 id="collections-title">Trips that bring it all together</h2><p>Collect rail journeys, golf courses and hiking trails in one place, with your own trip notes.</p>
      {isPro ? <button type="button" onClick={() => { setDraft({ id: crypto.randomUUID(), name: "", notes: "", experiences: [] }); setMessage(""); }}>New collection</button> : <p><Link href="/pro/">Explore Rallii Pro →</Link> Existing collections remain readable when your membership ends.</p>}
      <p role="status">{message}</p>
      {draft && isPro ? <form onSubmit={event => { event.preventDefault(); save(); }} className="family-collection-editor"><label>Collection name<input required maxLength={80} value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label><label>Trip notes<textarea rows={5} maxLength={4000} value={draft.notes} onChange={event => setDraft({ ...draft, notes: event.target.value })} /></label><fieldset><legend>Include saved experiences</legend>{saved.length ? saved.map(item => <label key={`${item.activity}:${item.slug}`} className="family-check"><input type="checkbox" checked={draft.experiences.some(ref => ref.activity === item.activity && ref.slug === item.slug)} onChange={event => setDraft({ ...draft, experiences: event.target.checked ? [...draft.experiences, { activity: item.activity, slug: item.slug }] : draft.experiences.filter(ref => ref.activity !== item.activity || ref.slug !== item.slug) })} />{item.name} · {item.activity}</label>) : <p>Save a journey, course or trail to include it here. You can still save notes.</p>}</fieldset><div className="family-actions"><button type="submit">Save collection</button><button type="button" onClick={() => setDraft(undefined)}>Cancel</button></div></form> : null}
      <div className="family-collection-grid">{collections.map(collection => <article key={collection.id}><h3>{collection.name}</h3><p className="family-notes">{collection.notes}</p><ul>{collection.experiences.map(ref => { const item = experiences.find(item => item.activity === ref.activity && item.slug === ref.slug); return <li key={`${ref.activity}:${ref.slug}`}>{item ? <Link href={item.href}>{item.name} · {item.activity}</Link> : "Experience no longer in the catalogue"}</li>; })}</ul>{isPro ? <button type="button" onClick={() => setDraft(collection)}>Edit {collection.name}</button> : null}</article>)}</div>
    </section>
  </div>;
}
