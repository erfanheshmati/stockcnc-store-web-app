import Link from "next/link";
import { Category, Root } from "@/lib/types";
import { BiChevronLeft } from "react-icons/bi";

export default function Sitemap({
  category,
  info,
}: {
  category: Category;
  info: Root;
}) {
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
        href={`${category ? `/archiv?category=${category._id}` : "/archiv"}`}
        className="hover:opacity-70 transition-all duration-300 ease-in-out"
      >
        {category ? category.title : info.archiveProductTitle}
      </Link>
    </div>
  );
}
