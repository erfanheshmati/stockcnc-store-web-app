import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

export default function Sitemap() {
  return (
    <div className="flex items-center gap-2 text-secondary font-medium text-[13px] z-10">
      <Link href="/">صفحه اصلی</Link>
      <BiChevronLeft size={16} />
      <Link href="/">دستگاه تراش</Link>
      <BiChevronLeft size={16} />
      <Link href="/">دستگاه تراش سی ان سی مدل ...</Link>
    </div>
  );
}
