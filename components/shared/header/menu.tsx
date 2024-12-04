"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

const navLinks = [
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
  { title: "سوالات متداول", href: "/frequent-asked-questions" },
  { title: "استعلام قیمت", href: "/inquiry" },
];

export default function Menu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex items-center z-10">
      {/* Mobile Menu */}
      <div className="md:hidden relative">
        {/* Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-center text-white"
        >
          <BiMenu size={24} />
        </button>
        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-1/2 sm:w-2/5 bg-slate-800 z-30 shadow-lg transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="relative h-full">
            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-white/50 absolute left-2 top-4"
            >
              <BiX size={24} />
            </button>
            {/* Nav Links */}
            <ul className="flex flex-col gap-5 px-4 pt-4">
              {/* Logo */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/icons/icon.png"
                  alt="CNC Icon"
                  width={40}
                  height={50}
                />
                <Image
                  src="/icons/logo-blue.png"
                  alt="Logo Icon"
                  width={95}
                  height={27}
                />
                <Image
                  src="/icons/cnc-stock.png"
                  alt="CNC Stock"
                  width={70}
                  height={10}
                />
              </div>
              <hr className="opacity-20" />
              {navLinks.map((item) => (
                <li
                  key={item.href}
                  className="text-white font-bold text-[14px] z-10"
                >
                  <Link href={item.href} onClick={toggleMobileMenu}>
                    {item.title}
                    {item.href === "/inquiry" && (
                      <Image
                        src="/images/Group.png"
                        alt="item badge"
                        width={30}
                        height={30}
                        className="inline-block"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="flex items-center gap-6 z-10">
          {navLinks.map((item) => (
            <li
              key={item.href}
              className="flex items-center text-white hover:text-white/70 font-bold text-[14px]"
            >
              <Link href={item.href}>
                {item.title}
                {item.href === "/inquiry" && (
                  <Image
                    src="/images/Group.png"
                    alt="item badge"
                    width={35}
                    height={35}
                    className="inline-block"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
