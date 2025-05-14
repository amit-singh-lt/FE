import { Brain } from "lucide-react";
import React from "react";

import { StatusIcon } from "../common/StatusIcon";

export function TestStepsTable({ test }) {
  // Transform the stages data into the expected format
  const allSteps = [];

  if (test.stages) {
    test.stages.forEach((stage, stageIndex) => {
      if (stage.steps) {
        stage.steps.forEach((step, stepIndex) => {
          allSteps.push({
            type: stage.stage_name || `Stage ${stageIndex + 1}`,
            name: step.step_name,
            functionName: step.step_description || step.uses?.function,
            result: {
              duration: step.duration || "-",
              status: step.status,
              message: step.error_message || step.result?.message || "-",
              aiAnalysis: step.aiAnalysis || "-", // Add if available in your data
            },
            index: stepIndex + 1,
            stageName: stage.stage_name,
            stageDescription: stage.stage_description,
          });
        });
      }
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-20 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="w-32 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Stage/Step Type
            </th>
            <th className="w-1/5 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Action Name
            </th>
            <th className="w-1/6 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-mono">
              Function Name
            </th>
            <th className="w-24 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Duration
            </th>
            <th className="w-1/5 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Error Message
            </th>
            <th className="w-1/4 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              <div className="flex items-center gap-1">
                <Brain size={14} className="text-blue-600" />
                AI Analysis
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allSteps.map((step, index) => (
            <tr
              key={index}
              className={
                step.result.status === "failed"
                  ? "bg-red-50"
                  : step.result.status === "skipped"
                  ? "bg-gray-50"
                  : "bg-white"
              }
            >
              <td className="px-3 py-2">
                <StatusIcon status={step.result.status} />
              </td>
              <td className="px-3 py-2 text-sm text-gray-900">
                {step.stageName || step.type}
              </td>
              <td className="px-3 py-2 text-sm text-gray-900">{step.name}</td>
              <td className="px-3 py-2 text-sm font-mono text-gray-600">
                {step.functionName || "-"}
              </td>
              <td className="px-3 py-2 text-sm text-gray-600">
                {step.result.duration}
              </td>

              <td className="px-3 py-2 text-sm text-gray-900">
                {step.result.message}
              </td>
              <td className="px-3 py-2 text-sm text-blue-600">
                {step.result.status === "failed" ? step.result.aiAnalysis : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
