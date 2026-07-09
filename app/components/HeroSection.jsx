'use client';
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 place-self-center text-center sm:text-left justify-self-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            Open to opportunities
          </span>
          <h1 className="font-display text-white mb-4 mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              Hello I&apos;m <br></br>
            </span>
            <TypeAnimation
              sequence={[
                'Christian Rodrigues',
                1000,
                'a Web Developer',
                1000,
                'a Frontend Developer',
                1000,
                'an IT Specialist',
                1000,
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h1>
          <p className="text-blue-200/80 text-base sm:text-lg mb-6 lg:text-xl">
            Building clean, modern interfaces with a focus on usability and craft.
          </p>
          <div>
            <div>
              <a
                href="/#contact"
                className="px-6 inline-flex items-center justify-center py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-semibold shadow-lg shadow-sky-500/30 transition"
              >
                Hire Me
              </a>
              <a
                href="/Files/ChristianRodriguesResume2526.pdf"
                className="px-1 inline-block py-1 w-full sm:w-fit rounded-full border border-blue-400/40 text-white mt-3 hover:border-sky-400 transition"
              >
                <span className="block bg-blue-950/60 rounded-full px-5 py-2 font-semibold">
                  Download CV
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
