import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ data }: { data: Product }) {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2 w-[221px] h-[322px] px-4 py-2 mx-auto shadow-xl rounded-xl">
        <div className="flex items-center justify-end gap-1">
          <span className="text-secondary/70 text-[12px]">{data.brand}</span>
          <span className="relative group cursor-pointer">
            <Image src={data.icon} alt="Country Icon" width={18} height={18} />
          </span>
        </div>
        <div className="flex items-center justify-center w-full h-[104px] rounded-xl bg-gradient-to-l from-[#e3e8ef] to-[#f3f7ff]">
          <Image src={data.image} alt="Product Image" width={127} height={68} />
        </div>
        <div className="flex items-center">
          <span className="text-primary font-semibold text-[13px] line-clamp-2">
            {data.title}
          </span>
        </div>
        <hr />
        <div className="flex items-center justify-end">
          <span className="text-secondary/80 text-[10px]">
            {data.description}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          {data.tags.map((tag, index) => (
            <span key={index} className="text-black text-[11px]">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between py-2">
          <Link
            href="#"
            className="flex items-center justify-center rounded-md border text-secondary w-[84px] h-[39px]"
          >
            <span className="font-[500] text-[11px]">استعلام قیمت</span>
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center rounded-md border text-secondary w-[84px] h-[39px]"
          >
            <span className="font-[500] text-[11px]">جزییات</span>
          </Link>
        </div>
      </div>

      {/* Desktop View */}
      <div
        className="hidden md:flex flex-col gap-4 py-4 rounded-2xl shadow-lg"
        dir="rtl"
      >
        <div className="flex items-center justify-between px-6">
          <span className="relative group cursor-pointer">
            <Image src={data.icon} alt="Country Icon" width={22} height={22} />
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-max px-4 py-2 text-white bg-[#7888A0] text-[13px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ساخت کشور {data.country}
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-1 border-l-8 border-r-8 border-t-8 border-t-[#7888A0] border-l-transparent border-r-transparent"></div>
            </div>
          </span>
          <span className="text-[#A9B7CB] text-[14px]">{data.brand}</span>
        </div>
        <div className="flex items-center justify-center w-full h-[216px] bg-gradient-to-l from-[#e3e8ef] to-[#f3f7ff]">
          <Image
            src={data.image}
            alt="Product Image"
            width={207}
            height={139}
          />
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
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between px-6 py-2">
          <Link
            href="#"
            className="flex items-center justify-center w-[90px] h-[45px] xl:w-[110px] xl:h-[55px] rounded-lg text-black hover:text-white border hover:border-none hover:bg-primary transition-colors duration-300 ease-in-out"
          >
            <span className="font-[500] text-[14px]">جزییات</span>
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center w-[130px] h-[45px] xl:w-[143px] xl:h-[55px] rounded-lg text-black hover:text-white border hover:border-none hover:bg-primary transition-colors duration-300 ease-in-out"
          >
            <span className="font-[500] text-[14px]">استعلام قیمت</span>
          </Link>
        </div>
      </div>
    </>
  );
}
