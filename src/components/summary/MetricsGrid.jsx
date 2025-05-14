import { CheckCircle2, Clock, XCircle } from "lucide-react";
import React from "react";

import { COLORS } from "../../utils/constants";
import { formatDuration } from "../../utils/formatters";

export function MetricsGrid({ totalTests, passed, failed, duration }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="text-gray-500">Total Tests</div>
          <div className="text-2xl font-bold">{totalTests}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div
            className={`${COLORS.STATUS.PASSED.accent} flex items-center gap-2`}
          >
            <CheckCircle2 size={20} />
            Passed
          </div>
          <div className={`text-2xl font-bold ${COLORS.STATUS.PASSED.accent}`}>
            {passed}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div
            className={`${COLORS.STATUS.FAILED.accent} flex items-center gap-2`}
          >
            <XCircle size={20} />
            Failed
          </div>
          <div className={`text-2xl font-bold ${COLORS.STATUS.FAILED.accent}`}>
            {failed}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="text-gray-500 flex items-center gap-2">
            <Clock size={20} />
            Duration
          </div>
          <div className="text-2xl font-bold">{formatDuration(duration)}</div>
        </div>
      </div>
    </div>
  );
}
