import React from "react";
import { TestRerun } from "./TestRerun";

export function TestFilters({
  filter,
  searchQuery,
  moduleFilter,
  priorityFilter,
  onFilterChange,
  onSearchChange,
  onModuleChange,
  onPriorityChange,
  tests,
}) {
  // Get unique coverage options
  const getCoverageOptions = () => {
    const options = new Set();

    tests.forEach((test) => {
      const coverage = test.module || test.coverage;

      if (Array.isArray(coverage)) {
        coverage.forEach((item) => options.add(item));
      } else if (typeof coverage === "object" && coverage !== null) {
        const execution = coverage.execution || [];
        const operations = coverage.operations || [];
        execution.forEach((item) => options.add(item));
        operations.forEach((item) => options.add(item));
      } else if (typeof coverage === "string") {
        options.add(coverage);
      }
    });

    return Array.from(options).sort();
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-3 border-b border-zinc-300 grid grid-cols-2">
        <h2 className="text-base font-semibold">Test Results</h2>
        <div className="justify-self-end">
          <TestRerun onClick={() => alert("Rerun Failed Tests!")} />
        </div>
      </div>

      <div className="p-3 grid grid-cols-1 md:grid-cols-4 gap-3">
        <select
          className="border border-zinc-300 rounded px-2 py-1 text-sm"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="failed">Failed</option>
          <option value="passed">Passed</option>
          <option value="skipped">Skipped</option>
        </select>

        <input
          type="text"
          placeholder="Search by test name..."
          className="border border-zinc-300 rounded px-2 py-1 text-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          className="border border-zinc-300 rounded px-2 py-1 text-sm"
          value={moduleFilter}
          onChange={(e) => onModuleChange(e.target.value)}
        >
          <option value="all">All Coverage</option>
          {getCoverageOptions().map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>

        <select
          className="border border-zinc-300 rounded px-2 py-1 text-sm"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
        </select>
      </div>
    </div>
  );
}
