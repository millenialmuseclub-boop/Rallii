import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { ScreenMediaHeader } from "@/components/screen-media-header";
import type { ScreenMediaKey } from "@/data/screen-media";

export function AppScreenShell({ title, context, backHref, backLabel = "Back", action, mediaKey, children }: { title: string; context?: string; backHref?: string; backLabel?: string; action?: ReactNode; mediaKey?: ScreenMediaKey; children: ReactNode }) {
  return <><SiteHeader /><div className="app-screen-bar">{backHref ? <Link className="focus-ring" href={backHref}>← {backLabel}</Link> : <span className="app-screen-bar__brand">Rallii</span>}<div><strong>{title}</strong>{context ? <small>{context}</small> : null}</div><div className="app-screen-bar__action">{action ?? <Link className="focus-ring" href="/saved">Saved</Link>}</div></div><main className="site-shell app-screen"><ScreenMediaHeader mediaKey={mediaKey} title={title} context={context} /><header className="app-screen__intro"><p className="eyebrow">Rallii journey workspace</p><h1>{title}</h1>{context ? <p>{context}</p> : null}</header>{children}</main></>;
}
