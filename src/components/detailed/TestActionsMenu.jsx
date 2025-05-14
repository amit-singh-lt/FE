import { Download, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function TestActionsMenu({ artefacts = {} }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const artefactList = [
    {
      key: "screenshots",
      label: "Screenshots",
      icon: <Download size={16} />,
    },
    { key: "video", label: "Video", icon: <Download size={16} /> },
    { key: "logs", label: "Logs", icon: <Download size={16} /> },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="p-1 rounded hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Test actions"
        type="button"
      >
        <MoreVertical size={18} />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg py-1">
          {artefactList.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${
                artefacts[key]
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              disabled={!artefacts[key]}
              onClick={() => {
                if (artefacts[key]) window.open(artefacts[key], "_blank");
              }}
              type="button"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
