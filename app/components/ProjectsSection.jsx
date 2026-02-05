"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Hand Painting (Computer Vision Canvas)",
    description:
      "Computer-vision canvas that tracks finger input from the camera feed to enable real-time painting interactions.",
    image: "/images/handpaint.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/Hand-Painting",
    stack: ["React", "Canvas", "Computer Vision"],
  },
  {
    id: 2,
    title: "Moonbin Seoul Food",
    description:
      "Restaurant web experience built as a capstone project, showcasing responsive UI and modern Next.js routing.",
    image: "/images/moonbin.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/moonbin-seoul-food",
    stack: ["React", "Next.js"],
  },
  {
    id: 3,
    title: "NestQueue",
    description:
      "Internal IT ticketing platform that streamlines request intake, triage, and resolution workflows.",
    image: "/images/nestq.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/digitalnest-wit/nestqueue",
    stack: ["TypeScript", "MongoDB"],
  },
  {
    id: 4,
    title: "Career Harvest",
    description:
      "Web scraping platform built with Node.js, React, and TypeScript. Contributed backend APIs and data filtering across multiple sources. (Not available for preview)",
    image: "/images/CareerHarvest.png",
    Width: 50,
    Height: 50,
    tag: ["All", "Web"],
    stack: ["Node.js", "TypeScript", "Puppeteer"],
  },
  {
    id: 5,
    title: "Next.Js Portfolio Website, Made in 2024",
    description:
      "Personal portfolio built with Next.js to showcase projects, skills, and professional experience.",
    image: "/images/Nextjs.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/nextjsport",
    stack: ["Next.js", "Tailwind"],
  },
  {
    id: 6,
    title: "Email template with bootstrap",
    description:
      "Responsive email template built with Bootstrap, created for a Bay Valley Tech project.",
    image: "/images/Cmail.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/Bootstrap-Grid-Project",
    stack: ["Bootstrap", "HTML"],
  },
  {
    id: 7,
    title: "Business Communication app",
    description:
      "Team-based business communication platform focused on collaboration, messaging, and workflow coordination.",
    image: "/images/opowl.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/Martyn-Conkling/operating-owls-business-communication-platform",
    stack: ["React", "TypeScript"],
  },
  {
    id: 8,
    title: "Javascript Clock",
    description:
      "Lightweight clock interface built with vanilla JavaScript and clean, minimal styling.",
    image: "/images/clock.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/Javascript-clock",
    stack: ["JavaScript"],
  },
  {
    id: 9,
    title: "UI Login",
    description:
      "Polished login interface crafted with semantic HTML and modern CSS styling.",
    image: "/images/Ui.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/UI-Login.git",
    stack: ["HTML", "CSS"],
  },
  {
    id: 10,
    title: "Gym Website",
    description:
      "Marketing website built in WordPress for a Bay Valley Tech project, emphasizing layout and content structure.",
    image: "/images/bvl.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "https://bayvalleylifts.wordpress.com/",
    stack: ["WordPress"],
  },
  {
    id: 11,
    title: "NTG Esports Team (fake)",
    description:
      "Esports team concept site built with Wix for a Bay Valley Tech project.",
    image: "/images/NTG.png",
    tag: ["All","Web", "Mobile"],
    gitUrl: "https://christianrodrigues76.wixsite.com/my-site",
    stack: ["Wix"],
  },
  {
    id: 12,
    title: "Small Project with Digitalnest",
    description:
      "Introductory collaboration project completed with Digitalnest in 2024.",
    image: "/images/html.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/bizznest-dev/collaboration-repository-c",
    stack: ["HTML", "CSS"],
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Selected Work</p>
        <h2 className="font-display text-4xl font-bold text-slate-900 mt-3 mb-4">
          Projects & Experiments
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          A mix of client work, personal explorations, and collaboration projects.
        </p>
      </div>
      <div className="text-slate-700 flex flex-row justify-center items-center gap-3 py-6 flex-wrap">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              stack={project.stack}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
