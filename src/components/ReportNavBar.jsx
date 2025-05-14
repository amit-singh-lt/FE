import React from "react";

export function ReportNavBar({
  team,
  env,
  suite,
  build,
  isSummary,
  isDetailed,
  navigate,
}) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="px-6">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => navigate("/")}
                className="text-xl font-bold text-gray-900 focus:outline-none"
              >
                QA Report Lab
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                navigate(`/${team}/${env}/${suite}/${build}/summary`)
              }
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isSummary
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() =>
                navigate(`/${team}/${env}/${suite}/${build}/detailed`)
              }
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDetailed
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Detailed
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
