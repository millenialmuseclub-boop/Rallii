import { productsForExperience } from "@/data/shopmy-products";
import type { AffiliateMode } from "@/data/affiliate-offers";

export function GearPicks({mode,slug}:{mode:AffiliateMode;slug:string}) {
  const products=productsForExperience(mode,slug);
  if(!products.length)return null;
  return <section className="gear-picks" aria-label="Useful gear"><h3>{mode==="snow"?"Pack for this trip":mode==="mtb"?"Useful for this ride":mode==="trail"?"Trail essentials":"Keep it close on board"}</h3><p className="trail-fact-note">Affiliate links: Rallii may earn a commission if you buy through these ShopMy links. Use what you already own when it suits the trip.</p>{products.map(product=><article key={product.id}><h4>{product.name}</h4><p>{product.reason}</p><a className="rallii-text-link" href={product.url} target="_blank" rel="sponsored noopener noreferrer" data-outbound="shopmy_click" data-mode={mode} data-route-id={slug} data-product-id={product.id}>View at {product.retailer} ↗</a></article>)}</section>;
}
