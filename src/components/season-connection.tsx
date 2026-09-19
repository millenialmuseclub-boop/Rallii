import Link from "next/link";
import { DestinationPhoto, DestinationCredit } from "./destination-photo";
import { mtbMedia } from "@/mtb/media";
import { snowMedia } from "@/snow/media";

/** Reuse only attributed photographs of the actual destination; seasons stay explicit. */
const connections = {
  "snow:whistler-blackcomb": {mode:"mtb",image:"lost-lake",href:"/mtb/lost-lake/",title:"Whistler in the snow-free months",copy:"Lost Lake offers a separate forest riding day in the biking season. Winter trail use is different; this is an idea for another trip."},
  "mtb:whistler-bike-park": {mode:"snow",image:"whistler-blackcomb",href:"/snow/whistler-blackcomb/",title:"The same mountain, another season",copy:"Whistler's winter ski trip needs separate passes, equipment and planning. This winter photograph does not describe current bike-park conditions."},
  "mtb:lost-lake": {mode:"snow",image:"whistler-blackcomb",href:"/snow/whistler-blackcomb/",title:"Return to Whistler in winter",copy:"The ski resort is a separate outing from Lost Lake. Plan snow sports around the mountain's winter calendar."},
  "snow:cerro-catedral": {mode:"mtb",image:"bariloche-mtb",href:"/mtb/bariloche-mtb/",title:"A town base for another season",copy:"Bariloche's civic centre gives a sense of the town beyond the slopes. Explore the regional riding guide for a separate southern-summer trip."},
  "mtb:bariloche-mtb": {mode:"snow",image:"cerro-catedral",href:"/snow/cerro-catedral/",title:"Catedral in southern winter",copy:"The snow-covered resort belongs to another season. Use the Snow guide for winter planning; this photograph does not show summer trail access."},
} as const;
export function SeasonConnection({mode,slug}:{mode:"snow"|"mtb";slug:string}) {
  const item=connections[`${mode}:${slug}` as keyof typeof connections];
  if(!item)return null;
  const media=item.mode === "snow" ? snowMedia[item.image] : mtbMedia[item.image];
  return <section className="rallii-section field-notes"><p className="rallii-kicker">Another season</p><h2>{item.title}</h2><div className="season-photo"><DestinationPhoto media={media}/></div><DestinationCredit media={media}/><p>{item.copy}</p><Link className="rallii-text-link" href={item.href}>Explore the {item.mode === "mtb" ? "riding" : "winter"} guide →</Link></section>;
}
