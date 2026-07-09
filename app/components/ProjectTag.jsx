import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-sky-300 border-sky-400 bg-sky-400/15 shadow-lg shadow-sky-500/10"
    : "text-blue-200/70 border-blue-400/20 hover:border-sky-400/50 hover:text-white bg-blue-950/40";
  return (
    <button
      className={`${buttonStyles} rounded-full border px-5 py-2 text-sm font-semibold cursor-pointer transition`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
