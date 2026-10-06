"use client";
import React, { useState } from "react";
import GithubIcon from "../../public/github-icon.svg";
import LinkedinIcon from "../../public/linkedin-icon.svg";
import Image from "next/image";
import { PROFILE } from "../data";

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
            className="rounded-full border border-blue-300/25 bg-blue-950/40 p-2 transition hover:border-signal"
          >
            <Image src={GithubIcon} alt="" />
          </a>
          <a
            href={PROFILE.linkedin}
            aria-label="LinkedIn profile"
            className="rounded-full border border-blue-300/25 bg-blue-950/40 p-2 transition hover:border-signal"
          >
            <Image src={LinkedinIcon} alt="" />
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
