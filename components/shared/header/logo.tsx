"use client";

import { useEffect, useState } from "react";
import Logo2 from "../logo-2";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(pathname === "/");

  useEffect(() => {
    // If the user is on the homepage, always show the logo
    if (pathname === "/") {
      setIsVisible(true);
      return;
    }

    // Set initial visibility based on scroll position
    setIsVisible(window.scrollY > 90);

    const handleScroll = () => {
      setIsVisible(window.scrollY > 90);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

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
