"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { EXPERIENCE } from "../data";

const ExperienceSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="mt-28">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">Experience</p>
      <h2 className="font-display mt-3 mb-3 text-4xl font-bold text-white">The queue so far</h2>
      <p className="mb-8 max-w-2xl text-blue-100/70">
        Four roles in under three years, all at multi-site nonprofit and small tech teams. Open a
        ticket to see what I did.
      </p>

      <ul className="space-y-3">
        {EXPERIENCE.map((job, i) => {
          const isOpen = open === i;
          const panelId = `exp-panel-${i}`;
          return (
            <li
              key={`${job.role}-${job.dates}`}
              className={`rounded-2xl border bg-blue-950/30 transition ${
                isOpen ? "border-signal/40" : "border-blue-300/15 hover:border-blue-300/35"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left"
              >
                <span
                  className={`hidden shrink-0 rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wider sm:inline-block ${
                    job.current
                      ? "bg-signal/15 text-signal"
                      : "bg-emerald-400/10 text-emerald-300"
                  }`}
                >
                  {job.current ? "In progress" : "Closed"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display block text-lg font-semibold text-white sm:text-xl">
                    {job.role}
                  </span>
                  <span className="block text-sm text-blue-200/70">
                    {job.org} · {job.place}
                  </span>
                </span>
                <span className="hidden font-mono text-xs text-blue-200/60 md:block">{job.dates}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-blue-200/70 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5">
                    <p className="mb-3 font-mono text-xs text-blue-200/60 md:hidden">{job.dates}</p>
                    <ul className="space-y-3 border-t border-blue-300/10 pt-4 text-blue-100/85">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ExperienceSection;
