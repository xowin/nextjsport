"use client";
import React, { useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { SKILLS, EDUCATION } from "../data";

const TABS = [
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education & certs" },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");

  return (
    <section className="mt-28" id="about">
      <div className="grid items-start gap-12 md:grid-cols-2 xl:gap-20">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">About</p>
          <h2 className="font-display mt-3 mb-6 text-4xl font-bold text-white">
            The person who answers when something breaks
          </h2>
          <p className="text-base text-blue-100/80 lg:text-lg">
            I&apos;m an IT Support Specialist at Digital NEST, a multi-site nonprofit technology
            organization in the San Joaquin Valley. I started as a web developer intern in December
            2023, taught software development to members aged 14–24, and now run Tier I support
            for 80+ users on Windows and macOS, on site in Stockton and Modesto and remotely for Gilroy,
            Salinas, and Watsonville.
          </p>
          <p className="mt-4 text-base text-blue-100/80 lg:text-lg">
            I&apos;m known for walking non-technical people through a problem without making them
            feel behind. Afterward I write the guide, so the next person doesn&apos;t need to ask.
            That habit cut repeat requests by 45%.
          </p>
          <p className="mt-4 text-base text-blue-100/80 lg:text-lg">
            Outside work, I&apos;m a PC gamer. That means Rocket League, where I score the
            occasional goal and the occasional own goal, and Overwatch, where it&apos;s never my
            fault we lost. I&apos;m also an AMC A-Lister, so I&apos;ve already seen the movie
            you&apos;re about to recommend, and I hit the gym between showings so the popcorn
            doesn&apos;t win. The soundtrack for all of it is further down.
          </p>
        </div>

        <div>
          <Image
            src="/images/Hero_IMG.png"
            width={380}
            height={380}
            className="mb-6 rounded-2xl border border-blue-300/20 shadow-xl shadow-black/30"
            alt="Christian Rodrigues portrait"
          />
          <div className="flex flex-wrap gap-3" role="tablist" aria-label="Skills and education">
            {TABS.map((t) => (
              <TabButton key={t.id} selectTab={() => setTab(t.id)} active={tab === t.id}>
                {t.label}
              </TabButton>
            ))}
          </div>
          <div
            role="tabpanel"
            className="mt-4 rounded-2xl border border-blue-300/15 bg-blue-950/30 p-6"
          >
            {tab === "skills" ? (
              <dl className="space-y-5">
                {SKILLS.map((g) => (
                  <div key={g.label}>
                    <dt className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-blue-300/60">
                      {g.label}
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-blue-300/15 bg-blue-900/30 px-2.5 py-1 text-sm text-blue-50 transition hover:border-signal/60 hover:text-signal"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <ul className="space-y-4">
                {EDUCATION.map((e) => (
                  <li key={e.title} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{e.title}</p>
                      <p className="text-sm text-blue-200/70">{e.where}</p>
                    </div>
                    <p className="shrink-0 font-mono text-xs text-blue-200/60">{e.when}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
