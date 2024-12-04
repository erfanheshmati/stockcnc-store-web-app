import Image from "next/image";

export default function Price() {
  return (
    <div className="flex md:hidden lg:flex justify-center w-[277px] sm:w-[307px] h-[95px] bg-gradient-to-l from-[#5d6d85] to-[#4b5b72] rounded-full shadow-lg border-t border-l border-white/30 z-[1]">
      <div className="flex items-center gap-5">
        <Image
          src="/icons/thunder.png"
          alt="Thunder Icon"
          width={45}
          height={45}
        />
        <div className="flex flex-col gap-1">
          <span className="text-white font-medium text-[14px] md:text-[17px]">
            استعلام قیمت فوری
          </span>
          <span className="text-white/50 font-medium text-[11px] md:text-[12px]">
            به صورت بیست و چهار ساعته
          </span>
        </div>
      </div>
    </div>
  );
}
