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

export interface RouteFactor {
  text: string;
  /** Index into this variant's `segments[]` that this factor is primarily about — drives the
   * colored dot next to the factor and the map/bar highlight when a user hovers/taps it. */
  segmentIndex: number;
}

export interface RouteVariant {
  distance: string;
  duration: string;
  segments: RouteSegment[];
  factors: RouteFactor[];
}

export interface AlternativeRouteVariant extends RouteVariant {
  /** Human-readable delta vs. the original route, e.g. "+4 min walk". */
  timeDelta: string;
  /** Short list of what changes vs. the original ("fewer major crossings", etc). */
  tradeoffs: string[];
}

export type TravelMode = "walking" | "transit";

/** A scenario's route data for one travel mode (its own route + alternative). */
export interface ModeRouteData {
  route: RouteVariant;
  alternative: AlternativeRouteVariant;
}

export interface RouteScenario {
  id: string;
  label: string;
  from: string;
  to: string;
  dateTimeLabel: string;
  /** Which mode the search screen prefills for this scenario. */
  defaultMode: TravelMode;
  /** Full route data for both modes, so switching Walking/Transit always reflects real data. */
  modes: Record<TravelMode, ModeRouteData>;
}

export const scenarios: RouteScenario[] = [
  {
    id: "hotel-restaurant-friday-night",
    label: "Hotel → Restaurant, Friday 9:30 PM",
    from: "The Ashcroft Hotel, 210 Commerce St",
    to: "Marlow's Kitchen, 640 Main St",
    dateTimeLabel: "Friday, 9:30 PM",
    defaultMode: "walking",
    modes: {
      walking: {
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
            { text: "2 major road crossings without pedestrian signals", segmentIndex: 1 },
            {
              text: "Limited pedestrian infrastructure on the final segment (no sidewalk for ~80 ft)",
              segmentIndex: 2,
            },
            {
              text: "Higher reported activity in this area after dark, mixed with lower foot traffic on weeknights",
              segmentIndex: 2,
            },
            { text: "Street lighting is inconsistent along the last block before Main St", segmentIndex: 2 },
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
            { text: "Only 1 major crossing, with a signaled pedestrian crossing", segmentIndex: 0 },
            { text: "Full sidewalk coverage the entire way", segmentIndex: 1 },
            {
              text: "Passes a busier commercial strip with more foot traffic in the evening",
              segmentIndex: 2,
            },
            { text: "Consistent street lighting for the whole route", segmentIndex: 2 },
          ],
          tradeoffs: [
            "4 minutes longer",
            "1 major crossing instead of 2",
            "More commercial activity and foot traffic along the way",
            "Avoids the higher-concern final segment entirely",
          ],
        },
      },
      transit: {
        route: {
          distance: "0.3 mi walk + 1 bus stop",
          duration: "9 min total",
          segments: [
            {
              lengthPercent: 35,
              concern: "low",
              label: "Walk from hotel to bus stop on Commerce St",
              path: [
                [32.7767, -96.797],
                [32.7778, -96.7967],
              ],
            },
            {
              lengthPercent: 40,
              concern: "low",
              label: "Bus ride toward Elm St",
              path: [
                [32.7778, -96.7967],
                [32.7802, -96.796],
              ],
            },
            {
              lengthPercent: 25,
              concern: "moderate",
              label: "Walk from bus stop to restaurant on Main St",
              path: [
                [32.7802, -96.796],
                [32.7812, -96.7955],
              ],
            },
          ],
          factors: [
            { text: "Bus arrives roughly every 8 minutes on this route Friday evenings", segmentIndex: 1 },
            { text: "Bus stop is well-lit with an actively used waiting shelter", segmentIndex: 0 },
            { text: "Skips the unlit final block used by the walking route", segmentIndex: 2 },
            {
              text: "Short walk from the stop passes an open, well-trafficked restaurant block",
              segmentIndex: 2,
            },
          ],
        },
        alternative: {
          distance: "0.2 mi walk + 1 bus stop",
          duration: "13 min total",
          timeDelta: "+4 min",
          segments: [
            {
              lengthPercent: 30,
              concern: "low",
              label: "Walk to alternate stop further down Commerce St",
              path: [
                [32.7767, -96.797],
                [32.7788, -96.7962],
              ],
            },
            {
              lengthPercent: 55,
              concern: "low",
              label: "Bus ride, one stop further to Main St",
              path: [
                [32.7788, -96.7962],
                [32.7812, -96.7955],
              ],
            },
            {
              lengthPercent: 15,
              concern: "low",
              label: "Arrive directly at restaurant entrance",
              path: [
                [32.7812, -96.7955],
                [32.7813, -96.7954],
              ],
            },
          ],
          factors: [
            { text: "Uses the stop directly outside the restaurant, no final walk needed", segmentIndex: 2 },
            { text: "Bus frequency is slightly lower on this stop (every ~12 minutes)", segmentIndex: 1 },
            { text: "Avoids any nighttime walking segment entirely", segmentIndex: 2 },
            { text: "Same bus line, just one stop further along the route", segmentIndex: 1 },
          ],
          tradeoffs: [
            "4 minutes longer due to a longer wait",
            "Removes the moderate-concern final walk entirely",
            "Drop-off point is directly in front of the restaurant",
            "Slightly less frequent service at this stop",
          ],
        },
      },
    },
  },
  {
    id: "home-transit-weekday-morning",
    label: "Home → Transit Station, Weekday Morning",
    from: "142 Birchwood Ln",
    to: "Fairview Transit Station",
    dateTimeLabel: "Wednesday, 7:15 AM",
    defaultMode: "walking",
    modes: {
      walking: {
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
            {
              text: "Sidewalks present for the full route, with one unmarked crossing near the station",
              segmentIndex: 1,
            },
            {
              text: "Morning school-drop-off traffic increases vehicle activity along Fairview Ave",
              segmentIndex: 1,
            },
            { text: "Good visibility and daylight conditions at this time of day", segmentIndex: 0 },
            {
              text: "Station entrance crossing has moderate vehicle volume during peak commute hours",
              segmentIndex: 1,
            },
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
            { text: "Uses a dedicated park path instead of the Fairview Ave sidewalk", segmentIndex: 0 },
            {
              text: "Avoids the unmarked crossing near the station by using the signaled park entrance",
              segmentIndex: 1,
            },
            { text: "Lower vehicle traffic exposure overall", segmentIndex: 0 },
            { text: "Slightly less direct, adding a couple of minutes", segmentIndex: 1 },
          ],
          tradeoffs: [
            "2 minutes longer",
            "Avoids the unmarked crossing near the station",
            "Less exposure to morning drop-off traffic",
            "Quieter, path-based route instead of roadside sidewalk",
          ],
        },
      },
      transit: {
        route: {
          distance: "0.6 mi (shuttle)",
          duration: "8 min total",
          segments: [
            {
              lengthPercent: 20,
              concern: "low",
              label: "Board shuttle near Birchwood Ln",
              path: [
                [32.8203, -96.809],
                [32.8207, -96.8085],
              ],
            },
            {
              lengthPercent: 55,
              concern: "low",
              label: "Shuttle ride along Fairview Ave",
              path: [
                [32.8207, -96.8085],
                [32.8222, -96.807],
              ],
            },
            {
              lengthPercent: 25,
              concern: "moderate",
              label: "Shuttle drop-off at station entrance",
              path: [
                [32.8222, -96.807],
                [32.823, -96.8065],
              ],
            },
          ],
          factors: [
            {
              text: "Shuttle covers the same stretch as the walking route, avoiding curbside walking",
              segmentIndex: 1,
            },
            { text: "Morning shuttle runs every 10 minutes on weekdays", segmentIndex: 0 },
            {
              text: "Drop-off is at the main station entrance, same crossing point as the walking route",
              segmentIndex: 2,
            },
            { text: "No exposure to sidewalk-level traffic during school drop-off hours", segmentIndex: 1 },
          ],
        },
        alternative: {
          distance: "0.7 mi (shuttle + walk)",
          duration: "10 min total",
          timeDelta: "+2 min",
          segments: [
            {
              lengthPercent: 20,
              concern: "low",
              label: "Board shuttle near Birchwood Ln",
              path: [
                [32.8203, -96.809],
                [32.8207, -96.8085],
              ],
            },
            {
              lengthPercent: 45,
              concern: "low",
              label: "Shuttle ride, alternate stop before Fairview Ave",
              path: [
                [32.8207, -96.8085],
                [32.8218, -96.8072],
              ],
            },
            {
              lengthPercent: 35,
              concern: "low",
              label: "Walk from alternate stop to station entrance via park path",
              path: [
                [32.8218, -96.8072],
                [32.823, -96.8065],
              ],
            },
          ],
          factors: [
            {
              text: "Alternate stop lets you finish on the quieter park path instead of Fairview Ave",
              segmentIndex: 2,
            },
            { text: "Same shuttle frequency as the main stop", segmentIndex: 1 },
            {
              text: "Adds a short walk at the end, but avoids the Fairview Ave crossing entirely",
              segmentIndex: 2,
            },
            { text: "Lower vehicle exposure overall for this option", segmentIndex: 2 },
          ],
          tradeoffs: [
            "2 minutes longer overall",
            "Ends with a short walk instead of a direct drop-off",
            "Avoids the Fairview Ave crossing entirely",
            "Same shuttle frequency, different stop",
          ],
        },
      },
    },
  },
  {
    id: "office-home-transit-evening",
    label: "Office → Home via Transit, Weekday Evening",
    from: "Kessler Tower, 800 5th Ave",
    to: "142 Birchwood Ln",
    dateTimeLabel: "Thursday, 6:40 PM",
    defaultMode: "transit",
    modes: {
      transit: {
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
            {
              text: "1 transfer required at Junction Station, with a ~6 minute wait on the platform",
              segmentIndex: 1,
            },
            {
              text: "Junction Station platform has moderate lighting and moderate reported activity in the evening",
              segmentIndex: 1,
            },
            { text: "Evening service runs on-schedule with typical weekday frequency", segmentIndex: 1 },
            {
              text: "Final walking segment overlaps with the Fairview Ave moderate-concern stretch",
              segmentIndex: 2,
            },
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
            { text: "Direct line, no transfer required", segmentIndex: 1 },
            { text: "Skips the Junction Station wait entirely", segmentIndex: 1 },
            {
              text: "Slightly longer ride time but a single, well-lit platform at Central Station",
              segmentIndex: 0,
            },
            { text: "Same final walking segment as the original route", segmentIndex: 2 },
          ],
          tradeoffs: [
            "5 minutes longer",
            "No transfer, avoiding the Junction Station wait",
            "Higher-frequency, direct line for the full transit segment",
            "Same walk at the end for both options",
          ],
        },
      },
      walking: {
        route: {
          distance: "2.3 mi",
          duration: "46 min walk",
          segments: [
            {
              lengthPercent: 15,
              concern: "low",
              label: "Office to 5th Ave corridor",
              path: [
                [32.7897, -96.802],
                [32.791, -96.8005],
              ],
            },
            {
              lengthPercent: 45,
              concern: "moderate",
              label: "5th Ave corridor to Uptown crossing",
              path: [
                [32.791, -96.8005],
                [32.815, -96.805],
              ],
            },
            {
              lengthPercent: 25,
              concern: "moderate",
              label: "Uptown crossing to Fairview Ave",
              path: [
                [32.815, -96.805],
                [32.8195, -96.808],
              ],
            },
            {
              lengthPercent: 15,
              concern: "low",
              label: "Fairview Ave to home",
              path: [
                [32.8195, -96.808],
                [32.8203, -96.809],
              ],
            },
          ],
          factors: [
            {
              text: "Full walking route takes noticeably longer than transit (46 min vs 34 min)",
              segmentIndex: 1,
            },
            {
              text: "Passes through a mixed commercial/residential corridor with moderate evening activity",
              segmentIndex: 1,
            },
            {
              text: "Two unsignaled crossings along the corridor between 5th Ave and Uptown",
              segmentIndex: 2,
            },
            {
              text: "Final stretch matches the same Fairview Ave conditions as the transit route's last segment",
              segmentIndex: 3,
            },
          ],
        },
        alternative: {
          distance: "2.5 mi",
          duration: "50 min walk",
          timeDelta: "+4 min",
          segments: [
            {
              lengthPercent: 15,
              concern: "low",
              label: "Office to 5th Ave corridor",
              path: [
                [32.7897, -96.802],
                [32.791, -96.8005],
              ],
            },
            {
              lengthPercent: 40,
              concern: "low",
              label: "5th Ave corridor via Riverside Greenway",
              path: [
                [32.791, -96.8005],
                [32.8, -96.8045],
                [32.813, -96.806],
              ],
            },
            {
              lengthPercent: 25,
              concern: "moderate",
              label: "Greenway exit to Fairview Ave",
              path: [
                [32.813, -96.806],
                [32.8195, -96.808],
              ],
            },
            {
              lengthPercent: 20,
              concern: "low",
              label: "Fairview Ave to home via side streets",
              path: [
                [32.8195, -96.808],
                [32.8203, -96.809],
              ],
            },
          ],
          factors: [
            {
              text: "Uses the Riverside Greenway path instead of the 5th Ave corridor for most of the route",
              segmentIndex: 1,
            },
            { text: "Avoids both unsignaled corridor crossings", segmentIndex: 2 },
            { text: "Slightly longer than the direct walking route", segmentIndex: 1 },
            { text: "Same quiet residential finish as the original walking option", segmentIndex: 3 },
          ],
          tradeoffs: [
            "4 minutes longer than the direct walking route",
            "Uses the Riverside Greenway instead of the 5th Ave corridor",
            "Avoids both unsignaled crossings along the corridor",
            "Still notably longer than taking transit",
          ],
        },
      },
    },
  },
];
