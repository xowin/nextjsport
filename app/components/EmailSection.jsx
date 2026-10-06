"use client";
import React, { useState } from "react";
import { PROFILE } from "../data";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-blue-300/25 bg-blue-950/40 text-blue-100 transition hover:border-signal hover:text-signal";

const fieldClass =
  "block w-full rounded-xl border border-blue-300/25 bg-ink/60 p-3 text-sm text-white placeholder-blue-300/40 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30";

const EmailSection = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mt-28 mb-24 grid gap-10 md:grid-cols-2">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">Contact</p>
        <h2 className="font-display mt-3 mb-4 text-4xl font-bold text-white">
          Have a ticket for me?
        </h2>
        <p className="mb-6 max-w-md text-blue-100/75">
          I&apos;m looking for IT support, help desk, and desktop support roles. Send a message, or
          email me directly at{" "}
          <a className="text-signal underline-offset-4 hover:underline" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          .
        </p>
        <div className="flex items-center gap-4">
          <a
            href={PROFILE.github}
            aria-label="GitHub profile"
            className={socialClass}
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={PROFILE.linkedin}
            aria-label="LinkedIn profile"
            className={socialClass}
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={PROFILE.resume}
            download="Christian_Rodrigues_Resume.pdf"
            className="text-sm font-semibold text-blue-100 underline-offset-4 hover:text-signal hover:underline"
          >
            Download CV
          </a>
        </div>
      </div>

      <div className="rounded-3xl border border-blue-300/15 bg-blue-950/30 p-6">
        {status === "sent" ? (
          <p role="status" className="text-emerald-300">
            Message sent. I&apos;ll reply to the email you gave.
          </p>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-blue-100">
                Your email
              </label>
              <input name="email" type="email" id="email" required className={fieldClass} placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-blue-100">
                Subject
              </label>
              <input name="subject" type="text" id="subject" required className={fieldClass} placeholder="Help desk opening at…" />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-blue-100">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                className={`${fieldClass} min-h-[140px]`}
                placeholder="What do you need help with?"
              />
            </div>
            {status === "error" ? (
              <p role="alert" className="text-sm text-rose-300">
                The message didn&apos;t send. Try again, or email {PROFILE.email} directly.
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-signal px-5 py-3 font-semibold text-ink transition hover:bg-amber-300 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
