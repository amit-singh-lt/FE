import React from "react";

import { COLORS } from "../../utils/constants";

export function CriticalMetrics({ passRate, criticalFailures, skipped }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Critical Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-gray-500 mb-1">Pass Rate</div>
          <div className={`text-3xl font-bold ${COLORS.STATUS.PASSED.accent}`}>
            {passRate.toFixed(2)}%
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Critical Failures (P0/P1)</div>
          <div className={`text-3xl font-bold ${COLORS.STATUS.FAILED.accent}`}>
            {criticalFailures}
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Skipped Tests</div>
          <div className={`text-3xl font-bold ${COLORS.STATUS.SKIPPED.accent}`}>
            {skipped}
          </div>
        </div>
      </div>
    </div>
  );
}
