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
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            Open to opportunities
          </span>
          <h1 className="font-display text-slate-900 mb-4 mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-orange-500">
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
                'IT Support',
                1000,
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mb-6 lg:text-xl">
            Building clean, modern interfaces with a focus on usability and craft.
          </p>
          <div>
            <div>
              <a
                href="/#contact"
                className="px-6 inline-flex items-center justify-center py-3 w-full sm:w-fit rounded-full mr-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/20 transition"
              >
                Hire Me
              </a>
              <a
                href="/Files/ChristianRodriguesResume2526.pdf"
                className="px-1 inline-block py-1 w-full sm:w-fit rounded-full border border-slate-300 text-slate-900 mt-3 hover:border-slate-500 transition"
              >
                <span className="block bg-white rounded-full px-5 py-2 font-semibold">
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
