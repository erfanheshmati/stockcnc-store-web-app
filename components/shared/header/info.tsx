import { BiSupport } from "react-icons/bi";

export default function Info() {
  return (
    <>
      {/* Mobile Info */}
      <div className="sm:hidden text-white">
        <BiSupport size={24} />
      </div>

      {/* Desktop Info */}
      <div className="hidden sm:flex items-center gap-4 text-white z-10">
        <p className="font-bold text-[14px]">تلفن مشاوره</p>
        <p className="font-bold text-[18px]">021-22954000</p>
      </div>
    </>
  );
}
