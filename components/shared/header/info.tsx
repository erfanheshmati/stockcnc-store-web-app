import Link from "next/link";
import { BiSupport } from "react-icons/bi";

export default function Info() {
  return (
    <>
      {/* Mobile Info */}
      <div className="md:hidden flex text-white z-10">
        <Link href="/inquiry">
          <BiSupport size={24} />
        </Link>
      </div>

      {/* Desktop Info */}
      <div className="hidden md:flex items-center gap-4 text-white z-10">
        <p className="font-bold text-[14px]">تلفن مشاوره</p>
        <p className="font-bold text-[18px]">021-22954000</p>
      </div>
    </>
  );
}
