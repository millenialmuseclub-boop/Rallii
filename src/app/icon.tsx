import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export default function Icon() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#173f32", color: "#f5f2ea", fontFamily: "Georgia", fontSize: 23 }}>R</div>, size); }
