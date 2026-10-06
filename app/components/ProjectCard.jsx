import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const Cover = ({ onOpen, title, children, ...rest }) =>
  onOpen ? (
    <button type="button" onClick={onOpen} aria-label={`View details for ${title}`} {...rest}>
      {children}
    </button>
  ) : (
    <div {...rest}>{children}</div>
  );

const ProjectCard = ({ imgUrl, Icon, title, description, gitUrl, stack = [], featured, onOpen }) => {
  return (
    <div
      className={`group flex h-full overflow-hidden rounded-2xl border border-blue-300/15 bg-blue-950/30 transition hover:-translate-y-1 hover:border-signal/40 ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <Cover onOpen={onOpen} title={title}
        className={`relative shrink-0 ${featured ? "h-52 md:h-auto md:w-2/5" : "h-48"} ${
          imgUrl ? "" : "flex items-center justify-center bg-gradient-to-br from-blue-900 to-ink"
        }`}
        style={
          imgUrl
            ? { backgroundImage: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      >
        {!imgUrl && Icon ? <Icon className="h-16 w-16 text-signal/80" aria-hidden="true" /> : null}
      </Cover>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-blue-100/75">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-md bg-blue-900/40 px-2 py-0.5 font-mono text-xs text-blue-200/80"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm">
          {onOpen ? (
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1 rounded-full bg-signal px-4 py-1.5 font-semibold text-ink transition hover:bg-amber-300"
            >
              View details
            </button>
          ) : null}
          {gitUrl ? (
            <a
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-signal hover:underline"
            >
              View on GitHub <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-blue-300/50">No public link</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
