import { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

export default function BlogCard({ data }: { data: Blog }) {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden w-[242px] h-[281px] shadow-xl rounded-lg">
        <div className="flex w-full h-[128px] rounded-t-lg">
          <Image
            src={data.image}
            alt="Product Image"
            width={242}
            height={128}
            className="rounded-t-lg"
          />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center">
            <span className="text-primary font-semibold text-[14px] line-clamp-2">
              {data.title}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-[#8291A3] text-[10px] line-clamp-1">
              {data.description}
            </span>
          </div>
          <hr />
          <div className="flex items-center justify-start gap-2">
            <span className="text-[#4F5A6B] text-[10px]">{data.date}</span>
            <span className="text-[#4F5A6B] text-[10px]">{data.author}</span>
          </div>
        </div>
      </div>

      {/* ********************************************************************************************************************** */}

      {/* Desktop View */}
      <div
        className="hidden md:flex flex-col mx-auto lg:mx-0 gap-3 max-w-[345px]"
        dir="rtl"
      >
        <div className="flex items-center justify-center w-full h-[223px] rounded-lg">
          <Link
            href={`/${data.id}`}
            className="group hover:brightness-75 transition-all duration-300 ease-in-out relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <BiLinkExternal
                size={24}
                color="white"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <Image
              src={data.image}
              alt="Blog Image"
              width={345}
              height={223}
              className="rounded-lg"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <span className="text-primary font-semibold text-[18px] line-clamp-1">
            {data.title}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[#8291A3] text-[12px] line-clamp-3">
            {data.description}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[#536683] text-[12px]">
              نوشته شده توسط {data.author}
            </span>
            <span className="text-[#536683] text-[12px]">
              در تاریخ {data.date}
            </span>
          </div>
          <Link
            href={`/${data.id}`}
            className="flex items-center justify-center rounded-lg border hover:bg-[#F0F2F7] transition-colors duration-300 ease-in-out"
          >
            <span className="text-[#1F2329] font-[500] text-[14px] px-5 py-3 truncate">
              خواندن ادامه
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
