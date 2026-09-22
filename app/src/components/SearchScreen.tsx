import { useState } from "react";
import { scenarios, type RouteScenario, type TravelMode } from "../data/dummy-data";

interface SearchScreenProps {
  onSubmit: (scenario: RouteScenario, mode: TravelMode) => void;
}

export function SearchScreen({ onSubmit }: SearchScreenProps) {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  const [mode, setMode] = useState<TravelMode>(scenario.mode);

  function handleScenarioChange(nextId: string) {
    const next = scenarios.find((s) => s.id === nextId) ?? scenarios[0];
    setScenarioId(nextId);
    setMode(next.mode);
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium tracking-wide text-teal-700 uppercase">Pathwise Go</p>
        <h1 className="mt-1 text-3xl font-semibold text-slate-900">Know the route.</h1>
        <p className="mt-1 text-slate-500">Not just the neighborhood.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">Demo scenario</label>
        <select
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          value={scenarioId}
          onChange={(event) => handleScenarioChange(event.target.value)}
        >
          {scenarios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-slate-400">
          This prototype uses canned routes instead of live geocoding — pick a scenario to prefill the form.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">From</label>
            <input
              readOnly
              value={scenario.from}
              className="mt-1.5 w-full cursor-default rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">To</label>
            <input
              readOnly
              value={scenario.to}
              className="mt-1.5 w-full cursor-default rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Date &amp; time</label>
            <input
              readOnly
              value={scenario.dateTimeLabel}
              className="mt-1.5 w-full cursor-default rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-slate-700">Mode</span>
            <div className="mt-1.5 inline-flex rounded-lg border border-slate-300 bg-slate-50 p-1">
              {(["walking", "transit"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    mode === m ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSubmit(scenario, mode)}
          className="mt-6 w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
        >
          Check my route
        </button>
      </div>
    </div>
  );
}
