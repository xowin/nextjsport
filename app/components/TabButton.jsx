import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? "text-slate-900 bg-white shadow-sm border-slate-200"
    : "text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-200";

  return (
    <button
      onClick={selectTab}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${buttonClasses}`}
    >
      <p className="font-semibold">
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-emerald-500 mt-2"
      ></motion.div>
    </button>
  );
};

export default TabButton;
