interface SavedConfirmationProps {
  onBackToReport: () => void;
  onNewSearch: () => void;
}

export function SavedConfirmation({ onBackToReport, onNewSearch }: SavedConfirmationProps) {
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">Report saved</h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Your route report has been saved. In a full version of Pathwise, you'd find it later under
          "Saved reports."
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onBackToReport}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Back to report
          </button>
          <button
            type="button"
            onClick={onNewSearch}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            Start a new search
          </button>
        </div>
      </div>
    </div>
  );
}
