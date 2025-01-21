"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./category-card";
import Link from "next/link";
import { Category } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

export default function Categories() {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col items-center mt-52 md:mt-60 lg:mt-48">
      <h2 className="text-primary font-bold text-[22px] md:text-[29px]">
        دسته بندی محصولات
      </h2>
      <h3 className="text-secondary text-[12px] md:text-[14px]">
        همه دستگاه های سی ان سی
      </h3>
      {error && <p className="text-red-500 text-center w-full mt-6">{error}</p>}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-10 md:gap-5 mt-8 ${
          categoriesData.length < 5 && "xl:!grid-cols-4 xl:gap-16"
        }
      ${
        categoriesData.length < 4 &&
        "lg:!grid-cols-3 xl:!grid-cols-3 lg:gap-10 xl:gap-40"
      }
      `}
      >
        {!error &&
          categoriesData.map((data) => (
            <Link href={`/archiv?category=${data._id}`} key={data._id}>
              <CategoryCard data={data} />
            </Link>
          ))}
      </div>
    </div>
  );
}
