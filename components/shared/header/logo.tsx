"use client";

import { useEffect, useState } from "react";
import Logo2 from "../logo-2";
import Logo1 from "../logo-1";
import Link from "next/link";

export default function Logo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isVisible ? "block md:hidden lg:block" : "md:hidden"
      } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2]`}
    >
      <Link href="/">
        <img
          src="/icons/stock-cnc-mobile.png"
          alt="Logo"
          className="hidden md:block w-[130px]"
        />
      </Link>
      <Logo2 className="block md:hidden" />
    </div>
  );
}
