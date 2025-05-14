import { CheckCircle, PauseCircle, XCircle } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

const STATUS_CONFIG = {
  passed: {
    icon: CheckCircle,
    iconColor: "text-green-500",
    hoverBg: "hover:bg-green-100",
  },
  failed: {
    icon: XCircle,
    iconColor: "text-red-500",
    hoverBg: "hover:bg-red-100",
  },
  skipped: {
    icon: PauseCircle,
    iconColor: "text-yellow-500",
    hoverBg: "hover:bg-yellow-100",
  },
};

export function TestHistory({ history }) {
  // Get team, env, and suite from URL parameters
  const { team = "kaneai", env = "stage", suite = "default" } = useParams();

  if (!history || history.length === 0) {
    return <span className="text-xs text-gray-400">-</span>;
  }

  // Sort by build number descending (newest first) and take max 10
  const sortedHistory = [...history]
    .sort((a, b) => b.build - a.build)
    .slice(0, 10);

  // Split into two rows (5 each)
  const topRow = sortedHistory.slice(0, 5);
  const bottomRow = sortedHistory.slice(5, 10);

  const BuildIcon = ({ item }) => {
    const url = `/${team}/${env}/${suite}/${item.build}/detailed`;
    const config = STATUS_CONFIG[item.status] || STATUS_CONFIG.failed;
    const Icon = config.icon;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-block p-1 rounded-md ${config.hoverBg}
          transition-colors duration-150
        `}
        title={`Build ${item.build} - ${item.status}`}
      >
        <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
      </a>
    );
  };

  return (
    <div className="space-y-1">
      {/* Top row */}
      <div className="flex gap-1">
        {topRow.map((item, index) => (
          <BuildIcon key={`top-${item.build}-${index}`} item={item} />
        ))}
      </div>

      {/* Bottom row */}
      {bottomRow.length > 0 && (
        <div className="flex gap-1">
          {bottomRow.map((item, index) => (
            <BuildIcon key={`bottom-${item.build}-${index}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
