import { ExternalLink } from "lucide-react";
import React from "react";

export function TestLinks({ links }) {
  if (!links || typeof links !== "object") return null;

  // Map new API contract links object to an array for rendering
  const linkArray = [
    links.kane_overwatch_url
      ? {
          url: links.kane_overwatch_url,
          description: "KANE",
        }
      : null,
    links.hyperexecute_url
      ? {
          url: links.hyperexecute_url,
          description: "HE",
        }
      : null,
    links.magicleap_url
      ? {
          url: links.magicleap_url,
          description: "ML",
        }
      : null,
  ].filter(Boolean);

  if (linkArray.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {linkArray.map((link, index) => (
        <React.Fragment key={index}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center text-xs font-medium"
          >
            {link.description}
            <ExternalLink size={12} className="ml-0.5" />
          </a>
          {index < linkArray.length - 1 && (
            <span className="text-gray-400">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
