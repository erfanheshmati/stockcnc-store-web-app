"use client";

import { useDialog } from "@/contexts/dialog-context";
import { IMAGE_URL } from "@/lib/constants";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductCard({ data }: { data: Product }) {
  const { openDialog } = useDialog();

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col justify-between gap-2 w-[221px] px-4 py-2 mx-auto shadow-xl rounded-xl">
        <div
          className={`flex items-center justify-between ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <span className="relative group cursor-pointer">
            <img
              src={`${IMAGE_URL}/${data?.country?.logo}`}
              alt={data?.country?.title}
              className="w-[18px] h-[18px]"
            />
          </span>
          <Link
            href={`/brand/${data?.brand?.enTitle}?brand=${data?.brand?._id}`}
          >
            <img
              src={`${IMAGE_URL}/${data.brand.logo}`}
              alt={data.brand.enTitle}
              className="w-16"
            />
          </Link>
        </div>
        <div
          className={`flex items-center justify-center w-full h-auto rounded-xl bg-gradient-to-l from-[#e3e8ef] to-[#f3f7ff] ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <Link
            href={`/product/${data._id}`}
            target="_blank"
            className="w-full"
          >
            <img
              src={`${IMAGE_URL}/360${data.primaryImage}`}
              alt={data.title}
              className={`w-full h-auto rounded-xl ${
                !data.available ? "filter grayscale" : ""
              }`}
            />
          </Link>
        </div>
        <div
          className={`flex items-center ${!data.available ? "opacity-70" : ""}`}
        >
          <h3 className="text-primary font-sans font-bold text-[13px] line-clamp-2">
            <Link href={`/product/${data._id}`} target="_blank">
              {data.enTitle}
            </Link>
          </h3>
        </div>
        <hr className={`${!data.available ? "opacity-70" : ""}`} />
        <div
          className={`flex items-center ${!data.available ? "opacity-70" : ""}`}
        >
          <h3 className="text-secondary/80 text-[11px]">{data.title}</h3>
        </div>
        <div
          className={`flex items-center justify-between py-2 ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <span className="text-black text-[11px]">{data.category.title}</span>
          <span className="text-black text-[11px]">
            سال ساخت {data.yearOfManufacture}
          </span>
          <span className="text-black text-[11px]">
            {data.attributes
              .filter((attr) => attr?.attribute?.title === "کنترل")
              .map((attr, index) => (
                <span key={index}>{attr?.value}</span>
              ))}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          {!data.available && (
            <span className="flex items-center justify-center w-[84px] h-[39px] text-red-500 text-[12px]">
              ناموجود
            </span>
          )}

          {data.available && (
            <button
              onClick={() => openDialog(data._id)}
              className="flex items-center justify-center rounded-md border text-secondary w-[84px] h-[39px]"
            >
              <span className="font-[500] text-[11px]">استعلام قیمت</span>
            </button>
          )}
          <Link
            href={`/product/${data._id}`}
            target="_blank"
            className="flex items-center justify-center rounded-md border text-secondary w-[84px] h-[39px]"
          >
            <span className="font-[500] text-[11px]">جزییات</span>
          </Link>
        </div>
      </div>

      {/* *************************************************************************************************************** */}

      {/* Desktop View */}
      <div
        className="hidden md:flex flex-col justify-between py-4 rounded-2xl shadow-lg max-w-[323px] h-[520px]"
        dir="rtl"
      >
        <div
          className={`flex items-center justify-between px-5 ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <span className="relative group cursor-pointer py-5">
            <img
              src={`${IMAGE_URL}/${data?.country?.logo}`}
              alt={data?.country?.title}
              className="w-[22px] h-[22px]"
            />
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-max px-2 py-1 text-white bg-[#7888A0] text-[12px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ساخت {data?.country?.title}
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-1 border-l-8 border-r-8 border-t-8 border-t-[#7888A0] border-l-transparent border-r-transparent"></div>
            </div>
          </span>
          <Link
            href={`/brand/${data?.brand?.enTitle}?brand=${data?.brand?._id}`}
          >
            <img
              src={`${IMAGE_URL}/${data?.brand?.logo}`}
              alt={data.brand.enTitle}
              className="w-20"
            />
          </Link>
        </div>
        <div
          className={`flex items-center justify-center w-full h-auto bg-gradient-to-l from-[#e3e8ef] to-[#f3f7ff] ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <Link
            href={`/product/${data._id}`}
            target="_blank"
            className="w-full"
          >
            <img
              src={`${IMAGE_URL}/360${data.primaryImage}`}
              alt={data.title}
              className={`w-full h-auto ${
                !data.available ? "filter grayscale" : ""
              }`}
            />
          </Link>
        </div>
        <div
          className={`flex items-center px-6 ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <h3 className="text-primary font-sans font-bold text-[16px] line-clamp-2">
            <Link href={`/product/${data._id}`} target="_blank">
              {data.enTitle}
            </Link>
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
            target="_blank"
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
    </>
  );
}
