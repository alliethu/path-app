import { useState } from "react";
import type { RouteScenario, TravelMode } from "../data/dummy-data";
import { SegmentBar } from "./SegmentBar";
import { RouteMap } from "./RouteMap";
import { concernPalette } from "../lib/concern";

interface RouteReportProps {
  scenario: RouteScenario;
  mode: TravelMode;
  onBack: () => void;
  onSave: () => void;
}

export function RouteReport({ scenario, mode, onBack, onSave }: RouteReportProps) {
  const [showAlternative, setShowAlternative] = useState(false);
  const [highlightedSegment, setHighlightedSegment] = useState<number | null>(null);

  const modeData = scenario.modes[mode];
  const active = showAlternative ? modeData.alternative : modeData.route;

  function toggleHighlight(index: number) {
    setHighlightedSegment((prev) => (prev === index ? null : index));
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        ← New search
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-teal-700 uppercase">
              {showAlternative ? "Alternative route" : "Route report"}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              {scenario.from} → {scenario.to}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {scenario.dateTimeLabel} · {mode === "walking" ? "Walking" : "Transit"}
            </p>
          </div>
          {showAlternative && (
            <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
              {modeData.alternative.timeDelta}
            </span>
          )}
        </div>

        {/* Route summary */}
        <div className="mt-5 flex gap-6 rounded-xl bg-slate-50 px-4 py-3">
          <div>
            <p className="text-xs text-slate-500">Distance</p>
            <p className="text-sm font-semibold text-slate-800">{active.distance}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Time</p>
            <p className="text-sm font-semibold text-slate-800">{active.duration}</p>
          </div>
        </div>

        {/* Map */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-slate-700">Route map</p>
          <RouteMap segments={active.segments} highlightedIndex={highlightedSegment} />
        </div>

        {/* Segmented route bar */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-slate-700">Route breakdown</p>
          <SegmentBar segments={active.segments} highlightedIndex={highlightedSegment} />
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            {active.segments.map((segment, index) => (
              <li key={index}>{segment.label}</li>
            ))}
          </ul>
        </div>

        {/* Why this route */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-800">Why this route?</p>
          <p className="mt-0.5 text-xs text-slate-400">
            Sample signals only, for this demo — dummy data, not live conditions. Each dot's color
            shows which route segment above it relates to; hover or tap a signal to highlight it.
          </p>
          <ul className="mt-3 space-y-1">
            {active.factors.map((factor, index) => {
              const segment = active.segments[factor.segmentIndex];
              const isHighlighted = highlightedSegment === factor.segmentIndex;
              return (
                <li key={index}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlightedSegment(factor.segmentIndex)}
                    onMouseLeave={() =>
                      setHighlightedSegment((prev) => (prev === factor.segmentIndex ? null : prev))
                    }
                    onFocus={() => setHighlightedSegment(factor.segmentIndex)}
                    onBlur={() =>
                      setHighlightedSegment((prev) => (prev === factor.segmentIndex ? null : prev))
                    }
                    onClick={() => toggleHighlight(factor.segmentIndex)}
                    className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                      isHighlighted ? "bg-slate-50 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {segment && (
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${concernPalette[segment.concern].dot}`}
                      />
                    )}
                    <span>{factor.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Comparison, only shown on the alternative view */}
        {showAlternative && (
          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/60 p-4">
            <p className="text-sm font-semibold text-teal-800">Compared to your original route</p>
            <ul className="mt-2 space-y-1.5 text-sm text-teal-800">
              {modeData.alternative.tradeoffs.map((tradeoff, index) => (
                <li key={index} className="flex gap-2">
                  <span>•</span>
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setShowAlternative((prev) => !prev);
              setHighlightedSegment(null);
            }}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            {showAlternative ? "Back to original route" : "See alternative route"}
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            Save report
          </button>
        </div>
      </div>
    </div>
  );
}
