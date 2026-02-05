import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-slate-900 border-emerald-500 bg-emerald-50"
    : "text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900 bg-white/70";
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
