# Partner-powered planning

Rallii remains an editorial rail guide. Plan Journey may open optional partner searches only after a traveler chooses to do so; checkout, availability, and prices stay with the partner.

- **Stay22** is the sole accommodation search, used near a route’s departure, arrival, and any explicitly modelled overnight stop.
- **GetYourGuide** is used only for prepared destination-city context and is loaded after interaction.
- **Trip.com** is the supplied Travelpayouts flight search, loaded only after a traveler selects Find flights.
- **DiscoverCars** is the supplied Travelpayouts car-search widget, loaded only after a traveler selects Continue by car.
- **Agoda** is configured separately but intentionally not displayed, so accommodation providers never compete in the same plan.

Public partner IDs belong in environment configuration. Future city, flight, or car partners should be added to `src/data/partner-planning.ts`; keep them opt-in and do not change route-page editorial guidance into booking content.
