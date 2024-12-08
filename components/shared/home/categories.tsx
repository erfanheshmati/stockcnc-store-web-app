"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./category-card";
import Link from "next/link";
import { categoriesData } from "@/lib/data";

export default function Categories() {
  const [isAboveMedium, setIsAboveMedium] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAboveMedium(window.innerWidth >= 768); // 768px is the `md` breakpoint in Tailwind CSS
    };

    // Initial check and event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Conditionally slice data based on viewport size
  const filteredData = isAboveMedium
    ? categoriesData.slice(0, -1)
    : categoriesData;

  return (
    <div className="flex flex-col items-center mt-52 md:mt-60 lg:mt-48">
      <h2 className="text-primary font-bold text-[22px] md:text-[29px]">
        دسته بندی محصولات
      </h2>
      <span className="text-secondary text-[12px] md:text-[14px]">
        همه دستگاه های سی ان سی
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 mt-8">
        {filteredData.map((data) => (
          <Link href={`/${data.id}`} key={data.id}>
            <CategoryCard data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
}
