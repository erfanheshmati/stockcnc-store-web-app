"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./category-card";
import Link from "next/link";
import { Category } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

export default function Categories() {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isAboveMedium, setIsAboveMedium] = useState(false);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/category`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        if (!data.categories) throw new Error("اطلاعاتی یافت نشد!");
        setCategoriesData(data.categories);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchCategoriesData();
  }, []);

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
      <h3 className="text-secondary text-[12px] md:text-[14px]">
        همه دستگاه های سی ان سی
      </h3>
      {error && <p className="text-red-500 text-center w-full mt-6">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 mt-8">
        {!error &&
          filteredData.map((data, index) => (
            <Link href={`/archiv/${data._id}`} key={data._id}>
              <CategoryCard
                data={data}
                isLast={index === filteredData.length - 1}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
