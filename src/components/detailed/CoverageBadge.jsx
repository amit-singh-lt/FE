import React from "react";

const colorMap = {
  // Execution types
  replay: "bg-blue-100 text-blue-800",
  rerun: "bg-green-100 text-green-800",
  "Code Validation": "bg-purple-100 text-purple-800",

  // Operations
  OPEN: "bg-yellow-100 text-yellow-800",
  UPLOAD: "bg-pink-100 text-pink-800",
  CLICK: "bg-indigo-100 text-indigo-800",
  TYPE: "bg-orange-100 text-orange-800",
  SCROLL: "bg-teal-100 text-teal-800",
  QUERY: "bg-cyan-100 text-cyan-800",
  WAIT: "bg-rose-100 text-rose-800",

  // Default
  default: "bg-gray-100 text-gray-700",
};

export function CoverageBadge({ coverage }) {
  if (!coverage) {
    return <span className="text-xs text-gray-400">-</span>;
  }

  // Handle array format (old data format)
  if (Array.isArray(coverage)) {
    if (coverage.length === 0) {
      return <span className="text-xs text-gray-400">-</span>;
    }

    return (
      <div className="flex flex-wrap gap-1">
        {coverage.map((item, idx) => (
          <span
            key={item || idx}
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              colorMap[item] || colorMap.default
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  // Handle object format (new API data format)
  if (typeof coverage === "object") {
    const execution = coverage.execution || [];
    const operations = coverage.operations || [];

    if (execution.length === 0 && operations.length === 0) {
      return <span className="text-xs text-gray-400">-</span>;
    }

    return (
      <div className="space-y-1">
        {/* Execution badges */}
        {execution.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 font-medium mr-1">
              Exec:
            </span>
            {execution.map((item, idx) => (
              <span
                key={`exec-${item}-${idx}`}
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  colorMap[item] || colorMap.default
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Operations badges */}
        {operations.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 font-medium mr-1">Ops:</span>
            {operations.map((item, idx) => (
              <span
                key={`ops-${item}-${idx}`}
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  colorMap[item] || colorMap.default
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Handle string format (fallback)
  if (typeof coverage === "string") {
    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-medium ${
          colorMap[coverage] || colorMap.default
        }`}
      >
        {coverage}
      </span>
    );
  }

  return <span className="text-xs text-gray-400">-</span>;
}
