import { ImageResponse } from "next/og";

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const value = (await params).size;
  const size = value === "512" ? 512 : 192;
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#173f32", color: "#f5f2ea", fontFamily: "Georgia", fontSize: size * 0.62, borderRadius: size * 0.12 }}>R</div>, { width: size, height: size });
}
