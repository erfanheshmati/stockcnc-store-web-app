"use client";

import { useDialog } from "@/contexts/dialog-context";
import { IMAGE_URL } from "@/lib/constants";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductCardGrid({ data }: { data: Product }) {
  const { openDialog } = useDialog();

  return (
    <div className="flex flex-col justify-between gap-2 py-4 rounded-2xl shadow-lg lg:h-[540px]">
      <div
        className={`flex items-center justify-between px-5 ${
          !data.available ? "opacity-70" : ""
        }`}
      >
        <span className="relative group cursor-pointer py-2">
          <img
            src={`${IMAGE_URL}/${data?.country?.logo}`}
            alt={data?.country?.title}
            width={22}
            height={22}
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-max px-2 py-1 text-white bg-[#7888A0] text-[12px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ساخت کشور {data?.country?.title}
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-1 border-l-8 border-r-8 border-t-8 border-t-[#7888A0] border-l-transparent border-r-transparent"></div>
          </div>
        </span>
        <img
          src={`${IMAGE_URL}/${data?.brand?.logo}`}
          alt={data?.brand?.enTitle}
          className="max-w-16 max-h-8"
        />
      </div>
      <div
        className={`flex items-center justify-center w-full h-auto bg-gradient-to-l from-[#e3e8ef] to-[#f3f7ff] ${
          !data.available ? "opacity-70" : ""
        }`}
      >
        <Link href={`/product/${data._id}`}>
          <img
            src={`${IMAGE_URL}/360${data.primaryImage}`}
            alt={data.title}
            width={207}
            height={139}
            className={`w-full h-auto ${
              !data.available ? "filter grayscale" : ""
            }`}
          />
        </Link>
      </div>
      <div
        className={`flex items-center px-6 pt-2 lg:pt-0 ${
          !data.available ? "opacity-70" : ""
        }`}
      >
        <h3 className="text-primary font-sans font-bold text-[16px] line-clamp-1">
          <Link href={`/product/${data._id}`}>{data.enTitle}</Link>
        </h3>
      </div>
      <div
        className={`flex items-center justify-between px-6 py-2 ${
          !data.available ? "opacity-70" : ""
        }`}
      >
        <span className="text-secondary font-semibold text-[13px]">
          {data.category.title}
        </span>
        <span className="text-secondary font-semibold text-[13px]">
          سال ساخت {data.yearOfManufacture}
        </span>
        <span className="text-secondary font-semibold text-[13px]">
          {data.attributes
            .filter((attr) => attr?.attribute?.title === "کنترل")
            .map((attr, index) => (
              <span key={index}>{attr?.value}</span>
            ))}
        </span>
      </div>
      <div className="flex items-center justify-between px-6 py-2">
        <Link
          href={`/product/${data._id}`}
          className="flex items-center justify-center w-[90px] h-[45px] 2xl:w-[110px] xl:h-[55px] rounded-lg text-black hover:text-white border hover:border-none hover:bg-primary transition-colors duration-300 ease-in-out"
        >
          <span className="font-[500] text-[14px]">جزییات</span>
        </Link>

        {!data.available && (
          <span className="flex items-center justify-center w-[130px] h-[45px] 2xl:w-[140px] xl:h-[55px] text-red-500 font-semibold text-[15px]">
            ناموجود
          </span>
        )}

        {data.available && (
          <button
            onClick={() => openDialog(data._id)}
            className="flex items-center justify-center w-[130px] h-[45px] 2xl:w-[140px] xl:h-[55px] rounded-lg text-black hover:text-white border hover:border-none hover:bg-accent transition-colors duration-300 ease-in-out"
          >
            <span className="font-[500] text-[14px]">استعلام قیمت</span>
          </button>
        )}
      </div>
    </div>
  );
}
