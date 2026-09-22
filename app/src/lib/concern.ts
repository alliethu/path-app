import type { SegmentConcern } from "../data/dummy-data";

/**
 * Single source of truth for how each concern level is represented visually
 * (segment bar fill, legend dot, factor-list dot, and map polyline color) so
 * the map, the bar, and the "Why this route?" list always agree on color.
 */
export const concernPalette: Record<
  SegmentConcern,
  { bg: string; dot: string; ring: string; label: string; hex: string }
> = {
  low: {
    bg: "bg-emerald-400",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500",
    label: "Lower concern",
    hex: "#10b981",
  },
  moderate: {
    bg: "bg-amber-400",
    dot: "bg-amber-500",
    ring: "ring-amber-500",
    label: "Moderate concern",
    hex: "#f59e0b",
  },
  high: {
    bg: "bg-orange-400",
    dot: "bg-orange-500",
    ring: "ring-orange-500",
    label: "Higher concern",
    hex: "#f97316",
  },
};
