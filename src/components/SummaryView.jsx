import React from "react";

import { useTestAnalysis } from "../hooks/useTestAnalysis";
import { TrendChart } from "./TrendChart";
import { CriticalMetrics } from "./summary/CriticalMetrics";
import { MetricsGrid } from "./summary/MetricsGrid";
import { ModuleHealth } from "./summary/ModuleHealth";

export function SummaryView({ summary, tests }) {
  // Use the latest build for main metrics
  const latestBuild = summary && summary.length > 0 ? summary[0] : null;

  const analysis = useTestAnalysis(tests || []);

  // Prepare build trends for the TrendChart component
  const buildTrends = summary?.map((build) => ({
    build_id: build.build_id,
    build_name: build.build_name,
    timestamp: build.start_time,
    total_tests: build.total_tests,
    passed: build.passed_tests,
    failed: build.failed_tests,
    skipped: build.skipped_tests,
    duration: build.duration,
    pass_rate: parseFloat(build.passed_tests_percentage),
  }));

  return (
    <div className="px-6 space-y-8">
      <MetricsGrid
        totalTests={latestBuild?.total_tests || 0}
        passed={latestBuild?.passed_tests || 0}
        failed={latestBuild?.failed_tests || 0}
        duration={latestBuild?.duration || "-"}
      />

      <div className="bg-white rounded-lg shadow p-6">
        <TrendChart buildTrends={buildTrends || []} />
      </div>

      <CriticalMetrics
        passRate={parseFloat(latestBuild?.passed_tests_percentage) || 0}
        criticalFailures={analysis.criticalFailures?.length || 0}
        skipped={latestBuild?.skipped_tests || 0}
      />

      <ModuleHealth moduleStats={analysis.moduleHealth || []} />
    </div>
  );
}
