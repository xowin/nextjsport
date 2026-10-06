"use client";
import React, { useEffect, useRef, useState } from "react";
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS } from "../data";

const CHIPS = ["help", "whoami", "skills", "experience", "projects", "contact", "resume"];

const WHOAMI = [
  `${PROFILE.name} – ${PROFILE.title}`,
  `${PROFILE.org} · on site in Stockton and Modesto, remote for Gilroy, Salinas and Watsonville`,
  "Tier I support for 80+ users on Windows and macOS.",
];

const INTRO = [{ id: 0, kind: "out", text: 'Type "help" to see all commands.' }];

const COMMANDS = {
  help: () => [
    "whoami       who I am",
    "skills       tools and platforms I work with",
    "experience   where I've worked",
    "projects     things I've built or deployed",
    "contact      how to reach me",
    "resume       open my resume (PDF)",
    "status       am I available?",
    "clear        clear the screen",
  ],
  whoami: () => WHOAMI,
  skills: () => SKILLS.map((g) => `${g.label}: ${g.items.join(", ")}`),
  experience: () => EXPERIENCE.map((e) => `${e.dates.padEnd(20)} ${e.role}, ${e.org}`),
  projects: () => PROJECTS.map((p) => `• ${p.title}`),
  contact: () => [`email     ${PROFILE.email}`, `github    ${PROFILE.github}`, `linkedin  ${PROFILE.linkedin}`],
  status: () => ["Open to opportunities. IT support, help desk, desktop support."],
};

const NAMES = [...Object.keys(COMMANDS), "resume", "clear", "sudo hire-me"];

const Terminal = () => {
  const nextId = useRef(INTRO.length);
  const [lines, setLines] = useState(INTRO);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const scroller = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (items) => {
    setLines((prev) => [...prev, ...items.map((it) => ({ id: nextId.current++, ...it }))]);
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setCursor(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const echo = { kind: "cmd", text: cmd };

    if (cmd === "resume") {
      push([echo, { kind: "out", text: "Opening resume.pdf in a new tab…" }]);
      window.open(PROFILE.resume, "_blank", "noopener");
      return;
    }
    if (cmd === "sudo hire-me" || cmd === "hire" || cmd === "hire-me") {
      push([echo, { kind: "ok", text: "Permission granted. Taking you to the contact form…" }]);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const handler = COMMANDS[cmd];
    if (handler) {
      push([echo, ...handler().map((text) => ({ kind: "out", text }))]);
    } else {
      push([echo, { kind: "err", text: `command not found: ${cmd}. Type "help" for the list.` }]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      const match = NAMES.find((n) => value && n.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const tone = {
    cmd: "text-signal",
    strong: "text-white font-semibold",
    out: "text-blue-100/85",
    ok: "text-emerald-300",
    err: "text-rose-300",
  };

  return (
    <div className="rounded-2xl border border-blue-300/20 bg-[#070d1f]/90 shadow-2xl shadow-black/40 overflow-hidden font-mono">
      <div className="flex items-center justify-between gap-3 border-b border-blue-300/15 px-4 py-2.5 text-xs text-blue-200/60">
        <span>christian@help-desk ~</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          online
        </span>
      </div>

      <div
        ref={scroller}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        onClick={() => input.current?.focus({ preventScroll: true })}
        className="h-64 sm:h-72 overflow-y-auto px-4 py-3 text-[13px] leading-relaxed"
      >
        {lines.map((l) => (
          <div key={l.id} className={`line-in whitespace-pre-wrap break-words ${tone[l.kind]}`}>
            {l.kind === "cmd" ? <span aria-hidden="true">$ </span> : null}
            {l.text}
          </div>
        ))}
        {!lines.length ? <div className="text-blue-200/40">Cleared. Type "help" for commands.</div> : null}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-blue-300/15 px-4 py-2.5">
        <label htmlFor="terminal-input" className="text-signal" aria-label="Command">
          $
        </label>
        <input
          ref={input}
          id="terminal-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type a command"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-base sm:text-[13px] text-white placeholder-blue-300/30 outline-none"
        />
      </form>

      <div className="flex flex-wrap gap-2 border-t border-blue-300/10 px-4 py-3">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="rounded-md border border-blue-300/20 px-2.5 py-1 text-xs text-blue-100/80 transition hover:border-signal/60 hover:text-signal"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
