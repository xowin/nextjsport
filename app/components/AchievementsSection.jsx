"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const years = new Date().getFullYear() - 2022;

const achievementsList = [
  {
    metric: "Projects",
    value: "12",
    postfix: "+",
  },
  {
    metric: "Awards",
    value: "4",
  },
  {
    metric: "years of experience",
    value: years 
  }
];

const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="rounded-2xl border border-blue-400/20 bg-blue-950/40 backdrop-blur py-8 px-8 flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-blue-950/40">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="font-display text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  configs={(_, index) => {
                    return {
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    };
                  }}
                />
                {achievement.postfix}
              </h2>
              <p className="text-blue-200/70 text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
