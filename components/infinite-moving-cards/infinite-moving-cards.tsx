/* eslint-disable no-use-before-define */

"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative">
      <InfiniteMovingCards
        items={testimonials}
        pauseOnHover={false}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Qwizelt has completely transformed the way we create and take quizzes! It’s intuitive, fast, and incredibly user-friendly. A game-changer for educators and learners alike.",
    name: "Sarah Lee",
    title: "Teacher, High School Educator",
  },
  {
    quote:
      "I love how quickly I can create personalized quizzes for my students. Qwizelt makes quiz creation and grading so much easier. It’s perfect for any teacher or trainer!",
    name: "Mark Thompson",
    title: "Corporate Trainer, Leadership Development",
  },
  {
    quote:
      "Qwizelt makes it so easy to craft engaging and challenging quizzes. It’s a great tool for both teachers and learners who want to improve their skills!",
    name: "Emily Zhang",
    title: "University Student, Computer Science",
  },
  {
    quote:
      "As a content creator, I’ve used many quiz platforms, but none compare to Qwizelt. It’s fast, sleek, and offers features I didn’t even know I needed!",
    name: "Jake Walker",
    title: "Freelance Content Creator",
  },
  {
    quote:
      "Qwizelt is the perfect platform for anyone looking to create quick and engaging quizzes without the hassle. Highly recommend it for schools and organizations!",
    name: "Rachel Green",
    title: "Educational Consultant",
  },
];
