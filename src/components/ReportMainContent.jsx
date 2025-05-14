import React from "react";
import { DetailedView } from "./DetailedView";
import { ReportFilters } from "./ReportFilters";
import { SummaryView } from "./SummaryView";
import { LoadingSpinner } from "./common/LoadingSpinner";

export function ReportMainContent({
  isSummary,
  isDetailed,
  location,
  enabled,
  isLoading,
  error,
  data,
  testData,
}) {
  return (
    <main className="py-6">
      {(isSummary || location.pathname === "/") && <ReportFilters />}
      {enabled && (isSummary || isDetailed) ? (
        isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col items-center space-y-3 border border-red-200">
            <svg
              className="w-10 h-10 text-red-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-lg font-semibold text-red-600">
              Failed to load report
            </div>
            <div className="text-gray-500 text-sm text-center">
              There was a problem fetching the report data. Please check your
              connection or try again.
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        ) : isSummary ? (
          <SummaryView summary={data?.history || []} />
        ) : (
          <DetailedView tests={testData || []} />
        )
      ) : null}
    </main>
  );
}
