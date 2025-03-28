'use client';
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
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
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Welcome to my portfolio!
          </p>
          <div>
            <div>
              <a
                href="/#contact"
                className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 to-secondary-500 hover:bg-cyan-500 text-white"
              >
                Hire Me
              </a>
              <a
                href="/Files/ChrisRodriguesResume.pdf"
                className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 hover:bg-slate-800 text-white mt-3"
              >
                <span className="block bg-[#373737] hover:bg-slate-800 rounded-full px-5 py-2">
                  Download CV
                </span>
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[320px] lg:h-[320px] relative">
            <Image
              src="/images/heroimage.png"
              alt="hero-image"
              className="rounded-full absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={275}
              height={275}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;