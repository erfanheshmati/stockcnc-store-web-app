"use client";

import BrandCard from "./brand-card";
import { Brand } from "@/lib/types";
import { IMAGE_URL } from "@/lib/constants";
import Link from "next/link";

export default function Brands({
  brands,
  setSelectedBrand,
}: {
  brands: Brand[];
  setSelectedBrand: (brandId: string) => void;
}) {
  const handleBrandClick = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center w-full">
        <div className="flex items-center justify-start gap-1">
          <h2 className="text-primary font-bold text-[22px]">برند های موجود</h2>
        </div>
        <ul
          className="flex items-center gap-4 min-h-[50px] w-full px-4 overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {brands.length === 0 ? (
            <p className="text-red-500 text-center w-full">برندی وجود ندارد</p>
          ) : (
            brands.map((data) => (
              <li
                key={data._id}
                onClick={() => handleBrandClick(data._id)}
                className="flex items-center justify-center min-w-fit h-14 p-4 bg-[#F1F3F8] rounded-md mt-4 cursor-pointer"
              >
                <img
                  src={`${IMAGE_URL}/${data.logo}`}
                  alt={data.title}
                  className="w-16"
                />
              </li>
            ))
          )}
        </ul>
      </div>

      {/* ******************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col min-w-[41%] lg:min-w-[33%] xl:min-w-[24%]">
        <div className="flex items-center justify-start gap-1">
          <h2 className="text-primary font-bold text-[24px]">برند های موجود</h2>
        </div>
        <hr className="mt-6 ml-8" />
        <div className="flex flex-col gap-8 pt-10 pb-2 h-[570px] overflow-auto custom-scroll px-1 pl-6">
          {brands.length === 0 ? (
            <p className="text-red-500 text-center w-full">برندی وجود ندارد</p>
          ) : (
            brands.slice(0, 4).map((data) => (
              <div
                key={data._id}
                onClick={() => handleBrandClick(data._id)}
                className="cursor-pointer"
              >
                <BrandCard data={data} />
              </div>
            ))
          )}

          {/* Link to brands page */}
          <Link
            href="/brands"
            className="flex items-center justify-center w-[287px] min-h-[97px] rounded-2xl shadow border border-gray-200/70 hover:bg-gradient-to-tl from-[#f2f3f5] via-[#fff] to-[#fff] font-semibold"
          >
            مشاهده همه برندها
          </Link>
        </div>
      </div>
    </>
  );
}
