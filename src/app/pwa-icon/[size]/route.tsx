import { ImageResponse } from "next/og";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }, { size: "1024" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const value = (await params).size;
  const size = value === "1024" ? 1024 : value === "512" ? 512 : 192;
  const rail = { position: "absolute" as const, top: size * .42, width: size * .095, height: size * .46, background: "#f5f2ea" };
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#173f32" }}>
    {[.54, .66, .78, .90].map((top) => <span key={top} style={{ position: "absolute", left: size * .22, top: size * top, width: size * .56, height: size * .052, background: "#d5b86a" }} />)}
    <span style={{ ...rail, left: size * .33 }} /><span style={{ ...rail, left: size * .575 }} />
    <span style={{ position: "absolute", left: size * .33, top: size * .16, width: size * .095, height: size * .095, borderRadius: "50%", background: "#f5f2ea" }} /><span style={{ position: "absolute", left: size * .575, top: size * .16, width: size * .095, height: size * .095, borderRadius: "50%", background: "#f5f2ea" }} />
  </div>, { width: size, height: size });
}
