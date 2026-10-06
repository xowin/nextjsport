"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "../data";

const FILTERS = ["All", "IT", "Web"];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const [selected, setSelected] = useState(null);
  const shown = PROJECTS.filter((p) => tag === "All" || p.tags.includes(tag));

  return (
    <section id="projects" className="mt-28">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">Projects</p>
      <h2 className="font-display mt-3 mb-3 text-4xl font-bold text-white">Deployed and shipped</h2>
      <p className="max-w-2xl text-blue-100/70">
        Network rollouts and troubleshooting on the IT side, and the software I&apos;ve built on the
        web side. Filter by what you care about.
      </p>

      <div className="flex flex-wrap gap-3 py-6" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <ProjectTag key={f} name={f} onClick={setTag} isSelected={tag === f} />
        ))}
      </div>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className={p.featured && tag !== "Web" ? "md:col-span-2 lg:col-span-3" : ""}
            >
              <ProjectCard
                title={p.title}
                description={p.description}
                imgUrl={p.image}
                Icon={p.Icon}
                gitUrl={p.gitUrl}
                stack={p.stack}
                featured={p.featured}
                onOpen={p.details ? () => setSelected(p) : undefined}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
};

export default ProjectsSection;
