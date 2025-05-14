import {
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import React, { useMemo, useState } from "react";

import { useTestAnalysis } from "../hooks/useTestAnalysis";
import { COLORS, FLAKINESS_THRESHOLDS } from "../utils/constants";

export function FlakyTestsAnalysis({ tests }) {
  const [timeRange, setTimeRange] = useState("all");
  const [showFailToPass, setShowFailToPass] = useState(true);
  const [showPassToFail, setShowPassToFail] = useState(true);
  const [expandedTests, setExpandedTests] = useState(new Set());

  const { flakyTests } = useTestAnalysis(tests);

  const { failToPassTests, passToFailTests } = useMemo(() => {
    return {
      failToPassTests: flakyTests.filter((t) => t.type === "fail-to-pass"),
      passToFailTests: flakyTests.filter((t) => t.type === "pass-to-fail"),
    };
  }, [flakyTests]);

  const toggleExpanded = (testId) => {
    const newExpanded = new Set(expandedTests);
    if (expandedTests.has(testId)) {
      newExpanded.delete(testId);
    } else {
      newExpanded.add(testId);
    }
    setExpandedTests(newExpanded);
  };

  const renderTestPattern = (pattern) => (
    <div className="flex space-x-0.5">
      {pattern.map((status, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            status === "passed"
              ? COLORS.STATUS.PASSED.accent
              : COLORS.STATUS.FAILED.accent
          }`}
          title={`Build ${index + 1}: ${status.toUpperCase()}`}
        />
      ))}
    </div>
  );

  const renderFlakyTestList = (tests, title) => {
    if (tests.length === 0) return null;

    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className={COLORS.STATUS.FAILED.accent} size={20} />
            <h3 className="text-lg font-semibold">{title}</h3>
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tests.length}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {tests.map((test) => (
            <div
              key={test.test_id}
              className="border rounded-lg overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpanded(test.test_id)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{test.name}</span>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        test.flakinessRate > FLAKINESS_THRESHOLDS.HIGH
                          ? COLORS.HEALTH.CRITICAL.bg +
                            " " +
                            COLORS.HEALTH.CRITICAL.text
                          : test.flakinessRate > FLAKINESS_THRESHOLDS.MEDIUM
                          ? COLORS.HEALTH.WARNING.bg +
                            " " +
                            COLORS.HEALTH.WARNING.text
                          : COLORS.HEALTH.HEALTHY.bg +
                            " " +
                            COLORS.HEALTH.HEALTHY.text
                      }`}
                    >
                      {test.flakinessRate.toFixed(1)}% flaky
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {test.module.join(", ")}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {renderTestPattern(test.pattern)}
                  {expandedTests.has(test.test_id) ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </div>

              {expandedTests.has(test.test_id) && (
                <div className="p-3 bg-gray-50 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-gray-600">
                        Last occurred:{" "}
                        {new Date(test.lastOccurrence).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <AlertCircle size={14} className="text-gray-500" />
                      <span className="text-gray-600">
                        Pattern: Last {test.pattern.length} runs
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="text-amber-500" />
          Flaky Tests Analysis
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showFailToPass"
              checked={showFailToPass}
              onChange={(e) => setShowFailToPass(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="showFailToPass" className="text-sm">
              Fail → Pass
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPassToFail"
              checked={showPassToFail}
              onChange={(e) => setShowPassToFail(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="showPassToFail" className="text-sm">
              Pass → Fail
            </label>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {showFailToPass &&
          renderFlakyTestList(failToPassTests, "Fail → Pass Flaky Tests")}
        {showPassToFail &&
          renderFlakyTestList(passToFailTests, "Pass → Fail Flaky Tests")}
      </div>
    </div>
  );
}
