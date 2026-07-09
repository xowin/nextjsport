import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? "text-white bg-sky-400/15 shadow-sm border-sky-400/50"
    : "text-blue-200/70 border-transparent hover:text-white hover:border-blue-400/30";

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
        className="h-1 bg-sky-400 mt-2"
      ></motion.div>
    </button>
  );
};

export default TabButton;
