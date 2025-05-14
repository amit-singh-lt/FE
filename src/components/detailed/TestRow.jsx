import { ChevronDown, ChevronUp, Brain } from "lucide-react";
import React from "react";
import { PriorityBadge } from "../common/PriorityBadge";
import { StatusIcon } from "../common/StatusIcon";
import { TestHistory } from "../common/TestHistory";
import { TestLinks } from "../common/TestLinks";
import { CoverageBadge } from "../detailed/CoverageBadge";
import { StageRow } from "./StageRow";
import { TestDetails } from "./TestDetails";
import { TestActionsMenu } from "./TestActionsMenu";

export function TestRow({ test, isExpanded, onToggle }) {
  // Helper function to get failed step with stage info
  const getFailedStep = (test) => {
    if (!test.failed_step) return null;
    return test.failed_step;
  };

  // Helper function to group steps by stage
  const getStageGroups = (test) => {
    if (!test.stages) return [];

    return test.stages.map((stage) => ({
      stageName: stage.stage_name,
      stageDescription: stage.stage_description,
      stageStatus: stage.status,
      stageError: stage.error_message,
      duration: stage.duration,
      steps: stage.steps || [],
    }));
  };

  const stageGroups = getStageGroups(test);

  return (
    <React.Fragment>
      <tr className="hover:bg-gray-50">
        <td className="px-2 py-2">
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <StatusIcon status={test.status} />
        </td>
        <td className="px-3 py-2 whitespace-nowrap font-mono text-xs text-gray-700">
          {test.test_id}
        </td>
        <td className="px-3 py-2">
          <div className="text-sm text-gray-900">{test.test_name}</div>
          {test.error_message && test.status === "failed" && (
            <div className="text-xs text-red-500 mt-0.5">
              {test.error_message}
            </div>
          )}
        </td>
        <td className="px-3 py-2">
          <CoverageBadge coverage={test.module || test.coverage} />
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <PriorityBadge priority={test.priority} />
        </td>
        <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
          {test.duration}
        </td>
        <td className="px-3 py-2 text-xs text-red-500">
          {getFailedStep(test)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          <TestHistory history={test.status_history} />
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          <TestLinks links={test.links} />
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <TestActionsMenu artefacts={test.artefacts || {}} />
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={11}>
            <div className="bg-gray-50 px-6 py-4">
              {/* Show TestDetails only if there are no stages */}
              {stageGroups.length === 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Test Details
                  </h4>
                  <TestDetails test={test} />
                </div>
              )}

              {/* Show stages table only if there are stages */}
              {stageGroups.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Test Stages
                  </h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">
                          Stage
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">
                          Description
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">
                          Error
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">
                          Duration
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">
                          <div className="flex items-center gap-1">
                            <Brain size={14} className="text-blue-600" />
                            AI Analysis
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stageGroups.map((stage, idx) => (
                        <StageRow key={idx} stage={stage} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
