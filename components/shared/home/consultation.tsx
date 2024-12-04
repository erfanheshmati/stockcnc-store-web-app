import Image from "next/image";
import Link from "next/link";
import { BiArrowFromRight } from "react-icons/bi";

export default function Consultation() {
  return (
    <>
      {/* Mobile View */}
      <Link href="#">
        <div className="md:hidden flex items-center wrapper justify-center w-[328px] h-[87px] bg-primary rounded-xl mt-10 relative">
          {/* Background Layer */}
          <div className="absolute inset-0 bg-consultation-background bg-no-repeat opacity-[50%]"></div>
          {/* Content */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-[12px]">
                مشاوره تلفنی و آنلاین
              </span>
              <span className="text-white/90 text-[12px]">
                جهت انتخاب سرویس
              </span>
            </div>
            <Image
              src="/icons/badge-consultation.png"
              alt="Consultation Icon"
              width={48}
              height={48}
            />
          </div>
        </div>
      </Link>

      {/* Desktop View */}
      <div className="hidden md:flex items-center wrapper justify-center w-[1364px] h-[95px] bg-primary rounded-full mt-24 relative">
        {/* Background Layer */}
        <div className="absolute top-0 right-0 h-full w-1/2 bg-consultation-background bg-no-repeat opacity-[50%]"></div>
        {/* Content */}
        <div className="flex items-center justify-between w-full pr-14 pl-5 relative">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-[19px]">
              مشاوره تلفنی و آنلاین
            </span>
            <span className="text-white/90 text-[16px]">
              جهت خرید دستگاه ها
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/icons/badge-consultation.png"
              alt="Consultation Icon"
              width={70}
              height={70}
            />
          </div>
          <div className="flex items-center">
            <Link href="#">
              <div className="flex items-center justify-end gap-8 px-5 w-[262px] h-[69px] rounded-full hover:bg-[#0084F1]/20 hover:shadow transition-colors duration-300 ease-in-out">
                <span className="text-white font-bold text-[15px]">
                  شروع گفتگوی آنلاین
                </span>
                <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                  <BiArrowFromRight size={21} className="text-primary" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
