import React from "react";

export function PriorityBadge({ priority }) {
  const priorityLower = priority.toLowerCase();

  return (
    <span
      className={`px-1.5 py-0.5 inline-flex text-xs leading-4 font-medium rounded-full ${
        priorityLower === "p0"
          ? "bg-red-100 text-red-800"
          : priorityLower === "p1"
          ? "bg-orange-100 text-orange-800"
          : priorityLower === "p2"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {priority}
    </span>
  );
}
