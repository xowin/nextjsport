"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "../data";

const useCountUp = (target, start) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    const duration = 1200;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return value;
};

const Stat = ({ stat, inView }) => {
  const v = useCountUp(stat.value, inView);
  return (
    <div className="px-6 py-6">
      <p className="font-mono text-4xl font-semibold text-white">
        {v}
        <span className="text-signal">{stat.suffix}</span>
      </p>
      <p className="mt-1 font-semibold text-blue-50">{stat.label}</p>
      <p className="mt-1 text-sm text-blue-200/60">{stat.note}</p>
    </div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} aria-label="By the numbers" className="mt-20">
      <div className="grid grid-cols-1 divide-y divide-blue-300/15 rounded-2xl border border-blue-300/15 bg-blue-950/30 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {STATS.map((s) => (
          <Stat key={s.label} stat={s} inView={inView} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
