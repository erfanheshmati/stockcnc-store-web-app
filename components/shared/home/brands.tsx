"use client";

import BrandCard from "./brand-card";
import { useEffect, useState } from "react";
import { Brand } from "@/lib/types";
import { BASE_URL, IMAGE_URL } from "@/lib/constants";

export default function Brands({
  setSelectedBrand,
}: {
  setSelectedBrand: (brandId: string) => void;
}) {
  const [brandsData, setBrandsData] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/brand`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setBrandsData(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchBrandsData();
  }, []);

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
          {error && <p className="text-red-500 text-center w-full">{error}</p>}

          {!error &&
            brandsData.map((data) => (
              <li
                key={data._id}
                onClick={() => handleBrandClick(data._id)}
                className="flex items-center justify-center min-w-fit h-14 p-4 bg-[#F1F3F8] rounded-md mt-4"
              >
                <img
                  src={`${IMAGE_URL}/${data.logo}`}
                  alt={data.title}
                  className="w-16"
                />
              </li>
            ))}
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
          {error && <p className="text-red-500 text-center w-full">{error}</p>}

          {!error &&
            brandsData.map((data) => (
              <div key={data._id} onClick={() => handleBrandClick(data._id)}>
                <BrandCard data={data} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
