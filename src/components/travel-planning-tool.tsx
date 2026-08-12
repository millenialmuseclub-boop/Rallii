export type PlanningToolType = "flights" | "hotels" | "stays";

const toolCopy: Record<PlanningToolType, { title: string; copy: string }> = {
  flights: { title: "Flights", copy: "Arrange the journey to and from your rail route." },
  hotels: { title: "Hotels", copy: "Find a practical base near the beginning or end of the line." },
  stays: { title: "Stays", copy: "Plan a longer stay around the landscapes you came to experience." },
};

export function TravelPlanningTool({ type }: { type: PlanningToolType }) {
  const tool = toolCopy[type];
  return <section className="planning-tool" aria-labelledby={`planning-${type}`}><p className="eyebrow">Travel tool</p><h2 id={`planning-${type}`}>{tool.title}</h2><p>{tool.copy}</p><div className="planning-tool__status"><strong>Planning tool coming soon</strong><span>Rallii will add an approved responsive booking tool here when its exact partner configuration is supplied.</span></div></section>;
}
