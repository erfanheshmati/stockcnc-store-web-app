import { IMAGE_URL } from "@/lib/constants";
import { Blog } from "@/lib/types";
import Link from "next/link";

export default function HelpCard({ data }: { data: Blog }) {
  return (
    <>
      {/* Mobile View */}
      <Link
        className="md:hidden flex items-center gap-4 my-2"
        href={`/blog/${data._id}`}
      >
        <img
          src={`${IMAGE_URL}/${data.image}`}
          alt={data.title}
          className="w-[75px] h-[65px] rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-primary font-semibold text-[13px] line-clamp-1">
            {data.title}
          </h3>
          <div className="text-[#A1AEBB] text-[10px] line-clamp-1 leading-4">
            {data.summary}
          </div>
        </div>
      </Link>

      {/* ************************************************************************************************************ */}

      {/* Desktop View */}
      <Link
        href={`/blog/${data._id}`}
        className="hidden md:flex items-center gap-4 hover:opacity-80 transition-all duration-300 ease-in-out"
      >
        <img
          src={`${IMAGE_URL}/${data.image}`}
          alt={data.title}
          className="min-w-[70px] max-w-[70px] h-[60px] rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-primary font-bold text-[14px] line-clamp-1">
            {data.title}
          </h3>
          <div className="text-[#A1AEBB] text-[10px] line-clamp-1 leading-4">
            {data.summary}
          </div>
        </div>
      </Link>
    </>
  );
}
