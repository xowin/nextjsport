"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Next.Js Portfolio Website, Made in 2024",
    description: "This is the portfolio website you are currently viewing",
    image: "/images/Nextjs.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/nextjsport",
    previewUrl: "https://nextjsport.vercel.app/"
  },
  {
    id: 2,
    title: "Email template with bootstrap",
    description: "This was a small project I made for BVT, Made in 2023",
    image: "/images/Cmail.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/Bootstrap-Grid-Project",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Business Communication app",
    description: "This is a group project im currently working on with my team from BVT, Made in 2024-present.",
    image: "/images/opowl.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/Martyn-Conkling/operating-owls-business-communication-platform",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Javascript Clock",
    description: "A simple clock made with vanilla javascript Made in 2023",
    image: "/images/clock.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/Javascript-clock",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "UI Login",
    description: "A simple login page made with HTML and CSS, Made in 2023",
    image: "/images/Ui.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/xowin/UI-Login.git",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Gym Website",
    description: "A simple website project made with Wordpress for BVT, Made in 2023",
    image: "/images/bvl.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://bayvalleylifts.wordpress.com/",
  },
  {
    id: 7,
    title: "NTG Esports Team (fake)",
    description: "A project made with wix as a BVT project, Made in 2023",
    image: "/images/NTG.png",
    tag: ["All","Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://christianrodrigues76.wixsite.com/my-site",
  },
  {
    id: 8,
    title: "Small Project with Digitalnest",
    description: "First small project with Digitalnest, Made in 2024",
    image: "/images/html.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/bizznest-dev/collaboration-repository-c",
    previewUrl: "/",
  }
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
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
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
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
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
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;