import Link from "next/link";
import React from "react";

const machinLinks = [
  { title: "ماشین های تراش سی ان سی", href: "#" },
  { title: "ماشین های فرز سی ان سی", href: "#" },
  { title: "ماشین های بورینگ سی ان سی", href: "#" },
  { title: "ماشین های سنتر سی ان سی", href: "#" },
];

const brandLinks = [
  { title: "انواع دستگاه سی ان سی Daewoo", href: "#" },
  { title: "انواع دستگاه سی ان سی Chiron", href: "#" },
  { title: "انواع دستگاه سی ان سی Makino", href: "#" },
  { title: "انواع دستگاه سی ان سی Okuma", href: "#" },
];

const shortLinks = [
  { title: "درباره ما", href: "#" },
  { title: "تماس با ما", href: "#" },
  { title: "سوالات متداول", href: "#" },
  { title: "آرشیو محصولات", href: "#" },
];

export default function Links() {
  return (
    <div className="flex gap-16 lg:gap-8 xl:gap-16 z-10 md:mx-auto lg:mx-0">
      <div className="flex flex-col pt-1">
        <h2 className="text-white font-bold text-[15px]">
          انواع ماشین های سی ان سی
        </h2>
        <ul className="flex flex-col gap-4 mt-6">
          {machinLinks.map((item, index) => (
            <li
              key={index}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col pt-1">
        <ul className="flex flex-col gap-4 mt-12">
          {machinLinks.map((item, index) => (
            <li
              key={index}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col pt-1">
        <h2 className="text-white font-bold text-[15px]">
          انواع برند دستگاه ها
        </h2>
        <ul className="flex flex-col gap-4 mt-6 ">
          {brandLinks.map((item, index) => (
            <li
              key={index}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col pt-1">
        <h2 className="text-white font-bold text-[15px]">دسترسی سریع</h2>
        <ul className="flex flex-col gap-4 mt-6">
          {shortLinks.map((item, index) => (
            <li
              key={index}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
