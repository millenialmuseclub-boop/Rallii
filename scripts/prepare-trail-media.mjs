// Rebuild local derivatives from the checked-in, credited source manifest.
// Run explicitly; ordinary builds never fetch photography from external services.
import { readFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const media = JSON.parse(await readFile('src/trail/media.json', 'utf8'));
await mkdir('public/images/trails', { recursive: true });
for (const [key, asset] of Object.entries(media)) {
  const response = await fetch(asset.originalUrl);
  if (!response.ok) throw new Error(`${key}: source returned ${response.status}`);
  await sharp(Buffer.from(await response.arrayBuffer())).rotate()
    .resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 })
    .toFile(`public${asset.src}`);
  console.log(`Prepared ${key}`);
}
