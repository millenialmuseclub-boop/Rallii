/** Named options within existing destinations, not invented navigable geometry. */
export interface RideOption { name: string; distance: string; ascent: string; time: string; grade: string; description: string }
export interface RidingPlan { season: string; logistics: string; options: RideOption[]; sourceUrl: string; sourceLabel: string }
export const ridingPlans: Record<string, RidingPlan> = {
  "moab-slickrock": {
    season:"Favor spring or autumn over summer heat. Wet, icy or snow-covered sandstone changes the ride; check the land manager before setting out.",
    logistics:"Start at the Sand Flats Slickrock trailhead. There is no drinking water at the riding area: arrive supplied, with a repair plan and time to walk difficult sections. Entry arrangements are separate from bike rental.",
    sourceUrl:"https://www.discovermoab.com/attractions/mountainbiking/",sourceLabel:"Discover Moab trail descriptions",
    options:[
      {name:"Slickrock main circuit",distance:"10.5 mi / about 16.9 km, including the approach and return",ascent:"Not verified; repeated steep climbs",time:"3–4 hours per the destination guide",grade:"Advanced · physically and technically difficult",description:"Painted dashes cross sandstone domes with short sand sections and exposed ledges. Stop clear of the line for Colorado River country views. Spur routes add distance."},
      {name:"Slickrock Practice Loop",distance:"2.2 mi / about 3.5 km; allow for access from the trailhead",ascent:"Not verified",time:"Allow extra time to inspect and walk features",grade:"Technical introduction, not a beginner loop",description:"A shorter way to sample the sandstone before committing to the main circuit. It does not remove the steep rolls or handling demands."},
    ],
  },
  glentress:{
    season:"Forest riding can work beyond summer, but daylight, storms and forestry diversions matter. Check the current notices: published full-route distances may change with diversions.",
    logistics:"Start at Glentress Gateway using the shared Multi-user Trail. Practice in the skills area, then choose a route for the least experienced rider. Keep walkers in mind on shared access.",sourceUrl:"https://forestryandland.gov.scot/visit/destinations/glentress/bike",sourceLabel:"Forestry and Land Scotland bike routes",
    options:[
      {name:"Lower Green Route",distance:"3.5 km published route",ascent:"Not published in the cited guide",time:"Short introductory outing; allow practice stops",grade:"Green · easy",description:"An introduction through mature forest, returning via the shared route and Apple Peel. Loose or wet surfaces can still require care."},
      {name:"Glentress Blue Route",distance:"16 km full route; shorter loops possible",ascent:"Not published in the cited guide",time:"Allow a half day including breaks; editorial estimate",grade:"Blue · moderate",description:"Climb toward Buzzard's Nest and select the lower loop or continue higher. Roots, rock steps, berms and climbing distinguish it from the green route."},
    ],
  },
  "lost-lake":{
    season:"Choose the snow-free biking season; winter trail use is different. Respect temporary wildlife and maintenance closures.",
    logistics:"Reach Lost Lake Park from Whistler Village and use the municipal summer map. This is shared, pedal-powered riding; no downhill park pass or uplift is implied.",sourceUrl:"https://www.whistler.ca/parks-recreation-culture/trails/multi-use-trail-network/",sourceLabel:"Whistler municipal trail guidance",
    options:[
      {name:"Tin Pants and Molly Hogan",distance:"Choose connections on the official map",ascent:"Route dependent",time:"Plan a short first outing",grade:"Green doubletrack options",description:"A more approachable forest starting point than jumping straight onto narrow singletrack. Agree a turnaround before extending the ride."},
      {name:"Zappa network",distance:"Route dependent",ascent:"Route dependent",time:"Build around daylight and energy",grade:"Intermediate",description:"A step up from the wider green trails. Ride a short selection first and regroup at signed junctions instead of treating the whole network as one loop."},
    ],
  },
  "whistler-bike-park":{
    season:"A summer bike-park trip is separate from the winter ski season. Confirm the operating zones, uplift and equipment rules directly before booking.",
    logistics:"Start in the Fitzsimmons Zone with an orientation or lesson. Rent a park-appropriate bike and protection; verify sizing and brake setup before the first uplift.",sourceUrl:"https://www.whistler.com/blog/post/whistler-mountain-bike-park-beginner/",sourceLabel:"Tourism Whistler first-visit guide",
    options:[
      {name:"EZ Does It orientation",distance:"Lift-served lap; consult current trail map",ascent:"Uplift, not a measured climbing route",time:"Allow time for repeated familiarization laps",grade:"Beginner park progression",description:"Use the easier opening lap to learn braking, berms and trail etiquette. Green in a bike park still requires bike handling skills."},
      {name:"B-Line progression",distance:"Lift-served lap; consult current trail map",ascent:"Uplift",time:"Progress only when ready",grade:"Intermediate step after the green trails",description:"Practice first in the skills area and take coaching if needed. Jump lines such as Crank It Up should not become an automatic next step."},
    ],
  },
  "tahoe-flume":{
    season:"Plan for snow-free summer or early autumn. Confirm snow clearance, fire restrictions and any day-specific bike access rules before arranging a shuttle.",
    logistics:"The Flume segment is only part of a day. Approaches from North Canyon or Tunnel Creek, climbs and the return add substantial effort; book a legitimate shuttle separately if needed.",sourceUrl:"https://parks.nv.gov/parks/spooner-lake",sourceLabel:"Nevada State Parks Spooner backcountry",
    options:[{name:"Marlette Flume segment",distance:"About 4.4 mi / 7.1 km segment only, per park overview",ascent:"Full outing depends on approach and return",time:"Plan a full outing around the access route",grade:"Intermediate handling with consequential exposure",description:"Lake Tahoe views sit below a narrow mountainside traverse. Dismount where uncomfortable and stop in a safe widening for photographs. This distance is not a complete shuttle itinerary."}],
  },
  "blue-derby":{
    season:"Tasmanian forest conditions can change in any season. Follow the official status and avoid saturated or closed trails even when travel plans are fixed.",
    logistics:"Use Derby as a town base and distinguish nearby loops from remote routes. Arrange rentals, repairs and any shuttle independently; the trail network does not imply a lift service.",sourceUrl:"https://ridebluederby.com.au/derby-trails",sourceLabel:"Blue Derby official trail selection",
    options:[{name:"Lake Derby introduction",distance:"Choose the signed lake route on the current map",ascent:"Not verified",time:"Leave room for lakeside stops",grade:"Operator's easiest and most accessible trail",description:"A gentler lake setting for an introduction before committing to the granite and technical trails deeper in the network. Check suitability and direction at the trailhead."}],
  },
};
