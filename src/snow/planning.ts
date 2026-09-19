/** Evergreen editorial profiles. Sources reviewed 2026-09-19; never live conditions. */
export interface SnowPlanning {
  terrain: string;
  transport: string;
  family: string;
  offMountain: string;
  seasonalNote: string;
  bestMonths: number[];
  perfectDay: [string, string, string];
  sources: { label: string; url: string }[];
}
export const snowPlanning: Record<string, SnowPlanning> = {
  "brevent-flegere": {
    terrain:"Brévent and Flégère form a linked, south-facing ski area with Mont Blanc across the valley. Check the connection and return lifts before crossing sectors; a sightseeing ticket is not a ski pass.",
    transport:"Chamonix town serves the Brévent side; Les Praz is the base for Flégère. Choose a nearby bus stop and check the last return rather than assuming an open ski link will take you home.",
    family:"For first lessons, agree the exact learning area with the school. A high-mountain panorama and a suitable beginner slope are separate choices.",
    offMountain:"Leave time for Chamonix town after the descent. Non-skiers should confirm the correct sightseeing product and lift access for the day.",
    seasonalNote:"January–March is a starting window. Sun exposure affects the snow through the day, while weather can interrupt the link between sectors.",bestMonths:[1,2,3],
    perfectDay:["Start from the base nearest your accommodation and confirm the return route.","Pick suitable open pistes and pause at Planpraz for the panorama.","Return to your starting sector before its essential connecting lifts close."],
    sources:[{label:"Chamonix tourism: Brévent–Flégère",url:"https://www.chamonix.com/a-voir-a-faire/sports-et-outdoor/le-ski-dans-la-vallee-de-chamonix-mont-blanc/domaines-skiables/domaine-skiable-brevent-flegere"}],
  },
  "whistler-blackcomb": {
    terrain: "Two large mountains reward choosing one sector at a time. First-timers should use the Olympic or Magic learning areas with instruction; alpine bowls are a separate commitment from marked groomers.",
    transport: "Choose Whistler Village, Upper Village or Creekside around your lesson meeting point. Confirm your Vancouver transfer and the return to your own base before crossing mountains.",
    family: "Book lessons at the same base as your rentals. A village address does not guarantee a short walk to the correct ski-school meeting point.",
    offMountain: "Keep a village afternoon for galleries and food. Check sightseeing access separately from a ski pass.",
    seasonalNote: "January–March is a winter planning window; April can suit a spring trip. Lower slopes and high alpine terrain may have very different conditions.", bestMonths: [1,2,3,4],
    perfectDay: ["Collect equipment at your booked base and orient yourself on the current map.","Stay within one mountain sector and regroup for lunch before considering a cross-mountain journey.","Return to the agreed base with a lift-time buffer, then walk the village."],
    sources: [{label:"Whistler base and lodging guide",url:"https://www.whistlerblackcomb.com/travel-guide/where-to-stay-in-whistler.aspx"},{label:"First-time lessons",url:"https://www.whistlerblackcomb.com/plan-your-trip/ski-and-ride-lessons/first-timers.aspx"}],
  },
  "lake-louise": {
    terrain: "Front-side pistes, the Larch area and back bowls give different perspectives on the Rockies. The base learning area is separate from the upper mountain; Summit Chair is not a beginner route choice.",
    transport: "Choose Lake Louise village for a closer base or Banff for a wider town stay. Confirm the ski shuttle pickup independently of transport to the lakeshore.",
    family: "Use the base beginner centre for first lessons and agree a lodge meeting point. A green way down from most lifts still requires controlled turns and stopping.",
    offMountain: "Plan a separate lakeshore visit: the ski resort and Lake Louise itself are different places. Winter walking and skating require their own condition checks.",
    seasonalNote: "January–March suits a midwinter trip; April offers a spring alternative. Cold, wind and visibility can change the sensible terrain choice.", bestMonths:[1,2,3,4],
    perfectDay:["Begin at the base with a lesson or a familiar graded piste.","Choose front-side or Larch runs from the current map; stop for mountain views off the skiing line.","Return before the booked shuttle and leave the lakeshore excursion for a separate outing."],
    sources:[{label:"Lake Louise terrain and maps",url:"https://www.skilouise.com/explore-winter/winter-ski-ride/lift-runs-parks-status/"}],
  },
  revelstoke: {
    terrain:"A long-vertical mountain where sustained descending adds to the technical challenge. Dedicated beginner terrain exists, but the resort's steep reputation should not determine a learner's itinerary.",
    transport:"Compare a town stay with the resort base. Arrange the winter transfer before committing to an arrival flight and leave a weather buffer for mountain roads.",
    family:"Choose instruction and a meeting place around the beginner facilities. Split ability groups deliberately instead of expecting everyone to follow the same descent.",
    offMountain:"Allow time in Revelstoke town between mountain days. A shorter ski day can make a multi-day visit more enjoyable than repeating full vertical descents when tired.",
    seasonalNote:"January–March is the core planning window. Upper and lower mountain snow can differ; choose terrain using the day's official report.",bestMonths:[1,2,3],
    perfectDay:["Check the map and lesson location before boarding the gondola.","Build in a rest after sustained descending; choose the next run by remaining energy.","Finish with a comfortable return and time for dinner in town."],
    sources:[{label:"Revelstoke mountain and beginner terrain",url:"https://www.revelstokemountainresort.com/mountain/mountain-stats/"}],
  },
  chamonix:{
    terrain:"This is a valley of separate ski areas, not a single continuous piste network. Brévent–Flégère faces the Mont Blanc massif; valley learning areas such as Les Planards and Le Savoy serve a different day from high-mountain terrain.",
    transport:"Choose accommodation around the ski area you intend to use most. Check buses and pass coverage when moving between areas; don't plan on skiing between every base.",
    family:"Select a named beginner area and school meeting point before buying lift access. Mixed groups can meet back in town instead of attempting the same mountain route.",
    offMountain:"Town cafés and mountain sightseeing can fill a non-ski day. Sightseeing tickets and weather-dependent lift access need separate checks.",
    seasonalNote:"January–March is a useful starting window. Altitude and aspect produce different conditions between valley learning slopes and upper terrain.",bestMonths:[1,2,3],
    perfectDay:["Take the bus to the area selected for the group's ability.","Stay in that area, with time to pause for the Mont Blanc panorama.","Return to Chamonix town; plan another valley sector for another day."],
    sources:[{label:"Chamonix beginner areas",url:"https://www.chamonix.com/activites/hiver/le-ski-dans-la-vallee-de-chamonix-mont-blanc/debuter-le-ski-dans-la-vallee-de-chamonix"},{label:"Brévent–Flégère",url:"https://www.chamonix.com/a-voir-a-faire/sports-et-outdoor/le-ski-dans-la-vallee-de-chamonix-mont-blanc/domaines-skiables/domaine-skiable-brevent-flegere"}],
  },
  zermatt:{
    terrain:"High alpine terrain and Matterhorn views make this a destination for carefully paced days. Pick a sector rather than treating a cross-border link as a required part of the trip.",
    transport:"Zermatt is car-free. Arrive by train, or leave a car in Täsch and complete the journey by rail; check the final transfer to your lodging with luggage and skis.",
    family:"Book the lesson meeting point before choosing where to stay. A village walk in ski boots can be more consequential than a short distance on a map.",
    offMountain:"Make the car-free village part of the trip. Mountain sightseeing needs its own ticket and weather check.",
    seasonalNote:"January–April offers winter and spring planning options. Wind can interrupt high links, so keep the return to Switzerland within a conservative plan.",bestMonths:[1,2,3,4],
    perfectDay:["Arrive at the selected sector with the correct pass and a return plan.","Pause for Matterhorn views from a designated stopping area; keep enough time for the journey home.","Finish in the village instead of relying on the last cross-border connection."],
    sources:[{label:"Zermatt arrival planning",url:"https://zermatt.swiss/en/plan-book/arrival"}],
  },
  "niseko-united":{
    terrain:"Annupuri, Niseko Village, Grand Hirafu and Hanazono share a mountain but have distinct bases. Groomed resort runs and terrain beyond the boundary are different commitments; an open gate is not a guarantee of safety.",
    transport:"Choose a base before booking a New Chitose transfer. Keep a road-transport alternative for returning from another area when upper lift links are unavailable.",
    family:"Match accommodation and lessons to the same base. A beginner does not need to cross the mountain to get value from the trip.",
    offMountain:"Leave an evening for food in your own base and check return transport before dining elsewhere. Confirm local etiquette and entry rules for any onsen visit.",
    seasonalNote:"January–February prioritizes the midwinter experience; March offers another planning option. Snowfall, visibility and wind are never guaranteed.",bestMonths:[1,2,3],
    perfectDay:["Start on marked resort terrain at your booked base.","Explore a second sector only when links, ability and the return plan line up.","Return before the last essential connection; keep time for a warm meal."],
    sources:[{label:"Niseko United areas",url:"https://www.niseko.ne.jp/en/"},{label:"Niseko boundary and gate rules",url:"https://www.niseko.ne.jp/en/news/nisekos-backcountry-system-explained/"}],
  },
  "coronet-peak":{
    terrain:"Open slopes and rolling groomers above Queenstown let you see the shape of the mountain. Choose the learner area for first lessons; broad views do not remove the need to read each run's grade.",
    transport:"Queenstown is a town base rather than a ski-in village. Reserve transport to the mountain and confirm the return independently of any evening plans.",
    family:"Arrange lessons, rentals and arrival together so the first morning is not spent moving between queues. Plan a meeting place at the base building.",
    offMountain:"Use a rest day for Queenstown's lakefront or Arrowtown, with a separate transport plan.",
    seasonalNote:"July–September is the southern-winter planning window. Wind and freeze–thaw conditions can change an open, exposed mountain quickly.",bestMonths:[7,8,9],
    perfectDay:["Arrive with time to fit rentals before the lesson or first easy run.","Work through terrain gradually and stop to enjoy the Queenstown basin views.","Return on the booked transport, then take a lakefront walk if conditions suit."],
    sources:[{label:"Coronet Peak first-timer guide",url:"https://www.coronetpeak.co.nz/first-timer-guide"}],
  },
  portillo:{
    terrain:"A compact Andes ski destination around Laguna del Inca. Learner slopes and demanding terrain coexist; the distinctive specialist lifts require their own ability and technique assessment.",
    transport:"Plan the mountain-road transfer from Santiago with the operator. Build in weather flexibility instead of pairing the final ski day with a tight international departure.",
    family:"Confirm instruction, equipment and the room package together. The concentrated hotel base makes a shared lunch a useful regrouping point.",
    offMountain:"The lake and mountain setting are the attraction between sessions. Plan time at the hotel rather than expecting a separate resort town outside the door.",
    seasonalNote:"July–September is a planning window, not a promise of open lifts. Southern winter storms can affect both access roads and skiing.",bestMonths:[7,8,9],
    perfectDay:["Meet your instructor or start on a suitable marked piste near the base.","Regroup for lunch and take in Laguna del Inca from a safe resort viewpoint.","Finish before fatigue and enjoy the hotel setting; keep onward travel flexible."],
    sources:[{label:"Portillo terrain and mountain planning",url:"https://skiportillo.com/en/our-mountain/ski-slopes-skiable-terrain/"}],
  },
};
