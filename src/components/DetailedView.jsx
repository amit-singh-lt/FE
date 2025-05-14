import React, { useState } from "react";

import { useTestAnalysis } from "../hooks/useTestAnalysis";
import { useTestFilters } from "../hooks/useTestFilters";
import { TestFilters } from "./detailed/TestFilters";
import { TestTable } from "./detailed/TestTable";

function mapNewTestToOld(test) {
  // Flatten the stages and steps into a single array
  const allStageSteps = (test.stages || []).flatMap((stage) =>
    (stage.steps || []).map((step) => ({
      ...step,
      stage_name: stage.stage_name,
      stage_status: stage.status,
      stage_error_message: stage.error_message,
      stage_description: stage.stage_description,
    }))
  );

  return {
    name: test.test_name,
    description: test.description,
    test_id: test.test_id,
    priority: test.priority,
    duration: test.duration,
    start_time: test.start_time,
    end_time: test.end_time,
    build_id: test.build_id,
    env: test.env,
    links: [
      {
        kane: {
          auteur_test_id:
            test.links?.kane_overwatch_url
              ?.split("auteurTestCaseId=")[1]
              ?.split("&")[0] || "",
          domain: test.links?.kane_overwatch_url || "",
          description: "KANE",
        },
      },
      {
        hyper_execute: {
          url: test.links?.hyperexecute_url || "",
          description: "HE",
        },
      },
      {
        automation: {
          url: test.links?.magicleap_url || "",
          description: "ML",
        },
      },
    ],
    module: test.coverage ? test.coverage : [],
    result: {
      status: test.status,
      message: test.error_message,
    },
    status_history: test.status_history,
    failed_step: test.failed_step,
    flaky: test.flaky,
    steps: allStageSteps,
  };
}

export function DetailedView({ tests }) {
  const { filters, setFilter, filteredTests } = useTestFilters(tests);
  const analysis = useTestAnalysis(tests);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const mappedTests = tests.map(mapNewTestToOld);

  const onToggleRow = (testId) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(testId)) {
        newSet.delete(testId);
      } else {
        newSet.add(testId);
      }
      return newSet;
    });
  };

  return (
    <div className="px-4 space-y-6">
      <TestFilters
        filter={filters.status}
        searchQuery={filters.search}
        moduleFilter={filters.module}
        priorityFilter={filters.priority}
        onFilterChange={(value) => setFilter("status", value)}
        onSearchChange={(value) => setFilter("search", value)}
        onModuleChange={(value) => setFilter("module", value)}
        onPriorityChange={(value) => setFilter("priority", value)}
        tests={mappedTests}
      />

      <TestTable
        tests={filteredTests}
        expandedRows={expandedRows}
        onToggleRow={onToggleRow}
      />
    </div>
  );
}
