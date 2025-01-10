"use client";

import React from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import HeroHighlightDemo from "../hero-highlight-heading/hero-highlight-heading";
import { AuroraBackground } from "../ui/aurora-background";
import { FlipWords } from "../ui/flip-words";

const words = ["Insightful", "Clever", "Smart", "Wise", "Intelligent"];

export default function AuroraBackgroundInitialPage() {
  const router = useRouter();

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Introducing <HeroHighlightDemo />
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Build Your
          <FlipWords words={words} />
          Quizzes in Seconds
        </div>
        <button
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-16 py-2"
          onClick={() => router.push("/auth/signup")}
        >
          Sign Up Now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
