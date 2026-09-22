import { useState } from "react";
import type { RouteScenario } from "../data/dummy-data";
import { SegmentBar } from "./SegmentBar";
import { RouteMap } from "./RouteMap";

interface RouteReportProps {
  scenario: RouteScenario;
  onBack: () => void;
  onSave: () => void;
}

export function RouteReport({ scenario, onBack, onSave }: RouteReportProps) {
  const [showAlternative, setShowAlternative] = useState(false);
  const active = showAlternative ? scenario.alternative : scenario.route;

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
              {scenario.dateTimeLabel} · {scenario.mode === "walking" ? "Walking" : "Transit"}
            </p>
          </div>
          {showAlternative && (
            <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
              {scenario.alternative.timeDelta}
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
          <RouteMap segments={active.segments} />
        </div>

        {/* Segmented route bar */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-slate-700">Route breakdown</p>
          <SegmentBar segments={active.segments} />
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            {active.segments.map((segment, index) => (
              <li key={index}>{segment.label}</li>
            ))}
          </ul>
        </div>

        {/* Why this route */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-800">Why this route?</p>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            {active.factors.map((factor, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-teal-600">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Comparison, only shown on the alternative view */}
        {showAlternative && (
          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/60 p-4">
            <p className="text-sm font-semibold text-teal-800">Compared to your original route</p>
            <ul className="mt-2 space-y-1.5 text-sm text-teal-800">
              {scenario.alternative.tradeoffs.map((tradeoff, index) => (
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
            onClick={() => setShowAlternative((prev) => !prev)}
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
