import Link from "next/link";
import { Brand } from "@/lib/types";
import { BiChevronLeft } from "react-icons/bi";

export default function Sitemap({ brand }: { brand: Brand }) {
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
        href={`/brand/${brand?.enTitle}?brand=${brand?._id}`}
        className="hover:opacity-70 transition-all duration-300 ease-in-out"
      >
        {brand?.title}
      </Link>
    </div>
  );
}
