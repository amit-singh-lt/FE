import React from "react";

import { TestStepsTable } from "./TestStepsTable";

export function TestDetails({ test }) {
  return (
    <div className="p-6 bg-gray-50">
      <TestStepsTable test={test} />
    </div>
  );
}
