export function TestRerun({ onClick, disabled }) {
  return (
    <button
      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
        ${
          disabled
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-green-600"
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      Rerun Failed Tests
    </button>
  );
}
