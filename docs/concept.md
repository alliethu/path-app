# Pathwise — Product Concept

## Problem

Two categories of tools exist today, and neither answers the question people
actually have when they're about to go somewhere new.

- **Navigation apps** (Google Maps, Apple Maps, Waze) tell you *how* to get
  somewhere — the fastest or shortest route — but say nothing about what
  that route is actually like to walk, ride, or wait along.
- **Crime maps and "neighborhood safety" apps** tell you *what has happened*
  near a pin on a map, aggregated at the neighborhood or ZIP-code level. They
  don't know your route, your destination, your mode of travel, or what time
  you'll be there.

Neither one answers the question a person actually has: *"What should I know
about my actual journey — this address, to that address, on foot or by
transit, at this time of day?"* People are left stitching together a mental
model from a navigation app in one tab and a crime map in another, and even
then the crime map is describing a whole neighborhood, not the three blocks
they're going to walk.

## Solution

**Pathwise is route intelligence, not a neighborhood score.** You give it an
origin, a destination, a time, and a mode of transportation (walking,
transit, or driving), and it analyzes the specific path between those points
rather than a generic area around either end. Instead of collapsing
everything into a single mysterious number, Pathwise explains the factors
that make up its read of a route — pedestrian infrastructure, crossing
complexity, activity levels, historical incident context, transit
characteristics, and time-of-day effects — in plain language, so a person can
weigh those factors the way they'd weigh advice from someone who actually
knows the area.

## Core Product

The core Pathwise experience is a route report generated from an address,
destination, time, and travel mode:

- **Walking route analysis** — a segment-by-segment read of a specific
  walking path, not just the neighborhood it passes through.
- **Public-transit analysis** — stop and line-level context: wait
  environments, transfer points, and service characteristics.
- **Time-of-day context** — the same route can look and feel very different
  at 7am, 2pm, and 10pm, and the report reflects that.
- **Alternative route suggestions** — if a nearby path trades a few minutes
  for meaningfully better conditions, Pathwise surfaces it.
- **Explainable route considerations** — every factor behind the read is
  named and described, never a black-box score alone.
- **Shareable reports** — a route report can be saved or sent to someone
  else (a family member, a friend picking you up, a real estate client).

## Killer Feature

**"Why this route?"** — a single expandable explanation attached to every
route report that lays out, in plain language, the specific factors that
shaped the read of that route:

- Pedestrian infrastructure quality (sidewalks, lighting, crossings)
- Major crossings and intersection complexity along the path
- Activity and commercial context (is this a lively corridor or a dead
  stretch at this hour?)
- Historical incident context, treated as one input among many, not a verdict
- Transit-specific characteristics (platform/stop environment, wait times,
  transfer exposure)
- Time-of-day factors that shift the read depending on when you travel

This is the feature that differentiates Pathwise from both a plain map and a
plain crime overlay: it shows its work.

## Four Products (Go / Stay / Home / Commute)

Pathwise's core intelligence engine powers four distinct, purpose-built
products aimed at different moments in a person's life:

- **Pathwise Go** — everyday, on-demand route intelligence for any trip:
  "how does this specific walk or transit ride look right now, for me?"
- **Pathwise Stay** — hotel and travel intelligence. Before booking or
  arriving somewhere new, understand what the walk from the hotel to a
  restaurant, conference venue, or landmark is actually like, especially at
  night — built for travelers, and especially useful for women traveling
  alone.
- **Pathwise Home** — homebuyer and neighborhood intelligence. Turn a
  candidate address into a full "what would living here actually be like"
  report: school routes, grocery access, parks, restaurants, transit options,
  likely commute, walking conditions, and how all of that shifts by time of
  day.
- **Pathwise Commute** — home-to-office mobility intelligence. Evaluate the
  daily commute itself — not just its duration, but its walking segments,
  transfer points, and how it changes across the times you'd realistically
  be making it (early morning, late evening).

## Personalization

Different people weigh route factors differently, so Pathwise lets users
choose what matters most to them rather than imposing one universal formula:

- Fewer major crossings
- Stronger pedestrian infrastructure (sidewalks, lighting, crosswalks)
- Higher visible activity / population density along the route
- Lower weight on historical incident data, or more
- Shorter total route distance
- Fewer transit transfers

A **family mode** further adjusts recommendations for stroller-friendly
paths, gentler curb cuts, and child-oriented pacing and route choices — a
different profile than an optimized solo-commuter route.

## Data Architecture

The core asset is the **Pathwise Intelligence Engine**, a layer that sits
between raw data sources and the user-facing report. It fuses:

- Base mapping and routing APIs (the "how to get there" layer)
- Public safety and incident data
- Transit agency data (routes, stops, schedules, service characteristics)
- Pedestrian infrastructure data (sidewalks, crossings, lighting where
  available)
- Points-of-interest and activity data (commercial density, foot traffic
  proxies)
- Time-of-day and temporal context, applied as a modifier across all of the
  above

