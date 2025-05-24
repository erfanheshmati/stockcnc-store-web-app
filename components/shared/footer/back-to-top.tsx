"use client";

import { BiChevronUp } from "react-icons/bi";

export default function BackToTop() {
  // Smooth scroll to the top (works in all browsers)
  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 500;
    const startTime = performance.now();

    const animateScroll = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <button
      onClick={scrollToTop}
      className="absolute right-0 bg-slate-500 rounded-sm hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <BiChevronUp size={24} color="white" />
    </button>
  );
}
