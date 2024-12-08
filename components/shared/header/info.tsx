import Link from "next/link";
import { BiSupport } from "react-icons/bi";

export default function Info() {
  return (
    <>
      {/* Mobile Info */}
      <div className="md:hidden flex items-center text-white z-[9]">
        <Link href="tel:+982122954000">
          <BiSupport size={24} />
        </Link>
      </div>

      {/* Desktop Info */}
      <div className="hidden md:flex text-white hover:text-white/70 z-10 transition-all duration-300 ease-in-out">
        <Link href="tel:+982122954000" className="flex items-center gap-4 ">
          <span className="font-bold text-[14px]">تلفن مشاوره</span>
          <span className="font-bold text-[18px]">021-22954000</span>
        </Link>
      </div>
    </>
  );
}
