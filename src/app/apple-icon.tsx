import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() { return new ImageResponse(<RailIcon size={180} />, size); }

function RailIcon({ size }: { size: number }) {
  const rail = { position: "absolute" as const, top: size * .42, width: size * .095, height: size * .46, background: "#f5f2ea" };
  return <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#173f32" }}>
    {[.54, .66, .78, .90].map((top) => <span key={top} style={{ position: "absolute", left: size * .22, top: size * top, width: size * .56, height: size * .052, background: "#d5b86a" }} />)}
    <span style={{ ...rail, left: size * .33 }} /><span style={{ ...rail, left: size * .575 }} />
    <span style={{ position: "absolute", left: size * .33, top: size * .16, width: size * .095, height: size * .095, borderRadius: "50%", background: "#f5f2ea" }} /><span style={{ position: "absolute", left: size * .575, top: size * .16, width: size * .095, height: size * .095, borderRadius: "50%", background: "#f5f2ea" }} />
  </div>;
}
