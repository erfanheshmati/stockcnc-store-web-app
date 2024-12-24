"use client";

import { BiChevronUp } from "react-icons/bi";

export default function BackToTop() {
  // Smooth scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
