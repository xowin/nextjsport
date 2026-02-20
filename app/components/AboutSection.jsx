"use client";
import React, { useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-4 text-slate-700">
        <li>Node.js</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>Python</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>C++</li>
        <li>Saas</li>
        <li>SQL</li>
        <li>Git</li>

      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-4 text-slate-700">
        <li>Modesto Junior College</li>
        <li>Bay Valley Tech Code Academy</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-4 text-slate-700">
        <li>Intro to HTML</li>
        <li>Intro to CSS</li>
        <li>Basic Content Managing System</li>
        <li>Intro to JavaScript</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");

  const handleTabChange = (id) => {
    setTab(id);
  };

  return (
    <section className="text-slate-900" id="about">
      <div className="md:grid md:grid-cols-2 gap-10 items-start py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="text-left">
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-slate-600">
            My name is Christian Rodrigues, and I have been working as a Fullstack Developer
            since 2022. With a robust foundation in HTML, CSS, JavaScript, and React, I am
            dedicated to innovating and excelling in the tech industry. Continuous learning
            is a core aspect of my approach, as I actively seek opportunities to expand my
            knowledge and skills.
          </p>
          <p className="text-base lg:text-lg text-slate-600 mt-4">
            Information Systems professional with experience teaching and supporting
            JavaScript, Python, and other programming languages while contributing to IT
            operations and systems support. Skilled in documenting technical workflows,
            troubleshooting issues, and improving reliability through preventative
            maintenance and process optimization. Passionate about strengthening network,
            systems, and operational capabilities while continuing to grow as a software
            and IT professional.
          </p>
          <p className="text-base lg:text-lg text-slate-600 mt-4">
            Beyond my professional endeavors, I engage in various hobbies such as gaming,
            watching anime, fitness, and a deep appreciation for music. These interests
            contribute to a well-rounded perspective and a drive for excellence in both
            personal and professional pursuits.
          </p>
        </div>
        <div className="md:mt-0">
          <div className="mb-5">
            <Image
              src="/images/Hero_IMG.png"
              width={380}
              height={380}
              className="rounded-2xl border border-white/80 shadow-lg"
              alt="Christian Rodrigues portrait"
            />
          </div>
          <div className="flex flex-row justify-start gap-4 flex-wrap">
            <TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"}>
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("education")} active={tab === "education"}>
              {" "}
              Education{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("certifications")} active={tab === "certifications"}>
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-4 rounded-2xl border border-white/70 bg-white/70 p-6 shadow-sm">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
