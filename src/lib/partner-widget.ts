export type PartnerWidgetKind = "stays" | "flights" | "cars" | "activities";

const widgetParameters: Record<PartnerWidgetKind, Record<string, string>> = {
  stays: { locale: "en", powered_by: "true", primary_override: "#5392F9", color_button: "#2681ff", color_icons: "#5392F9", dark: "#262626", color_border: "#2681ff", color_focused: "#32a8dd", border_radius: "0", plain: "false", promo_id: "8303", campaign_id: "104" },
  flights: { locale: "en", curr: "USD", powered_by: "true", border_radius: "0", plain: "true", color_button: "#2681ff", color_button_text: "#ffffff", color_border: "#2681ff", promo_id: "4132", campaign_id: "121" },
  cars: { locale: "en", powered_by: "true", bg_color: "#fad130", font_color: "#333333", button_color: "#00a200", button_font_color: "#ffffff", button_text: "Search", rounded_corners: "false", benefits: "false", dc_powered_by: "false", supplier_logos: "false", top_logo: "false", logo_style: "dark", top_color: "#007ac2", campaign_id: "117", promo_id: "3873" },
  activities: { locale: "en-US", powered_by: "true", campaign_id: "108", promo_id: "4040" },
};


/** Explicit .html works with Capacitor's local server and web static assets. */
export function createPartnerWidgetUrl(kind: PartnerWidgetKind, trs: string, marker: string): string {
  const parameters = new URLSearchParams({ kind, trs, shmarker: marker, ...widgetParameters[kind] });
  return `/partner-widget.html?${parameters.toString()}`;
}
