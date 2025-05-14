import React from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export function StatusIcon({ status, size = 16 }) {
  switch (status) {
    case "passed":
      return <CheckCircle2 className="text-green-500" size={size} />;
    case "failed":
      return <XCircle className="text-red-500" size={size} />;
    case "skipped":
      return <Clock className="text-yellow-500" size={size} />;
  }
}
