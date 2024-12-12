"use client";

import { useDialog } from "@/contexts/dialog-context";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardList({ data }: { data: Product }) {
  const { openDialog } = useDialog();

  return (
    <div className="flex p-5 gap-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-center w-1/3 h-[200px] rounded-xl bg-[#EFF1F6]">
        <Image
          src={data.image}
          alt={data.title}
          width={180}
          height={120}
          className="h-[120px] object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-between px-2 w-2/3">
        <h3 className="text-primary font-semibold text-[18px] line-clamp-1">
          {data.title}
        </h3>
        <h4 className="text-secondary/70 font-medium text-[12px]">
          {data.description}
        </h4>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="text-secondary font-semibold text-[13px]"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <Image src={data.icon} alt={data.country} width={22} height={22} />
            <span className="text-secondary font-semibold text-[13px]">
              ساخت کشور {data.country}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="hidden lg:flex text-secondary/60 font-bold text-[14px] pt-1">
            {data.brand}
          </span>
          <div className="flex items-center gap-4">
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
      </div>
    </div>
  );
}
