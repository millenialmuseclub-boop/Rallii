import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

export function AppScreenShell({ title, context, backHref, backLabel = "Back", action, children }: { title: string; context?: string; backHref?: string; backLabel?: string; action?: ReactNode; children: ReactNode }) {
  return <><SiteHeader /><div className="app-screen-bar">{backHref ? <Link className="focus-ring" href={backHref}>← {backLabel}</Link> : <span className="app-screen-bar__brand">Rallii</span>}<div><strong>{title}</strong>{context ? <small>{context}</small> : null}</div><div className="app-screen-bar__action">{action ?? <Link className="focus-ring" href="/saved">Saved</Link>}</div></div><main className="site-shell app-screen"><header className="app-screen__intro"><p className="eyebrow">Rallii journey workspace</p><h1>{title}</h1>{context ? <p>{context}</p> : null}</header>{children}</main></>;
}
