"use client";

import { useDialog } from "@/contexts/dialog-context";

export default function Price() {
  const { openDialog } = useDialog();

  return (
    <div
      className="flex md:hidden lg:flex justify-center w-[277px] sm:w-[307px] h-[95px] bg-gradient-to-l from-[#5d6d85] to-secondary rounded-full shadow-lg border-t border-l border-white/30 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer z-[1]"
      onClick={() => openDialog()}
    >
      <button className="flex items-center justify-center">
        <div className="flex items-center gap-5">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 32 32"
          >
            <path
              fill="#00d45a"
              d="M16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16zM16 28.8c-7.058 0-12.8-5.742-12.8-12.8s5.742-12.8 12.8-12.8c7.058 0 12.8 5.742 12.8 12.8s-5.742 12.8-12.8 12.8z"
            ></path>
            <path
              fill="#fff"
              d="M17.575 7.412l-7.975 9.477h5.317v6.769l7.975-9.477h-5.317v-6.769z"
            ></path>
          </svg>
          <div className="flex flex-col gap-1">
            <span className="text-white font-medium text-[14px] md:text-[17px]">
              استعلام قیمت فوری
            </span>
            <span className="text-white/50 font-medium text-[11px] md:text-[12px]">
              به صورت بیست و چهار ساعته
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
