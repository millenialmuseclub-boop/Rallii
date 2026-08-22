import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export default function Icon() { return new ImageResponse(<RailIcon size={32} />, size); }

function RailIcon({ size }: { size: number }) {
  const rail = { position: "absolute" as const, top: size * .46, width: size * .095, height: size * .44, background: "#f5f2ea" };
  return <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#173f32" }}>
    {[.56, .68, .80, .92].map((top) => <span key={top} style={{ position: "absolute", left: size * .24, top: size * top, width: size * .52, height: Math.max(1, size * .055), background: "#d5b86a" }} />)}
    <span style={{ ...rail, left: size * .34 }} /><span style={{ ...rail, left: size * .57 }} />
    <span style={{ position: "absolute", left: size * .34, top: size * .20, width: size * .095, height: size * .095, borderRadius: "50%", background: "#f5f2ea" }} /><span style={{ position: "absolute", left: size * .57, top: size * .20, width: size * .095, height: size * .095, borderRadius: "50%", background: "#f5f2ea" }} />
  </div>;
}