The proprietary value isn't the base map — anyone can license mapping and
routing APIs. It's the intelligence layer that fuses these sources into a
single, explainable, route-specific read, and the accumulated data on how
routes are actually evaluated and used over time.

## Algorithm

Pathwise's route read is a weighted composite of multiple factors, not a
single incident count. An illustrative weighting for the initial model:

- **Crime / incident context — 25%**: recent, geographically-relevant
  incident data along the specific path, weighted by recency and relevance
  rather than raw counts.
- **Pedestrian infrastructure — 20%**: presence and quality of sidewalks,
  marked crossings, and lighting along the route.
- **Road / crossing complexity — 15%**: number and difficulty of major
  intersections or crossings a pedestrian has to navigate.
- **Isolation / activity level — 15%**: how populated or commercially active
  the corridor is at the relevant time — an empty stretch reads differently
  than a busy one.
- **Transit characteristics — 10%**: quality of stops/platforms, wait
  environment, and transfer exposure for transit-based routes.
- **Emergency-service proximity — 5%**: rough proximity to responders as a
  minor contextual factor.
- **Time-of-day adjustment — 10%**: a modifier applied across the other
  factors to reflect how conditions shift between, say, midday and late
  night.

These weights are a starting point, not a fixed formula — they're expected to
be tuned as real usage data comes in, and to be adjustable by the user's own
personalization preferences (see above).

## Ethical / Legal Design

Pathwise is built around a strict set of trust principles, because
"neighborhood safety" data has a long history of causing real harm when
handled carelessly:

- Pathwise characterizes **places and routes**, built from observable,
  public data — never people, homes, races, ethnic groups, or any protected
  class.
- No route or place is ever declared flatly "safe" or "unsafe." Pathwise
  avoids false precision and instead presents evidence and its
  uncertainty, letting the user form their own judgment.
- Historical incident data is treated as one input with clear limitations
  (reporting bias, recency, geographic imprecision), not as ground truth.
  This directly informs the modest 25% weighting given to it in the
  algorithm above — it's a meaningful input, not the whole story.
- All explanations name their specific factors, so a user can push back on
  or discount any one of them, rather than trusting an opaque score.

## Competitive Positioning

- **Google/Apple Maps** — excellent at navigation, silent on route context.
- **Crime maps and safety apps** (e.g., tools in the spirit of "Walkable,"
  "RouteSafe," "SafeRoute," or "SafeWalk AI"-style products) — visualize
  incidents at the neighborhood or point level, but don't connect them to a
  specific journey, transit ride, or time of day, and are often walking-only.
- **Walkability tools** — describe an area's general walkability, not a
  specific origin-to-destination path.
- **Real estate platforms** — surface property details and sometimes a
  generic area score, but not journey-level context (school routes, walking
  conditions, time-of-day effects).

Pathwise's positioning is the white space these leave open: **journey-level,
multi-modal, time-aware context**, applied consistently across travel, real
estate, and daily commuting — a single intelligence layer instead of four
disconnected point solutions.

## Business Model

**Consumer:**

- Free basic route analysis, to build habitual use and trust.
- **Pathwise Plus** subscription at roughly **$7.99/month** for unlimited
  reports, saved routes, family mode, and deeper explanations.
- One-time **Home / Moving reports** for people evaluating a single address
  or move, who don't need an ongoing subscription.

**B2B:**

- Realtor subscriptions — Pathwise Home reports as a value-add for listings
  and buyer consultations.
- Hotel and hospitality tools — Pathwise Stay integrated into booking or
  concierge experiences.
- Corporate relocation packages — Pathwise Home/Commute bundled for
  relocating employees.
- API / white-label location intelligence — licensing the underlying
  intelligence engine to other products (real estate platforms, travel
  sites, corporate mobility tools) that want route-level context without
  building it themselves.

## Data

Pathwise's intelligence engine is designed to fuse multiple public and
licensed sources rather than relying on any single feed:

- Base mapping and routing providers (for the underlying "how to get there"
  layer Pathwise builds context on top of)
- Public safety / incident data from municipal and county open-data
  portals
- Transit agency GTFS feeds and real-time service data
- Pedestrian and street infrastructure data (sidewalks, crossings, street
  lighting) where available from municipal GIS sources
- Points-of-interest and commercial-density data, used as an activity/
  isolation proxy
- Time-of-day and temporal patterns layered across all of the above

Over time, the accumulating dataset of user preferences, route comparisons,
and route-specific outcomes becomes a proprietary asset in its own right (see
Roadmap / Moat discussion in `docs/deck-summary.md`).

## Naming

**Pathwise** is the chosen name and is reflected throughout this repository
and its branding ("Know the route. Not just the neighborhood."). Alternative
names considered during brainstorming, kept here for reference:

- WayAware
- RouteWise
- Safely
- Waymark
- RouteIQ
- Streetwise

Pathwise was preferred for combining "path" (route-specific, not
neighborhood-specific) with "wise" (informed judgment, not a blunt score),
and for reading well across all four product lines (Go, Stay, Home,
Commute). Name, domain, and trademark validation for "Pathwise" is a
tracked next step — see `docs/roadmap.md`.
