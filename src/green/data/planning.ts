export type PlanningResource={id:string;category:"travel"|"stay"|"transport"|"golf"|"prepare";title:string;description:string;href:string;external:boolean;relationship:"official"|"independent"|"rallii"};
export const planningResources:PlanningResource[]=[
{id:"trips",category:"golf",title:"Start with a Green Trip",description:"Use a restrained editorial sequence as the shape of the journey.",href:"/green/trips",external:false,relationship:"rallii"},
{id:"official",category:"golf",title:"Confirm with the course",description:"Use each Course Profile’s official source for access, current fees and reservations.",href:"/green/#catalogue",external:false,relationship:"official"},
{id:"flights",category:"travel",title:"Trip.com flights",description:"Compare travel to the region. Prices and booking remain entirely with Trip.com.",href:"https://www.trip.com/flights/",external:true,relationship:"independent"},
{id:"stays",category:"stay",title:"Agoda stays",description:"Research a practical base near the courses you intend to play.",href:"https://www.agoda.com/",external:true,relationship:"independent"},
{id:"cars",category:"transport",title:"DiscoverCars",description:"Compare local transport where courses are dispersed.",href:"https://www.discovercars.com/",external:true,relationship:"independent"},
{id:"weather",category:"prepare",title:"Local weather",description:"Check the destination forecast close to departure and pack for change.",href:"https://www.weather.gov/",external:true,relationship:"official"},
{id:"protection",category:"prepare",title:"Travel protection guidance",description:"Read independent consumer guidance before deciding whether coverage fits your trip.",href:"https://travel.state.gov/content/travel/en/international-travel/before-you-go/travelers-with-special-considerations/travel-insurance.html",external:true,relationship:"official"}
];
