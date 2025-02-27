import { Product } from "@/lib/types";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

export default function Sitemap({ data }: { data: Product }) {
  return (
    <div className="flex items-center gap-2 text-secondary font-medium text-[13px] z-10">
      <Link
        href="/"
        className="hover:opacity-70 transition-all duration-300 ease-in-out"
      >
        صفحه اصلی
      </Link>
      <BiChevronLeft size={16} />
      <Link
        href={`/archiv?category=${data.category._id}`}
        className="hover:opacity-70 transition-all duration-300 ease-in-out"
      >
        {data.category.title}
      </Link>
      <BiChevronLeft size={16} />
      <Link
        href={`/product/${data._id}`}
        className="hover:opacity-70 transition-all duration-300 ease-in-out pt-0.5"
      >
        {data.title}
      </Link>
    </div>
  );
}
