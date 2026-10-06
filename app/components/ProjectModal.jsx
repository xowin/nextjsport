"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const ProjectModal = ({ project, onClose }) => {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  const { details } = project;
  const gallery = details.gallery;
  const shot = gallery[index];

  const go = (step) => setIndex((i) => (i + step + gallery.length) % gallery.length);

  useEffect(() => {
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <dialog
      ref={dialog}
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current.close();
      }}
      className="m-auto w-[min(1100px,94vw)] max-h-[92vh] overflow-y-auto rounded-3xl border border-blue-300/20 bg-ink p-0 text-blue-50 shadow-2xl shadow-black/60 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-5 sm:p-8">
        <button
          type="button"
          onClick={() => dialog.current.close()}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 rounded-full border border-blue-300/25 bg-ink/80 p-2 text-blue-100 transition hover:border-signal hover:text-signal"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <p className="pr-12 font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Project · {details.period}
        </p>
        <h3 id="project-modal-title" className="font-display mt-2 pr-12 text-3xl font-bold text-white sm:text-4xl">
          {project.title}
        </h3>

        <figure className="mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-blue-300/15 bg-black/30">
            <img
              src={shot.src}
              alt={shot.alt}
              className="aspect-video max-h-[50vh] w-full object-contain"
            />
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-blue-300/25 bg-ink/80 p-2 text-white transition hover:border-signal hover:text-signal"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-blue-300/25 bg-ink/80 p-2 text-white transition hover:border-signal hover:text-signal"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-blue-200/70">
            <span>{shot.caption}</span>
            <span className="shrink-0 font-mono text-xs">
              {index + 1} / {gallery.length}
            </span>
          </figcaption>
        </figure>

        <div className="mt-3 grid grid-cols-4 gap-3" role="group" aria-label="Screenshots">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1}: ${g.caption}`}
              aria-current={i === index}
              className={`overflow-hidden rounded-lg border transition ${
                i === index ? "border-signal" : "border-blue-300/15 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={g.src} alt="" className="aspect-video w-full object-cover object-top" loading="lazy" />
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-blue-300/60">Overview</h4>
            <p className="mt-2 text-blue-100/85">{details.summary}</p>
            <h4 className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-blue-300/60">My role</h4>
            <p className="mt-2 text-blue-100/85">{details.role}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-blue-300/60">What it does</h4>
            <ul className="mt-2 space-y-2 text-sm text-blue-100/85">
              {details.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-blue-300/10 pt-5">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-md bg-blue-900/40 px-2 py-0.5 font-mono text-xs text-blue-200/80">
                {item}
              </span>
            ))}
          </div>
          {project.gitUrl ? (
            <a
              href={project.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-signal hover:underline"
            >
              View on GitHub <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </dialog>
  );
};

export default ProjectModal;
