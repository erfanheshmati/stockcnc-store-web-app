import Image from "next/image";
import Link from "next/link";
import { BiArrowFromRight } from "react-icons/bi";

export default function Inquire() {
  return (
    <>
      {/* Mobile View */}
      <Link href="#">
        <div className="md:hidden flex items-center wrapper justify-center w-[328px] h-[87px] bg-secondary rounded-xl mt-2 relative">
          {/* Background Layer */}
          <div className="absolute inset-0 bg-consultation-background bg-no-repeat opacity-[50%]"></div>
          {/* Content */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-[12px]">
                واردات دستگاه های
              </span>
              <span className="text-white/90 text-[12px]">سی ان سی</span>
              <span className="text-white font-bold text-[12px]">
                اورجینال استوک
              </span>
            </div>
            <Image
              src="/icons/flags.png"
              alt="Consultation Icon"
              width={69}
              height={21}
            />
          </div>
        </div>
      </Link>

      {/* Desktop View */}
      <div className="hidden md:flex items-center wrapper justify-center w-[1364px] h-[95px] bg-secondary rounded-full mt-24 relative">
        {/* Background Layer */}
        <div className="absolute top-0 inset-x-1/4 h-full bg-consultation-background bg-no-repeat opacity-[50%]"></div>
        {/* Content */}
        <div className="flex items-center justify-between w-full pr-14 pl-5 relative">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-[19px]">
              واردات دستگاه های
            </span>
            <span className="text-white/90 text-[16px]">سی ان سی</span>
            <span className="text-white font-bold text-[19px]">
              اورجینال استوک
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/icons/flags.png"
              alt="Consultation Icon"
              width={131}
              height={40}
            />
          </div>
          <div className="flex items-center">
            <Link href="#">
              <div className="flex items-center justify-end gap-8 px-5 w-[262px] h-[69px] rounded-full hover:bg-[#8497B5]/20 hover:shadow transition-colors duration-300 ease-in-out">
                <span className="text-white font-bold text-[15px]">
                  استعلام قیمت فوری
                </span>
                <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                  <BiArrowFromRight size={21} className="text-secondary" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
