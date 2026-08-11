# Rallii

Rallii is a curated rail-journey discovery platform that helps travelers experience great train journeys better: know where to sit, what to see, and when to look.

## Technology stack

- Next.js with the App Router
- TypeScript
- Tailwind CSS
- Turso/libSQL
- MapLibre GL JS
- GeoJSON for prepared railway route geometry

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Turso credentials are optional locally; without them, the database client uses `file:local.db`.

## Environment variables

| Variable | Purpose | Local requirement |
| --- | --- | --- |
| `TURSO_DATABASE_URL` | Turso/libSQL database URL | Optional; defaults to `file:local.db` |
| `TURSO_AUTH_TOKEN` | Token for a hosted Turso database | Optional for the local database |

When connecting to hosted Turso, copy `.env.example` to `.env.local` and replace both placeholders. Do not create `.env.local` for the default local database.

The public prototype reads prepared route data at build time and does not require Turso credentials. These variables are only required when the seed command or future server-side data access intentionally connects to hosted Turso.

## Current MVP milestone

Rallii is now a four-route early product covering the Glacier Express, Bernina Express, GoldenPass Express, and Scotland’s West Highland Line. The fourth journey proves the shared experience works for an ordinary scheduled regional train as well as branded panoramic services. The home and country-aware Discover pages are generated from reusable route data, while one shared route template provides prepared railway-aligned GeoJSON, structured landmarks, cautious directional seat guidance, synchronized MapLibre maps and scenic timelines, practical information, and source attribution.

Saved journeys are stored locally in the browser as a small list of route slugs. They require no account, never duplicate route content, and are resolved against the central route repository on `/saved`.

Run `npm run db:seed` to copy the prototype's structured route data into local libSQL. This creates `local.db`; hosted Turso credentials are not required.

Railway geometry is prepared before publication rather than calculated by the consumer app. GeoJSON stores the route shape while route metadata and editorial journey intelligence remain separate. The Bernina geometry is prepared from OpenStreetMap relation 89842; the West Highland geometry uses the ScotRail Glasgow Queen Street–Mallaig relation 3224918. Both carry ODbL attribution in file metadata. See [`docs/prepared-route-architecture.md`](docs/prepared-route-architecture.md) for the sourcing approach.

Product constraints and direction are recorded in [`docs/product-principles.md`](docs/product-principles.md).

## Deploying Rallii to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the Rallii repository.
3. Keep the automatically detected **Next.js** framework settings and default build command.
4. No environment variables are required for the current prepared-data prototype. Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` only when intentionally connecting the deployment to hosted Turso.
5. Select **Deploy**, then use the generated `vercel.app` URL to preview and share Rallii.

With Vercel Git integration enabled, pushes to `main` create updated production deployments automatically. The current Vercel project uses the Next.js framework preset and does not require deployment protection for the public site. Do not upload `.env.local`, `local.db`, or Turso secrets to GitHub.
