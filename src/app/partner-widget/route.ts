type PartnerWidgetKind = "flights" | "cars" | "activities";

const widgetParameters: Record<PartnerWidgetKind, Record<string, string>> = {
  flights: { locale: "en", curr: "USD", powered_by: "true", border_radius: "0", plain: "true", color_button: "#2681ff", color_button_text: "#ffffff", color_border: "#2681ff", promo_id: "4132", campaign_id: "121" },
  cars: { locale: "en", powered_by: "true", bg_color: "#fad130", font_color: "#333333", button_color: "#00a200", button_font_color: "#ffffff", button_text: "Search", rounded_corners: "false", benefits: "false", dc_powered_by: "false", supplier_logos: "false", top_logo: "false", logo_style: "dark", top_color: "#007ac2", campaign_id: "117", promo_id: "3873" },
  activities: { locale: "en-US", powered_by: "true", campaign_id: "108", promo_id: "4040" },
};

export function GET(request: Request): Response {
  const kind = new URL(request.url).searchParams.get("kind");
  if (!isWidgetKind(kind)) return htmlResponse("Partner search unavailable", 404);
  const trs = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TRS?.trim();
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER?.trim();
  if (!trs || !marker) return htmlResponse("Partner search is not configured.", 503);
  const parameters = new URLSearchParams({ trs, shmarker: marker, ...widgetParameters[kind] });
  const scriptUrl = `https://tpwdgt.com/content?${parameters.toString()}`.replaceAll("&", "&amp;");
  return htmlResponse(`<script async src="${scriptUrl}" charset="utf-8"></script>`);
}

function isWidgetKind(value: string | null): value is PartnerWidgetKind {
  return value === "flights" || value === "cars" || value === "activities";
}

function htmlResponse(content: string, status = 200): Response {
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;min-height:100%;font-family:Arial,sans-serif}body{padding:2px;box-sizing:border-box}</style></head><body>${content}</body></html>`;
  return new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
