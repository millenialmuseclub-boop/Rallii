export type GearVertical = "Rail" | "Green" | "Trail" | "Snow";
export type GearItem = { name:string; reason:string; verticals:GearVertical[]; merchant:string; href:string };
const flex={
away:"https://track.flexlinkspro.com/g.ashx?foid=156052.8621&trid=1520583.233568&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.awaytravel.com%2f",
bestBuy:"https://track.flexlinkspro.com/g.ashx?foid=156074.10014&trid=1520583.712&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.bestbuy.com%2f",
eastpak:"https://track.flexlinkspro.com/g.ashx?foid=156139.41896&trid=1520583.193661&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.eastpak.com%2f",
fjallraven:"https://track.flexlinkspro.com/g.ashx?foid=156099.29113&trid=1520583.235909&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.fjallraven.com%2f",
highSierra:"https://track.flexlinkspro.com/g.ashx?foid=156074.11772&trid=1520583.244043&foc=17&fot=9999&fos=6&url=https%3a%2f%2fshop.highsierra.com%2f",
hoka:"https://track.flexlinkspro.com/g.ashx?foid=1.43729&trid=1520583.203305&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.hoka.com%2f",
hydroFlask:"https://track.flexlinkspro.com/g.ashx?foid=156074.18825&trid=1520583.202999&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.hydroflask.com%2f",
samsonite:"https://track.flexlinkspro.com/g.ashx?foid=156074.11771&trid=1520583.158800&foc=17&fot=9999&fos=6&url=https%3a%2f%2fshop.samsonite.com%2f",
stanley:"https://track.flexlinkspro.com/g.ashx?foid=156099.18601&trid=1520583.225570&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.stanley1913.com%2f",
tumi:"https://track.flexlinkspro.com/g.ashx?foid=1.42396&trid=1520583.192534&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.tumi.com%2f",
ugg:"https://track.flexlinkspro.com/g.ashx?foid=1.43728&trid=1520583.158350&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.ugg.com%2f",
coleHaan:"https://track.flexlinkspro.com/g.ashx?foid=1.45770&trid=1520583.196522&foc=17&fot=9999&fos=6&url=https%3a%2f%2fwww.colehaan.com%2f"};
export const gearItems:GearItem[]=[
{name:"Carry-on luggage",reason:"The right-sized case for a few days and a platform change.",verticals:["Rail"],merchant:"Away",href:flex.away},
{name:"Luggage organizers",reason:"Keep small essentials findable without unpacking everything.",verticals:["Rail","Green","Trail","Snow"],merchant:"EASTPAK",href:flex.eastpak},
{name:"Travel daypack",reason:"A lighter bag for stations, clubhouses, trailheads and lifts.",verticals:["Rail","Green","Trail","Snow"],merchant:"Fjällräven",href:flex.fjallraven},
{name:"Walking shoes",reason:"Comfort matters when the journey continues after arrival.",verticals:["Rail","Green","Trail"],merchant:"HOKA",href:flex.hoka},
{name:"Golf-travel luggage",reason:"A dedicated travel system for clubs and clothing.",verticals:["Green"],merchant:"Samsonite",href:flex.samsonite},
{name:"Insulated bottle",reason:"Reliable hydration for a long round, route or snow day.",verticals:["Rail","Green","Trail","Snow"],merchant:"Hydro Flask",href:flex.hydroFlask},
{name:"All-day bottle",reason:"A durable bottle that belongs in every field kit.",verticals:["Rail","Green","Trail","Snow"],merchant:"Stanley",href:flex.stanley},
{name:"Trail pack",reason:"A practical starting point for day hikes and short walks.",verticals:["Trail","Snow"],merchant:"High Sierra",href:flex.highSierra},
{name:"Merino base layers",reason:"Warmth and temperature control without bulky packing.",verticals:["Rail","Trail","Snow"],merchant:"UGG",href:flex.ugg},
{name:"Winter boots",reason:"A warm, grippy option for snow travel and après-ski.",verticals:["Snow"],merchant:"UGG",href:flex.ugg},
{name:"Tech and charging kit",reason:"Keep navigation, tickets and cameras powered.",verticals:["Rail","Green","Trail","Snow"],merchant:"Best Buy",href:flex.bestBuy},
{name:"Travel shoes",reason:"A polished, packable pair for dinner after the day outside.",verticals:["Rail","Green","Snow"],merchant:"Cole Haan",href:flex.coleHaan},
{name:"Premium travel case",reason:"A durable upgrade for frequent golf and rail travelers.",verticals:["Rail","Green"],merchant:"TUMI",href:flex.tumi}];
export const gearByVertical=(vertical:GearVertical)=>gearItems.filter(item=>item.verticals.includes(vertical));
export const creatorShops={shopMy:"https://shopmy.us/shop/jetsetjordy",ltk:"https://www.shopltk.com/explore/Rie_Defined/"};
