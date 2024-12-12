"use client";

import { useDialog } from "@/contexts/dialog-context";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardGrid({ data }: { data: Product }) {
  const { openDialog } = useDialog();

  return (
    <div className="flex flex-col gap-4 py-4 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between px-6">
        <span className="relative group cursor-pointer">
          <Image src={data.icon} alt="Product Icon" width={22} height={22} />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-max px-2 py-1 text-white bg-[#7888A0] text-[12px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ساخت کشور {data.country}
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-1 border-l-8 border-r-8 border-t-8 border-t-[#7888A0] border-l-transparent border-r-transparent"></div>
          </div>
        </span>
        <span className="text-secondary/40 font-semibold text-[14px]">
          {data.brand}
        </span>
      </div>
      <div className="flex items-center justify-center w-full h-[216px] bg-gradient-to-l from-[#e3e8ef] to-[#f3f7ff]">
        <Image src={data.image} alt="Product Image" width={207} height={139} />
      </div>
      <div className="flex items-center px-6">
        <span className="text-primary font-semibold text-[17px] line-clamp-2">
          {data.title}
        </span>
      </div>
      <div className="flex items-center justify-between px-6 py-2">
        {data.tags.map((tag, index) => (
          <span
            key={index}
            className="text-secondary font-semibold text-[13px]"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between px-6 py-2">
        <Link
          href={`/product/${data.slug}`}
          className="flex items-center justify-center w-[90px] h-[45px] 2xl:w-[110px] xl:h-[55px] rounded-lg text-black hover:text-white border hover:border-none hover:bg-primary transition-colors duration-300 ease-in-out"
        >
          <span className="font-[500] text-[14px]">جزییات</span>
        </Link>
        <button
          onClick={openDialog}
          className="flex items-center justify-center w-[130px] h-[45px] 2xl:w-[140px] xl:h-[55px] rounded-lg text-black hover:text-white border hover:border-none hover:bg-[#00D45A] transition-colors duration-300 ease-in-out"
        >
          <span className="font-[500] text-[14px]">استعلام قیمت</span>
        </button>
      </div>
    </div>
  );
}
