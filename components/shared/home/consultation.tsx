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
            <div>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#17f776"
                  stroke="#fff"
                  strokeLinejoin="miter"
                  strokeLinecap="butt"
                  strokeMiterlimit="4"
                  strokeWidth="0.3636"
                  d="M27.818 14.545c0 5.322-4.314 9.636-9.636 9.636s-9.636-4.314-9.636-9.636c0-5.322 4.314-9.636 9.636-9.636s9.636 4.314 9.636 9.636z"
                ></path>
                <path
                  fill="#014e8b"
                  d="M15.805 16.233c0.027 0.135 0.096 0.249 0.208 0.343 0.044 0.035 0.095 0.060 0.151 0.075 0.056 0.018 0.112 0.029 0.168 0.035 0.059 0.009 0.117 0.013 0.173 0.013 0.059 0 0.112 0 0.159 0h0.735c0.047 0 0.099 0 0.155 0 0.059 0 0.118-0.004 0.177-0.013 0.059-0.006 0.117-0.018 0.173-0.035 0.056-0.015 0.106-0.040 0.151-0.075 0.053-0.047 0.097-0.1 0.133-0.158 0.035-0.056 0.061-0.117 0.075-0.185v-4.76h1.777v4.228c0 0.164-0.006 0.318-0.018 0.462-0.009 0.141-0.027 0.273-0.053 0.396-0.027 0.126-0.065 0.243-0.115 0.352-0.050 0.111-0.115 0.215-0.195 0.312-0.183 0.231-0.421 0.394-0.713 0.488-0.292 0.097-0.623 0.145-0.992 0.145h-1.843c-0.369 0-0.7-0.048-0.992-0.145-0.289-0.094-0.527-0.256-0.713-0.488-0.080-0.097-0.145-0.201-0.195-0.312-0.047-0.108-0.086-0.226-0.115-0.352-0.027-0.123-0.046-0.255-0.058-0.396-0.009-0.144-0.013-0.297-0.013-0.462v-1.872h1.781v2.404zM14.082 13.010v-1.505h1.777v1.505h-1.777z"
                ></path>
                <path
                  fill="#014e8b"
                  d="M20.693 11.505h1.777v6.303h-1.777v-6.303z"
                ></path>
              </svg>
            </div>
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
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 32 32"
            >
              <path
                fill="#17f776"
                stroke="#fff"
                strokeLinejoin="miter"
                strokeLinecap="butt"
                strokeMiterlimit="4"
                strokeWidth="0.3636"
                d="M27.818 14.545c0 5.322-4.314 9.636-9.636 9.636s-9.636-4.314-9.636-9.636c0-5.322 4.314-9.636 9.636-9.636s9.636 4.314 9.636 9.636z"
              ></path>
              <path
                fill="#014e8b"
                d="M15.805 16.233c0.027 0.135 0.096 0.249 0.208 0.343 0.044 0.035 0.095 0.060 0.151 0.075 0.056 0.018 0.112 0.029 0.168 0.035 0.059 0.009 0.117 0.013 0.173 0.013 0.059 0 0.112 0 0.159 0h0.735c0.047 0 0.099 0 0.155 0 0.059 0 0.118-0.004 0.177-0.013 0.059-0.006 0.117-0.018 0.173-0.035 0.056-0.015 0.106-0.040 0.151-0.075 0.053-0.047 0.097-0.1 0.133-0.158 0.035-0.056 0.061-0.117 0.075-0.185v-4.76h1.777v4.228c0 0.164-0.006 0.318-0.018 0.462-0.009 0.141-0.027 0.273-0.053 0.396-0.027 0.126-0.065 0.243-0.115 0.352-0.050 0.111-0.115 0.215-0.195 0.312-0.183 0.231-0.421 0.394-0.713 0.488-0.292 0.097-0.623 0.145-0.992 0.145h-1.843c-0.369 0-0.7-0.048-0.992-0.145-0.289-0.094-0.527-0.256-0.713-0.488-0.080-0.097-0.145-0.201-0.195-0.312-0.047-0.108-0.086-0.226-0.115-0.352-0.027-0.123-0.046-0.255-0.058-0.396-0.009-0.144-0.013-0.297-0.013-0.462v-1.872h1.781v2.404zM14.082 13.010v-1.505h1.777v1.505h-1.777z"
              ></path>
              <path
                fill="#014e8b"
                d="M20.693 11.505h1.777v6.303h-1.777v-6.303z"
              ></path>
            </svg>
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
