import type { BestSideSegment, JourneyDirection, ViewSide } from "../types/route.ts";

/** Summarize supported scenic sections, never infer a side from missing data. */
export function seatRecommendation(segments: BestSideSegment[], direction: JourneyDirection): { side: ViewSide; explanation: string } {
  const totals: Record<ViewSide, number> = { left: 0, right: 0, both: 0, varies: 0, unknown: 0 };
  for (const segment of segments) {
    const length = segment.endDistanceKm - segment.startDistanceKm;
    if (Number.isFinite(length) && length > 0) totals[direction === "reverse" ? segment.reverseDirectionSide : segment.forwardDirectionSide] += length;
  }
  const supported = (Object.entries(totals) as [ViewSide, number][]).filter(([side, km]) => side !== "unknown" && km > 0).sort((a, b) => b[1] - a[1]);
  const side = supported.length === 0 ? "unknown" : supported.length > 1 && Math.abs(supported[0][1] - supported[1][1]) < 0.01 ? "varies" : supported[0][0];
  return { side, explanation: side === "unknown" ? "There is not enough supported seat guidance to recommend a side. Use the scenic highlights to plan where to look." : side === "both" ? "The strongest supported views are shared across both sides." : side === "varies" ? "No single side leads across the prepared scenic sections. Choose by the highlights that matter most to you." : `The ${side} side covers the greatest share of the prepared scenic sections. Views also change along the way; use the section guide below.` };
}
