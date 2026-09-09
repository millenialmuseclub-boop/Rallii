import sharp from "sharp";
import { readFile, readdir } from "node:fs/promises";

// One source keeps web and future native builds visually consistent.
const source = await readFile(new URL("../assets/branding/rallii-monogram.png", import.meta.url));
const outputs = [
  ["src/app/icon.png", 512], ["src/app/apple-icon.png", 180],
  ["public/rallii-icon-192.png", 192], ["public/rallii-icon-512.png", 512],
  ["public/rallii-icon-1024.png", 1024],
  ["ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png", 1024],
];
const root = "android/app/src/main/res";
for (const dir of await readdir(root)) {
  if (!dir.startsWith("mipmap-")) continue;
  for (const file of await readdir(`${root}/${dir}`)) {
    if (!/^ic_launcher(?:_round|_foreground)?\.png$/.test(file)) continue;
    const target = `${root}/${dir}/${file}`;
    const { width } = await sharp(await readFile(target)).metadata();
    outputs.push([target, width]);
  }
}
for (const [target, size] of outputs) {
  await sharp(source).resize(size, size).flatten({ background: "#0b4938" }).removeAlpha().png().toFile(target);
}
const inset = await sharp(source).resize(400, 400).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 3, background: "#0b4938" } })
  .composite([{ input: inset, left: 56, top: 56 }]).png().toFile("public/rallii-icon-maskable.png");
console.log(`Prepared ${outputs.length} icons and the maskable variant.`);
