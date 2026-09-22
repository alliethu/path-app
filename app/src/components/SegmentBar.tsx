import type { RouteSegment } from "../data/dummy-data";

const concernStyles: Record<RouteSegment["concern"], { bg: string; dot: string; label: string }> = {
  low: { bg: "bg-emerald-400", dot: "bg-emerald-500", label: "Lower concern" },
  moderate: { bg: "bg-amber-400", dot: "bg-amber-500", label: "Moderate concern" },
  high: { bg: "bg-orange-400", dot: "bg-orange-500", label: "Higher concern" },
};

interface SegmentBarProps {
  segments: RouteSegment[];
}

export function SegmentBar({ segments }: SegmentBarProps) {
  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-full ring-1 ring-slate-200">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`${concernStyles[segment.concern].bg} h-full`}
            style={{ width: `${segment.lengthPercent}%` }}
            title={segment.label}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
        {(["low", "moderate", "high"] as const).map((concern) => (
          <span key={concern} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${concernStyles[concern].dot}`} />
            {concernStyles[concern].label}
          </span>
        ))}
      </div>
    </div>
  );
}
