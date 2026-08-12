export interface RouteMediaAsset {
  routeSlug: string;
  path: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  creator: string;
  sourcePageUrl: string;
  originalFileUrl: string;
  licenseName: string;
  licenseUrl: string;
  location: string;
  relatedLandmarkId?: string;
  accessedAt: string;
}

export const routeMediaBySlug: Record<string, RouteMediaAsset> = {
  "glacier-express": {
    routeSlug: "glacier-express", path: "/images/routes/glacier-express/rhine-gorge.webp", width: 1800, height: 1217,
    alt: "Two red Glacier Express trainsets following the Rhine through a pale-walled gorge",
    caption: "The Glacier Express follows the young Rhine through the dramatic walls of the Rhine Gorge.",
    creator: "David Gubler", sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Glacier_Express_in_der_Vorderrheinschlucht.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Glacier_Express_in_der_Vorderrheinschlucht.jpg",
    licenseName: "Public domain", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", location: "Rhine Gorge, Switzerland", relatedLandmarkId: "rhine-gorge", accessedAt: "2026-08-12",
  },
  "bernina-express": {
    routeSlug: "bernina-express", path: "/images/routes/bernina-express/morteratsch-curve.webp", width: 1800, height: 1200,
    alt: "A red Bernina Express curving beneath glacier-covered peaks near Morteratsch",
    caption: "Near Morteratsch, the railway turns toward the Bernina massif with glaciers visible beyond the train.",
    creator: "Stefans Pixmix", sourcePageUrl: "https://commons.wikimedia.org/wiki/File:2022-08-05_Morteratsch_Berninabahn_CH.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/2022-08-05_Morteratsch_Berninabahn_CH.jpg",
    licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", location: "Morteratsch, Switzerland", relatedLandmarkId: "morteratsch-landscape", accessedAt: "2026-08-12",
  },
  "goldenpass-express": {
    routeSlug: "goldenpass-express", path: "/images/routes/goldenpass-express/zweisimmen.webp", width: 1800, height: 1200,
    alt: "A blue and gold GoldenPass Express standing beside mountain chalets at Zweisimmen",
    caption: "At Zweisimmen, the GoldenPass Express prepares for the gauge-changing passage between two railway networks.",
    creator: "Falk2", sourcePageUrl: "https://commons.wikimedia.org/wiki/File:L02_535_Bf_Zweisimmen,_Golden-Pass-Einheit.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/7/73/L02_535_Bf_Zweisimmen%2C_Golden-Pass-Einheit.jpg",
    licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", location: "Zweisimmen, Switzerland", accessedAt: "2026-08-12",
  },
  "west-highland-line": {
    routeSlug: "west-highland-line", path: "/images/routes/west-highland-line/glenfinnan-viaduct.webp", width: 1414, height: 862,
    alt: "A steam train crossing the curved Glenfinnan Viaduct amid green Highland slopes",
    caption: "The railway sweeps across Glenfinnan Viaduct, the West Highland Line’s most recognisable structure.",
    creator: "Matthieu Riegler", sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Glenfinnan_Viaduct_-_2022_(cropped).jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Glenfinnan_Viaduct_-_2022_%28cropped%29.jpg",
    licenseName: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/", location: "Glenfinnan, Scotland", relatedLandmarkId: "glenfinnan-viaduct", accessedAt: "2026-08-12",
  },
  "flam-railway": {
    routeSlug: "flam-railway", path: "/images/routes/flam-railway/flamsdalen.webp", width: 1800, height: 1200,
    alt: "Red Flåm Railway carriages waiting between steep dark mountains at Myrdal",
    caption: "At mountain-level Myrdal, the Flåm Railway meets the Bergen Line before descending through Flåmsdalen.",
    creator: "Jorge Láscar", sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Fl%C3%A5msbana_-_Crowned_the_most_beautiful_train_journey_in_the_world_(32060844875).jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Fl%C3%A5msbana_-_Crowned_the_most_beautiful_train_journey_in_the_world_%2832060844875%29.jpg",
    licenseName: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", location: "Myrdal, Norway", accessedAt: "2026-08-12",
  },
  "cinque-terre": {
    routeSlug: "cinque-terre", path: "/images/routes/cinque-terre/corniglia.webp", width: 1800, height: 1350,
    alt: "A Cinque Terre regional train emerging from a tunnel beside Corniglia station",
    caption: "At Corniglia, the regional train briefly emerges between the coastal corridor’s closely spaced tunnels.",
    creator: "Remontees", sourcePageUrl: "https://commons.wikimedia.org/wiki/File:E464-regionale-cinque-terre-depart-corniglia2.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/E464-regionale-cinque-terre-depart-corniglia2.jpg",
    licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", location: "Corniglia, Italy", accessedAt: "2026-08-12",
  },
  tranzalpine: {
    routeSlug: "tranzalpine", path: "/images/routes/tranzalpine/arthurs-pass.webp", width: 1800, height: 1200,
    alt: "The silver TranzAlpine train stopped at Arthur’s Pass station beneath the Southern Alps",
    caption: "Arthur’s Pass marks the high point of the TranzAlpine’s crossing of New Zealand’s Southern Alps.",
    creator: "Maksym Kozlenko", sourcePageUrl: "https://commons.wikimedia.org/wiki/File:TranzAlpine_train_-_panoramio.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/TranzAlpine_train_-_panoramio.jpg",
    licenseName: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", location: "Arthur’s Pass, New Zealand", relatedLandmarkId: "arthurs-pass", accessedAt: "2026-08-12",
  },
};

export function getRouteMedia(routeSlug: string): RouteMediaAsset | undefined { return routeMediaBySlug[routeSlug]; }
