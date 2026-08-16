# Partner-powered planning

Rallii remains an editorial rail guide. Plan Journey may open optional partner searches only after a traveler chooses to do so; checkout, availability, and prices stay with the partner.

- **Stay22** is the sole accommodation search, used near a route’s departure, arrival, and any explicitly modelled overnight stop.
- **GetYourGuide** is used only for prepared destination-city context and is loaded after interaction.
- **Trip.com** is held back until its provided Travelpayouts creative is verified as flight-only.
- **DiscoverCars** is held back until a destination-aware embed or link format is confirmed.
- **Agoda** is configured separately but intentionally not displayed, so accommodation providers never compete in the same plan.

Public partner IDs belong in environment configuration. Future city, flight, or car partners should be added to `src/data/partner-planning.ts`; keep them opt-in and do not change route-page editorial guidance into booking content.
