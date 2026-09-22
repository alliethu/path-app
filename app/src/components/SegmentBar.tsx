import type { RouteSegment } from "../data/dummy-data";
import { concernPalette } from "../lib/concern";

interface SegmentBarProps {
  segments: RouteSegment[];
  /** When set, dims all other segments and rings this one — used to highlight the segment a
   * hovered/tapped "Why this route?" factor is describing. */
  highlightedIndex?: number | null;
}

export function SegmentBar({ segments, highlightedIndex = null }: SegmentBarProps) {
  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-full ring-1 ring-slate-200">
        {segments.map((segment, index) => {
          const isDimmed = highlightedIndex !== null && highlightedIndex !== index;
          const isHighlighted = highlightedIndex === index;
          return (
            <div
              key={index}
              className={`h-full transition-opacity ${concernPalette[segment.concern].bg} ${
                isDimmed ? "opacity-35" : "opacity-100"
              } ${isHighlighted ? `ring-2 ring-inset ${concernPalette[segment.concern].ring}` : ""}`}
              style={{ width: `${segment.lengthPercent}%` }}
              title={segment.label}
            />
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
        {(["low", "moderate", "high"] as const).map((concern) => (
          <span key={concern} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${concernPalette[concern].dot}`} />
            {concernPalette[concern].label}
          </span>
        ))}
      </div>
    </div>
  );
}
