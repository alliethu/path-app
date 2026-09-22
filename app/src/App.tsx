import { useState } from "react";
import type { RouteScenario, TravelMode } from "./data/dummy-data";
import { SearchScreen } from "./components/SearchScreen";
import { RouteReport } from "./components/RouteReport";
import { SavedConfirmation } from "./components/SavedConfirmation";

type Screen = "search" | "report" | "saved";

function App() {
  const [screen, setScreen] = useState<Screen>("search");
  const [scenario, setScenario] = useState<RouteScenario | null>(null);
  const [, setMode] = useState<TravelMode>("walking");

  function handleSearchSubmit(nextScenario: RouteScenario, nextMode: TravelMode) {
    setScenario(nextScenario);
    setMode(nextMode);
    setScreen("report");
  }

  function handleNewSearch() {
    setScreen("search");
    setScenario(null);
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:py-16">
      {screen === "search" && <SearchScreen onSubmit={handleSearchSubmit} />}

      {screen === "report" && scenario && (
        <RouteReport scenario={scenario} onBack={handleNewSearch} onSave={() => setScreen("saved")} />
      )}

      {screen === "saved" && scenario && (
        <SavedConfirmation onBackToReport={() => setScreen("report")} onNewSearch={handleNewSearch} />
      )}

      <p className="mt-10 text-center text-xs text-slate-400">
        Pathwise Go prototype · UI only, dummy data, no live routing or safety data
      </p>
    </div>
  );
}

export default App;
