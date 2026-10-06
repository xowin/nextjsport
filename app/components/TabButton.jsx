import React from "react";

const TabButton = ({ active, selectTab, children }) => {
  const classes = active
    ? "border-signal bg-signal/10 text-signal"
    : "border-blue-300/20 text-blue-200/70 hover:border-blue-300/50 hover:text-white";

  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={selectTab}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </button>
  );
};

export default TabButton;
