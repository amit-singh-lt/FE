import React from "react";

import { TestRow } from "./TestRow";

export function TestTable({ tests, expandedRows, onToggleRow }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-8 px-2 py-2"></th>
              <th className="w-12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="w-16 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase px-3 py-2">
                Test&nbsp;ID
              </th>
              <th className="w-2/5 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="w-1/3 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Coverage
              </th>
              <th className="w-16 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Priority
              </th>
              <th className="w-20 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Duration
              </th>
              <th className="w-1/6 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Failed Step
              </th>
              <th className="w-24 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                History
              </th>
              <th className="w-32 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Links
              </th>
              <th className="w-32 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tests.map((test) => (
              <TestRow
                key={test.test_id}
                test={test}
                isExpanded={expandedRows.has(test.test_id)}
                onToggle={() => onToggleRow(test.test_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
