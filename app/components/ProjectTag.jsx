import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const styles = isSelected
    ? "border-signal bg-signal/10 text-signal"
    : "border-blue-300/20 text-blue-200/70 hover:border-blue-300/50 hover:text-white";
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={`${styles} cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
