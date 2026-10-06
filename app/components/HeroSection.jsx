"use client";
import React from "react";
import { motion } from "framer-motion";
import Terminal from "./Terminal";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import { PROFILE } from "../data";

const HeroSection = () => {
  return (
    <section className="grid gap-12 lg:grid-cols-12 lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-7"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-4 py-1 font-mono text-xs uppercase tracking-[0.18em] text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            Open to opportunities · {PROFILE.location}
          </span>
          <SpotifyNowPlaying />
        </div>
        <h1 className="font-display mt-5 text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
          I fix the problem,
          <br />
          <span className="text-signal">then teach the fix.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-blue-100/80 sm:text-lg">
          I&apos;m Christian Rodrigues, an IT Support Specialist at Digital NEST. I handle Tier I
          support for 80+ users on Windows and macOS, on site in Stockton and Modesto and remotely
          for Gilroy, Salinas, and Watsonville, and I build the ticketing tools too.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-signal px-7 py-3 font-semibold text-ink transition hover:bg-amber-300"
          >
            Hire me
          </a>
          <a
            href={PROFILE.resume}
            download="Christian_Rodrigues_Resume.pdf"
            className="inline-flex items-center justify-center rounded-full border border-blue-300/30 px-7 py-3 font-semibold text-white transition hover:border-signal hover:text-signal"
          >
            Download CV
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="lg:col-span-5"
      >
        <Terminal />
        <p className="mt-3 text-center font-mono text-xs text-blue-200/50">
          Try it: type a command, press ↑ for history, Tab to complete.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
