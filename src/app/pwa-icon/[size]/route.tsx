import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }, { size: "1024" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  if (!["192", "512", "1024"].includes(size)) return new Response(null, { status: 404 });
  const bytes = await readFile(path.join(process.cwd(), "public", `rallii-icon-${size}.png`));
  return new Response(new Uint8Array(bytes), { headers: { "Content-Type": "image/png" } });
}
