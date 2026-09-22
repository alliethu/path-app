export type SegmentConcern = "low" | "moderate" | "high";

/** [latitude, longitude] pair. Approximate, plausible coordinates for this prototype — not geocoded. */
export type LatLng = [number, number];

export interface RouteSegment {
  /** Relative share of the route this segment covers (segments in a route should sum to 100). */
  lengthPercent: number;
  concern: SegmentConcern;
  label: string;
  /** Start/end (or multi-point) coordinates for this segment, used to draw it on the map. */
  path: LatLng[];
}

export interface RouteVariant {
  distance: string;
  duration: string;
  segments: RouteSegment[];
  factors: string[];
}

export interface AlternativeRouteVariant extends RouteVariant {
  /** Human-readable delta vs. the original route, e.g. "+4 min walk". */
  timeDelta: string;
  /** Short list of what changes vs. the original ("fewer major crossings", etc). */
  tradeoffs: string[];
}

export type TravelMode = "walking" | "transit";

export interface RouteScenario {
  id: string;
  label: string;
  from: string;
  to: string;
  mode: TravelMode;
  dateTimeLabel: string;
  route: RouteVariant;
  alternative: AlternativeRouteVariant;
}

export const scenarios: RouteScenario[] = [
  {
    id: "hotel-restaurant-friday-night",
    label: "Hotel → Restaurant, Friday 9:30 PM",
    from: "The Ashcroft Hotel, 210 Commerce St",
    to: "Marlow's Kitchen, 640 Main St",
    mode: "walking",
    dateTimeLabel: "Friday, 9:30 PM",
    route: {
      distance: "0.8 mi",
      duration: "16 min walk",
      segments: [
        {
          lengthPercent: 45,
          concern: "low",
          label: "Commerce St to 4th Ave",
          path: [
            [32.7767, -96.797],
            [32.7784, -96.797],
          ],
        },
        {
          lengthPercent: 25,
          concern: "moderate",
          label: "4th Ave crossing to Elm St",
          path: [
            [32.7784, -96.797],
            [32.7798, -96.7965],
          ],
        },
        {
          lengthPercent: 30,
          concern: "high",
          label: "Elm St to Main St (final block)",
          path: [
            [32.7798, -96.7965],
            [32.7812, -96.7955],
          ],
        },
      ],
      factors: [
        "2 major road crossings without pedestrian signals",
        "Limited pedestrian infrastructure on the final segment (no sidewalk for ~80 ft)",
        "Higher reported activity in this area after dark, mixed with lower foot traffic on weeknights",
        "Street lighting is inconsistent along the last block before Main St",
      ],
    },
    alternative: {
      distance: "1.0 mi",
      duration: "20 min walk",
      timeDelta: "+4 min",
      segments: [
        {
          lengthPercent: 40,
          concern: "low",
          label: "Commerce St to 4th Ave",
          path: [
            [32.7767, -96.797],
            [32.7784, -96.797],
          ],
        },
        {
          lengthPercent: 35,
          concern: "low",
          label: "4th Ave to Elm St via Riverside Plaza",
          path: [
            [32.7784, -96.797],
            [32.78, -96.7948],
          ],
        },
        {
          lengthPercent: 25,
          concern: "moderate",
          label: "Elm St to Main St via commercial strip",
          path: [
            [32.78, -96.7948],
            [32.7812, -96.7955],
          ],
        },
      ],
      factors: [
        "Only 1 major crossing, with a signaled pedestrian crossing",
        "Full sidewalk coverage the entire way",
        "Passes a busier commercial strip with more foot traffic in the evening",
        "Consistent street lighting for the whole route",
      ],
      tradeoffs: [
        "4 minutes longer",
        "1 major crossing instead of 2",
        "More commercial activity and foot traffic along the way",
        "Avoids the higher-concern final segment entirely",
      ],
    },
  },
  {
    id: "home-transit-weekday-morning",
    label: "Home → Transit Station, Weekday Morning",
    from: "142 Birchwood Ln",
    to: "Fairview Transit Station",
    mode: "walking",
    dateTimeLabel: "Wednesday, 7:15 AM",
    route: {
      distance: "0.6 mi",
      duration: "12 min walk",
      segments: [
        {
          lengthPercent: 60,
          concern: "low",
          label: "Birchwood Ln to Fairview Ave",
          path: [
            [32.8203, -96.809],
            [32.8215, -96.8078],
          ],
        },
        {
          lengthPercent: 40,
          concern: "moderate",
          label: "Fairview Ave to station entrance",
          path: [
            [32.8215, -96.8078],
            [32.823, -96.8065],
          ],
        },
      ],
      factors: [
        "Sidewalks present for the full route, with one unmarked crossing near the station",
        "Morning school-drop-off traffic increases vehicle activity along Fairview Ave",
        "Good visibility and daylight conditions at this time of day",
        "Station entrance crossing has moderate vehicle volume during peak commute hours",
      ],
    },
    alternative: {
      distance: "0.7 mi",
      duration: "14 min walk",
      timeDelta: "+2 min",
      segments: [
        {
          lengthPercent: 55,
          concern: "low",
          label: "Birchwood Ln to Maple Park path",
          path: [
            [32.8203, -96.809],
            [32.8218, -96.8072],
          ],
        },
        {
          lengthPercent: 45,
          concern: "low",
          label: "Maple Park path to station entrance",
          path: [
            [32.8218, -96.8072],
            [32.823, -96.8065],
          ],
        },
      ],
      factors: [
        "Uses a dedicated park path instead of the Fairview Ave sidewalk",
        "Avoids the unmarked crossing near the station by using the signaled park entrance",
        "Lower vehicle traffic exposure overall",
        "Slightly less direct, adding a couple of minutes",
      ],
      tradeoffs: [
        "2 minutes longer",
        "Avoids the unmarked crossing near the station",
        "Less exposure to morning drop-off traffic",
        "Quieter, path-based route instead of roadside sidewalk",
      ],
    },
  },
  {
    id: "office-home-transit-evening",
    label: "Office → Home via Transit, Weekday Evening",
    from: "Kessler Tower, 800 5th Ave",
    to: "142 Birchwood Ln",
    mode: "transit",
    dateTimeLabel: "Thursday, 6:40 PM",
    route: {
      distance: "5.4 mi (transit) + 0.4 mi walk",
      duration: "34 min total",
      segments: [
        {
          lengthPercent: 20,
          concern: "low",
          label: "Walk from office to Central Station",
          path: [
            [32.7897, -96.802],
            [32.791, -96.8005],
          ],
        },
        {
          lengthPercent: 55,
          concern: "moderate",
          label: "Blue Line transit, 1 transfer at Junction",
          path: [
            [32.791, -96.8005],
            [32.815, -96.805],
            [32.8195, -96.808],
          ],
        },
        {
          lengthPercent: 25,
          concern: "moderate",
          label: "Walk from Fairview Station to home",
          path: [
            [32.8195, -96.808],
            [32.8203, -96.809],
          ],
        },
      ],
      factors: [
        "1 transfer required at Junction Station, with a ~6 minute wait on the platform",
        "Junction Station platform has moderate lighting and moderate reported activity in the evening",
        "Evening service runs on-schedule with typical weekday frequency",
        "Final walking segment overlaps with the Fairview Ave moderate-concern stretch",
      ],
    },
    alternative: {
      distance: "5.7 mi (transit) + 0.4 mi walk",
      duration: "39 min total",
      timeDelta: "+5 min",
      segments: [
        {
          lengthPercent: 20,
          concern: "low",
          label: "Walk from office to Central Station",
          path: [
            [32.7897, -96.802],
            [32.791, -96.8005],
          ],
        },
        {
          lengthPercent: 60,
          concern: "low",
          label: "Green Line transit, direct (no transfer)",
          path: [
            [32.791, -96.8005],
            [32.81, -96.8095],
          ],
        },
        {
          lengthPercent: 20,
          concern: "moderate",
          label: "Walk from Fairview Station to home",
          path: [
            [32.81, -96.8095],
            [32.8203, -96.809],
          ],
        },
      ],
      factors: [
        "Direct line, no transfer required",
        "Skips the Junction Station wait entirely",
        "Slightly longer ride time but a single, well-lit platform at Central Station",
        "Same final walking segment as the original route",
      ],
      tradeoffs: [
        "5 minutes longer",
        "No transfer, avoiding the Junction Station wait",
        "Higher-frequency, direct line for the full transit segment",
        "Same walk at the end for both options",
      ],
    },
  },
];
