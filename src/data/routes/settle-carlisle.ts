import type { RailRoute } from "../../types/route.ts";

export const settleCarlisleRoute = {
  capabilities: { rideMode: false },
  summary: {
    id: "settle-carlisle", slug: "settle-carlisle", name: "Settle–Carlisle Line", origin: "Leeds", destination: "Carlisle", country: "England · United Kingdom", countries: ["United Kingdom"], journeyTypes: ["scenic", "regional", "mountain"], operator: "Northern", durationMinutes: 170, distanceKm: 181.13, trainType: "Scheduled regional train", reservationStatus: "not-required",
    shortDescription: "A regular Northern journey from Leeds through the Aire Valley and Yorkshire Dales, across Ribblehead Viaduct and the Pennines, before following the Eden Valley into Carlisle.", status: "published", heroImageAlt: "A Carlisle-bound passenger train crossing Ribblehead Viaduct", metadataDestination: "Carlisle", metadataDescription: "A directional guide to the scheduled Leeds–Carlisle journey via Settle, Ribblehead, the Pennines, and Eden Valley.", searchAliases: ["Settle Carlisle", "Settle and Carlisle", "Ribblehead", "Yorkshire Dales", "Pennines", "Eden Valley", "Northern Rail"], experienceTags: ["viaducts", "mountain-valleys", "moorland", "rivers"], bestFor: ["Ribblehead Viaduct and classic railway engineering", "Yorkshire Dales and Pennine scenery on a scheduled train", "a practical cross-country journey with a celebrated scenic core"],
  },
  stops: [
    { id:"leeds",name:"Leeds",latitude:53.7943599,longitude:-1.5497277,sequence:1,distanceAlongRouteKm:0 },
    { id:"skipton",name:"Skipton",latitude:53.9584079,longitude:-2.0256663,sequence:2,distanceAlongRouteKm:41.9 },
    { id:"settle",name:"Settle",latitude:54.0669611,longitude:-2.2808066,sequence:3,distanceAlongRouteKm:66.3 },
    { id:"ribblehead",name:"Ribblehead",latitude:54.2055297,longitude:-2.3603749,sequence:4,distanceAlongRouteKm:83.6 },
    { id:"dent",name:"Dent",latitude:54.2825906,longitude:-2.3636239,sequence:5,distanceAlongRouteKm:93.5 },
    { id:"garsdale",name:"Garsdale",latitude:54.3214501,longitude:-2.3263553,sequence:6,distanceAlongRouteKm:98.7 },
    { id:"kirkby-stephen",name:"Kirkby Stephen",latitude:54.454921,longitude:-2.3686887,sequence:7,distanceAlongRouteKm:114.6 },
    { id:"appleby",name:"Appleby",latitude:54.5804184,longitude:-2.4864996,sequence:8,distanceAlongRouteKm:131.8 },
    { id:"carlisle",name:"Carlisle",latitude:54.8902037,longitude:-2.9319906,sequence:9,distanceAlongRouteKm:181.13 },
  ],
  landmarks: [
    { id:"aire-valley",name:"Aire Valley",type:"river",latitude:53.93,longitude:-2.0,distanceAlongRouteKm:38,shortDescription:"The railway follows the river and canal through greener country toward Skipton.",importance:"highlight",bestSideForward:"varies",bestSideReverse:"varies" },
    { id:"yorkshire-dales",name:"Yorkshire Dales",type:"scenic-section",latitude:54.13,longitude:-2.31,distanceAlongRouteKm:75,shortDescription:"Open limestone country signals the beginning of the celebrated scenic section north of Settle.",importance:"highlight",bestSideForward:"both",bestSideReverse:"both" },
    { id:"ribblehead-viaduct",name:"Ribblehead Viaduct",type:"viaduct",latitude:54.2106,longitude:-2.3703,distanceAlongRouteKm:84.4,shortDescription:"Twenty-four stone arches carry the railway across Batty Moss beneath the Three Peaks.",importance:"dont-miss",bestSideForward:"both",bestSideReverse:"both" },
    { id:"blea-moor",name:"Blea Moor",type:"tunnel",latitude:54.225,longitude:-2.345,distanceAlongRouteKm:87,shortDescription:"Beyond Ribblehead the line climbs into Blea Moor Tunnel before emerging toward Dentdale.",importance:"highlight",bestSideForward:"both",bestSideReverse:"both" },
    { id:"dentdale",name:"Dentdale",type:"scenic-section",latitude:54.275,longitude:-2.39,distanceAlongRouteKm:93,shortDescription:"High embankments and valley views frame one of the route’s most remote sections.",importance:"dont-miss",bestSideForward:"varies",bestSideReverse:"varies" },
    { id:"mallerstang",name:"Mallerstang",type:"scenic-section",latitude:54.4,longitude:-2.34,distanceAlongRouteKm:108,shortDescription:"The railway runs through a broad Pennine valley beneath exposed fells.",importance:"dont-miss",bestSideForward:"both",bestSideReverse:"both" },
    { id:"eden-valley",name:"Eden Valley",type:"river",latitude:54.65,longitude:-2.66,distanceAlongRouteKm:145,shortDescription:"Past Appleby, gentler farmland and River Eden country carry the journey north toward Carlisle.",importance:"highlight",bestSideForward:"varies",bestSideReverse:"varies" },
  ],
  timelineEntries: [
    { id:"timeline-aire",title:"Aire Valley",distanceAlongRouteKm:38,approximateJourneyMinutes:40,type:"river",importance:"highlight",bestSide:"varies",relatedLandmarkId:"aire-valley",shortDescription:"Look up as urban West Yorkshire gives way to river, canal, and greener valley sides." },
    { id:"timeline-settle",title:"Settle",subtitle:"The scenic core begins",distanceAlongRouteKm:66.3,approximateJourneyMinutes:67,type:"station",importance:"highlight",shortDescription:"From here the railway climbs into the Yorkshire Dales and the historic Settle–Carlisle section." },
    { id:"timeline-dales",title:"Yorkshire Dales",distanceAlongRouteKm:75,approximateJourneyMinutes:78,type:"scenic-section",importance:"highlight",bestSide:"both",relatedLandmarkId:"yorkshire-dales",shortDescription:"Limestone walls, exposed slopes, and wider views begin to gather around the line." },
    { id:"timeline-ribblehead",title:"Ribblehead Viaduct",distanceAlongRouteKm:84.4,approximateJourneyMinutes:88,type:"viaduct",importance:"dont-miss",bestSide:"both",relatedLandmarkId:"ribblehead-viaduct",shortDescription:"Be ready immediately around Ribblehead; the crossing is brief and the viaduct is easier to understand on the approach and curve." },
    { id:"timeline-dentdale",title:"Dentdale",distanceAlongRouteKm:93,approximateJourneyMinutes:100,type:"scenic-section",importance:"dont-miss",bestSide:"varies",relatedLandmarkId:"dentdale",shortDescription:"After Blea Moor, watch for high, open valley views and successive railway structures." },
    { id:"timeline-mallerstang",title:"Mallerstang",distanceAlongRouteKm:108,approximateJourneyMinutes:116,type:"scenic-section",importance:"dont-miss",bestSide:"both",relatedLandmarkId:"mallerstang",shortDescription:"The route settles into an expansive Pennine valley before Kirkby Stephen." },
    { id:"timeline-appleby",title:"Appleby and Eden Valley",distanceAlongRouteKm:132,approximateJourneyMinutes:137,type:"river",importance:"highlight",bestSide:"varies",relatedLandmarkId:"eden-valley",shortDescription:"The landscape softens into Eden Valley farmland for the final northern chapter." },
  ],
  bestSideSegments: [
    { id:"leeds-settle",startDistanceKm:0,endDistanceKm:66.3,forwardDirectionSide:"varies",reverseDirectionSide:"varies",reason:"The Aire Valley changes orientation repeatedly, moving the strongest view between sides.",confidenceType:"limited-data" },
    { id:"dales-ribblehead",startDistanceKm:66.3,endDistanceKm:88,forwardDirectionSide:"both",reverseDirectionSide:"both",reason:"Open Dales scenery and the approach to Ribblehead reward both windows.",confidenceType:"editorial" },
    { id:"dent-mallerstang",startDistanceKm:88,endDistanceKm:118,forwardDirectionSide:"varies",reverseDirectionSide:"varies",reason:"Tunnels, curves, and alternating valley walls prevent one consistently superior side.",confidenceType:"limited-data" },
    { id:"eden-carlisle",startDistanceKm:118,endDistanceKm:181.13,forwardDirectionSide:"varies",reverseDirectionSide:"varies",reason:"River and farmland views alternate as the railway bends through the Eden Valley.",confidenceType:"limited-data" },
  ],
  journeyInformation: [
    { id:"scheduled",label:"The journey",detail:"Rallii covers the regular Northern passenger journey from Leeds to Carlisle. The famous Settle–Carlisle scenic line is the section north of Settle, not the whole Leeds departure corridor." },
    { id:"timing",label:"Timetables",detail:"Service times and stopping patterns change. Check Northern or National Rail for the specific train you intend to take." },
    { id:"reservations",label:"Reservations",detail:"This is ordinary regional rail without reserved seating. Busy services can still fill, so arrive with time to choose a seat." },
    { id:"conditions",label:"Conditions",detail:"Pennine weather changes quickly. Visibility around Ribblehead and the high moors can vary even within one journey." },
  ],
  sources: [
    { id:"sc-northern",label:"Northern — Leeds to Carlisle",category:"operator",url:"https://www.northernrailway.co.uk/journey-planner/leeds-to-carlisle",note:"Current operator and scheduled passenger-journey context; individual services must be checked." },
    { id:"sc-development",label:"Settle–Carlisle Railway",category:"tourism",url:"https://settle-carlisle.co.uk/",note:"Route heritage, stations, landscapes, and the distinction of the celebrated Settle–Carlisle section." },
    { id:"sc-network-rail",label:"Network Rail — Ribblehead Viaduct",category:"infrastructure",url:"https://www.networkrail.co.uk/who-we-are/our-history/iconic-infrastructure/the-history-of-ribblehead-viaduct/",note:"Infrastructure context for the line’s landmark viaduct." },
    { id:"sc-osm",label:"OpenStreetMap relation 9902815",category:"railway-map",url:"https://www.openstreetmap.org/relation/9902815",note:"Prepared from the mapped Northern Carlisle–Leeds passenger route and its 526 railway ways; © OpenStreetMap contributors, ODbL." },
    { id:"sc-rallii",label:"Rallii guidance",category:"editorial",note:"Curated scenic sequence and cautious, segment-based viewing guidance derived from prepared geometry." },
  ],
  geoJsonPath: "/data/routes/settle-carlisle.geojson",
  relatedRouteSlugs: ["west-highland-line", "douro-line"],
} satisfies RailRoute;
