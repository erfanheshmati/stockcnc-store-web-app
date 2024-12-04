import React from "react";
import CategoryCard from "./category-card";
import Link from "next/link";
import { categoriesData } from "@/lib/data";

export default function Categories() {
  return (
    <div className="flex flex-col items-center mt-52 md:mt-60 lg:mt-48">
      <h2 className="text-primary font-bold text-[22px] md:text-[29px]">
        دسته بندی محصولات
      </h2>
      <span className="text-secondary text-[12px] md:text-[14px]">
        همه دستگاه های سی ان سی
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 gap-x-5 sm:gap-x-10 md:gap-x-10 lg:gap-x-5 mt-8">
        {categoriesData.map((data) => (
          <Link href={`/${data.id}`} key={data.id}>
            <CategoryCard data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
}
