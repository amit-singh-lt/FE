import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { StatusIcon } from "../common/StatusIcon";

export function StageRow({ stage }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-2 py-2">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-gray-500 hover:text-gray-700"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
        <td className="px-3 py-2">
          <StatusIcon status={stage.stageStatus} />
        </td>
        <td className="px-3 py-2 text-[13px] capitalize">{stage.stageName}</td>
        <td className="px-3 py-2 text-xs text-gray-500">
          {stage.stageDescription}
        </td>
        <td
          className="px-3 py-2 text-xs text-red-500 max-w-xs truncate md:break-all"
          title={stage.stageError || "-"}
        >
          {stage.stageError
            ? stage.stageError.length > 80
              ? stage.stageError.slice(0, 80) + "..."
              : stage.stageError
            : "-"}
        </td>
        <td className="px-3 py-2 text-xs text-gray-500">
          {stage.duration || "-"}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} className="bg-gray-50 px-6 py-4">
            <table className="min-w-full w-full divide-y divide-gray-100">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Step
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Duration
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Error
                  </th>
                </tr>
              </thead>
              <tbody>
                {stage.steps.map((step, i) => (
                  <tr
                    key={i}
                    className={step.status === "failed" ? "bg-red-50" : ""}
                  >
                    <td className="px-4 py-2">
                      <StatusIcon status={step.status} />
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-900">
                      {step.step_name}

                      {step.step_description && (
                        <div className="text-xs text-gray-500 font-mono">
                          {step.step_description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-500">
                      {step.duration || "-"}
                    </td>
                    <td className="px-4 py-2 text-xs text-red-500">
                      {step.error_message || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}
