import type { AffiliateMode } from "./affiliate-offers.ts";

export interface ShopMyProduct {
  id: string;
  name: string;
  retailer: string;
  url: string;
  retailerUrl: string;
  verifiedAt: string;
  placements: Partial<Record<AffiliateMode, { routes: readonly string[]; reason: string }>>;
}
/** URLs created in the publisher's authenticated ShopMy account and opened through
 * the complete redirect to the named REI product on 2026-09-19. Keep these exact
 * URLs: do not append tracking, reconstruct IDs or substitute retailer URLs.
 * Replacement: create in ShopMy, verify retailer/product, then replace this row.
 * No prices, stock promises, account credentials or redirect-session IDs stored.
 */
export const shopMyProducts: readonly ShopMyProduct[] = [
  { id:"black-diamond-mercury",name:"Black Diamond Mercury Mittens — Men's",retailer:"REI",url:"https://go.shopmy.us/p-87742818",retailerUrl:"https://www.rei.com/product/238869/black-diamond-mercury-mittens-mens?sku=2388690001",verifiedAt:"2026-09-19",placements:{snow:{routes:["lake-louise","revelstoke","niseko-united","portillo"],reason:"For cold resort days and exposed chairlift rides. This link uses men's sizing: compare hand measurements with the size guide and check dexterity with your own poles and buckles."}}},
  { id:"smith-squad",name:"Smith Squad ChromaPop Snow Goggles",retailer:"REI",url:"https://go.shopmy.us/p-87739849",retailerUrl:"https://www.rei.com/product/180912/smith-squad-chromapop-snow-goggles?sku=1809120047",verifiedAt:"2026-09-19",placements:{snow:{routes:["whistler-blackcomb","lake-louise","revelstoke","chamonix","brevent-flegere","zermatt","niseko-united","coronet-peak","portillo"],reason:"For wind and changing light on a resort ski day. Choose a lens for the expected light and check the fit with your own helmet; lens options vary."}}},
  { id:"crankbrothers-m19",name:"Crankbrothers M19 Multi-Tool",retailer:"REI",url:"https://go.shopmy.us/p-87740761",retailerUrl:"https://www.rei.com/product/746199/crankbrothers-m19-multi-tool?sku=7461990003",verifiedAt:"2026-09-19",placements:{mtb:{routes:["moab-slickrock","glentress","lost-lake","whistler-bike-park","tahoe-flume","blue-derby"],reason:"For small trailside adjustments when a workshop is not close. Check tool and chain compatibility with your bike; carry a separate pump and suitable puncture supplies."}}},
  { id:"camelbak-mule-evo",name:"CamelBak M.U.L.E. EVO 12 Hydration Pack",retailer:"REI",url:"https://go.shopmy.us/p-87741175",retailerUrl:"https://www.rei.com/product/237678/camelbak-mule-evo-12-hydration-pack?sku=2376780001",verifiedAt:"2026-09-19",placements:{mtb:{routes:["moab-slickrock","tahoe-flume","glentress","blue-derby"],reason:"Carry water and a small repair kit on pedal-powered outings. Fit the loaded pack before the trip and plan water volume around heat, effort and refill availability."}}},
  { id:"osprey-daylite-plus",name:"Osprey Daylite Plus Pack",retailer:"REI",url:"https://go.shopmy.us/p-87741754",retailerUrl:"https://www.rei.com/product/186383/osprey-daylite-plus-pack?sku=1863830028",verifiedAt:"2026-09-19",placements:{trail:{routes:["johnston-canyon","johnston-upper-falls","preikestolen","hooker-valley"],reason:"Keep water, food and weather layers together for a day walk. Check that your own emergency kit fits; the pack is not a complete hiking kit."},rail:{routes:["glacier-express","bernina-express","california-zephyr","the-canadian"],reason:"Keep your day's water, layers and travel essentials accessible while larger luggage is stowed. Check the operator's luggage allowance before choosing a bag."}}},
];

export function productsForExperience(mode: AffiliateMode, slug: string) {
  return shopMyProducts.flatMap(product => {
    const placement = product.placements[mode];
    return placement?.routes.includes(slug) ? [{...product,reason:placement.reason}] : [];
  });
}
