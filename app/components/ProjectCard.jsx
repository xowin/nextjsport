import React from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({ imgUrl, title, description, gitUrl, stack = [] }) => {
  const hasImage = Boolean(imgUrl);
  return (
    <div className="group rounded-2xl border border-white/70 bg-white/80 shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`h-52 md:h-64 relative ${
          hasImage ? "" : "bg-gradient-to-br from-emerald-100 via-orange-100 to-white"
        }`}
        style={hasImage ? { background: `url(${imgUrl})`, backgroundSize: "cover" } : undefined}
      >
        {!hasImage && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-display text-lg">
            {title}
          </div>
        )}
        {gitUrl ? (
          <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex">
            <a
              href={gitUrl}
              className="h-12 w-12 border border-white/70 relative rounded-full hover:border-white"
              aria-label={`View ${title} code`}
            >
              <CodeBracketIcon className="h-6 w-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </a>
          </div>
        ) : null}
      </div>
      <div className="px-5 py-5">
        <h5 className="font-display text-xl font-semibold text-slate-900 mb-2">{title}</h5>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        {stack.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
