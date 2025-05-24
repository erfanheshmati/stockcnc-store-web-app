import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

export default function Sitemap() {
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
        href="/brands"
        className="hover:opacity-70 transition-all duration-300 ease-in-out"
      >
        برندها
      </Link>
    </div>
  );
}
