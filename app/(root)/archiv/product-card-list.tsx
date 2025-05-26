"use client";

import { useDialog } from "@/contexts/dialog-context";
import { IMAGE_URL } from "@/lib/constants";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductCardList({ data }: { data: Product }) {
  const { openDialog } = useDialog();

  return (
    <div className="flex p-5 gap-6 rounded-xl shadow-lg">
      <div
        className={`flex items-center justify-center w-1/3 h-auto rounded-xl bg-[#EFF1F6] ${
          !data.available ? "opacity-70" : ""
        }`}
      >
        <Link href={`/product/${data._id}`} target="_blank">
          <img
            src={`${IMAGE_URL}/360${data.primaryImage}`}
            alt={data.title}
            width={180}
            height={120}
            className={`w-full h-auto rounded-xl ${
              !data.available ? "filter grayscale" : ""
            }`}
          />
        </Link>
      </div>
      <div className="flex flex-col items-start justify-between px-2 w-2/3">
        <h3
          className={`text-primary font-sans font-bold text-[18px] line-clamp-1 pt-2 ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <Link href={`/product/${data._id}`} target="_blank">
            {data.enTitle}
          </Link>
        </h3>
        <h3
          className={`text-secondary/70 font-medium text-[14px] ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          {data.title}
        </h3>
        <div
          className={`flex items-center justify-between w-full ${
            !data.available ? "opacity-70" : ""
          }`}
        >
          <div className="flex items-center gap-8">
            <span className="text-secondary font-semibold text-[12px]">
              {data.category.title}
            </span>
            <span className="text-secondary font-semibold text-[12px]">
              سال ساخت {data.yearOfManufacture}
            </span>
            <span className="text-secondary font-semibold text-[12px]">
              {data.attributes
                .filter((attr) => attr?.attribute?.title === "کنترل")
                .map((attr, index) => (
                  <span key={index}>{attr?.value}</span>
                ))}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <img
              src={`${IMAGE_URL}/${data?.country?.logo}`}
              alt={data?.country?.title}
              width={22}
              height={22}
            />
            <span className="text-secondary font-semibold text-[12px] pt-0.5">
              ساخت کشور {data?.country?.title}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div
            className={`hidden lg:block ${!data.available ? "opacity-70" : ""}`}
          >
            <Link
              href={`/brand/${data?.brand?.enTitle}?brand=${data?.brand?._id}`}
            >
              <img
                src={`${IMAGE_URL}/${data?.brand?.logo}`}
                alt={data?.brand?.enTitle}
                className="w-20"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
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
      </div>
    </div>
  );
}
