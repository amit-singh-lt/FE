import React from "react";

import { COLORS } from "../../utils/constants";

export function ModuleHealth({ moduleStats }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-300">
        <h3 className="text-lg font-semibold">Module Health Status</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Tests
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Passed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Failed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skipped
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pass Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {moduleStats.map((module) => (
              <tr key={module.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {module.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {module.total}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${COLORS.STATUS.PASSED.accent}`}
                >
                  {module.passed}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${COLORS.STATUS.FAILED.accent}`}
                >
                  {module.failed}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${COLORS.STATUS.SKIPPED.accent}`}
                >
                  {module.skipped}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {module.passRate.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      module.passRate >= 98
                        ? `${COLORS.HEALTH.HEALTHY.bg} ${COLORS.HEALTH.HEALTHY.text}`
                        : module.passRate >= 90
                        ? `${COLORS.HEALTH.WARNING.bg} ${COLORS.HEALTH.WARNING.text}`
                        : `${COLORS.HEALTH.CRITICAL.bg} ${COLORS.HEALTH.CRITICAL.text}`
                    }`}
                  >
                    {module.passRate >= 98
                      ? "Healthy"
                      : module.passRate >= 90
                      ? "Warning"
                      : "Critical"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
