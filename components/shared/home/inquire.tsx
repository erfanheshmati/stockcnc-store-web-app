"use client";

import { useDialog } from "@/contexts/dialog-context";
import { BiArrowFromRight } from "react-icons/bi";

export default function Inquire() {
  const { openDialog } = useDialog();

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex items-center wrapper justify-center w-[328px] h-[87px] bg-secondary rounded-xl mt-10 relative">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-consultation-background bg-no-repeat opacity-[50%]"></div>
        {/* Content */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-[12px]">
              وارد کننده انواع ماشین آلات
            </span>
            <span className="text-white/90 text-[12px]">سی ان سی</span>
          </div>
          <div>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="110"
              height="50"
              viewBox="0 0 85 32"
            >
              <path
                fill="#ffda44"
                d="M12.068 19.304c1.373 3.7 4.934 6.336 9.111 6.336s7.738-2.637 9.111-6.336l-9.111-0.845-9.111 0.845z"
              ></path>
              <path
                fill="#424242"
                d="M21.179 6.209c-4.177 0-7.738 2.636-9.111 6.336l9.111 0.845 9.111-0.845c-1.373-3.7-4.934-6.336-9.111-6.336z"
              ></path>
              <path
                fill="#d80027"
                d="M12.067 12.545c-0.39 1.052-0.604 2.191-0.604 3.379s0.214 2.327 0.604 3.379h18.222c0.39-1.052 0.604-2.191 0.604-3.379s-0.214-2.327-0.604-3.379h-18.222z"
              ></path>
              <path
                fill="#fff"
                d="M35.557 25.64c5.366 0 9.715-4.35 9.715-9.715s-4.35-9.715-9.715-9.715c-5.366 0-9.715 4.35-9.715 9.715s4.35 9.715 9.715 9.715z"
              ></path>
              <path
                fill="#d10127"
                d="M35.556 20.148c2.333 0 4.224-1.891 4.224-4.224s-1.891-4.224-4.224-4.224c-2.333 0-4.224 1.891-4.224 4.224s1.891 4.224 4.224 4.224z"
              ></path>
              <path
                fill="#f0f0f0"
                d="M64.315 25.64c5.365 0 9.715-4.35 9.715-9.715s-4.35-9.715-9.715-9.715c-5.366 0-9.716 4.35-9.716 9.715s4.35 9.715 9.716 9.715z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#d2405a"
                d="M67.693 15.924c0 0.845-1.513 2.957-3.379 2.957s-3.379-2.112-3.379-2.957c0-1.866 1.513-3.379 3.379-3.379s3.379 1.513 3.379 3.379z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#496c96"
                d="M67.693 15.924c0 1.866-1.513 3.379-3.379 3.379s-3.379-1.513-3.379-3.379z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M67.896 18.911l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M66.404 20.405l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M69.687 20.704l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M68.194 22.196l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M68.793 19.807l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M67.301 21.301l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M69.692 12.939l-2.389-2.389 0.597-0.597 2.389 2.389-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M67.303 12.342l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M68.796 13.835l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M69.093 10.55l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M70.588 12.044l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M58.043 19.805l2.389 2.389-0.597 0.597-2.389-2.389 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M60.431 20.403l0.896 0.896-0.597 0.597-0.896-0.896 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M58.937 18.91l0.896 0.896-0.597 0.597-0.896-0.896 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M59.834 18.014l2.389 2.389-0.597 0.597-2.389-2.389 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M60.431 9.653l-2.389 2.389-0.597-0.597 2.389-2.389 0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M61.328 10.547l-2.389 2.389-0.597-0.597 2.389-2.389 0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M62.225 11.444l-2.389 2.389-0.597-0.597 2.389-2.389 0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* ******************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex items-center wrapper justify-center w-[1364px] h-[95px] bg-secondary rounded-full mt-24 relative">
        {/* Background Layer */}
        <div className="absolute top-0 inset-x-1/4 h-full bg-consultation-background bg-no-repeat opacity-[50%]"></div>
        {/* Content */}
        <div className="flex items-center justify-between w-full pr-14 pl-5 relative">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-[19px]">
              وارد کننده انواع ماشین آلات
            </span>
            <span className="text-white/90 text-[16px]">سی ان سی</span>
          </div>
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="70"
              viewBox="0 0 75 32"
            >
              <path
                fill="#ffda44"
                d="M12.068 19.304c1.373 3.7 4.934 6.336 9.111 6.336s7.738-2.637 9.111-6.336l-9.111-0.845-9.111 0.845z"
              ></path>
              <path
                fill="#424242"
                d="M21.179 6.209c-4.177 0-7.738 2.636-9.111 6.336l9.111 0.845 9.111-0.845c-1.373-3.7-4.934-6.336-9.111-6.336z"
              ></path>
              <path
                fill="#d80027"
                d="M12.067 12.545c-0.39 1.052-0.604 2.191-0.604 3.379s0.214 2.327 0.604 3.379h18.222c0.39-1.052 0.604-2.191 0.604-3.379s-0.214-2.327-0.604-3.379h-18.222z"
              ></path>
              <path
                fill="#fff"
                d="M35.557 25.64c5.366 0 9.715-4.35 9.715-9.715s-4.35-9.715-9.715-9.715c-5.366 0-9.715 4.35-9.715 9.715s4.35 9.715 9.715 9.715z"
              ></path>
              <path
                fill="#d10127"
                d="M35.556 20.148c2.333 0 4.224-1.891 4.224-4.224s-1.891-4.224-4.224-4.224c-2.333 0-4.224 1.891-4.224 4.224s1.891 4.224 4.224 4.224z"
              ></path>
              <path
                fill="#f0f0f0"
                d="M64.315 25.64c5.365 0 9.715-4.35 9.715-9.715s-4.35-9.715-9.715-9.715c-5.366 0-9.716 4.35-9.716 9.715s4.35 9.715 9.716 9.715z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#d2405a"
                d="M67.693 15.924c0 0.845-1.513 2.957-3.379 2.957s-3.379-2.112-3.379-2.957c0-1.866 1.513-3.379 3.379-3.379s3.379 1.513 3.379 3.379z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#496c96"
                d="M67.693 15.924c0 1.866-1.513 3.379-3.379 3.379s-3.379-1.513-3.379-3.379z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M67.896 18.911l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M66.404 20.405l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M69.687 20.704l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M68.194 22.196l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M68.793 19.807l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M67.301 21.301l0.896-0.896 0.597 0.597-0.896 0.896-0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M69.692 12.939l-2.389-2.389 0.597-0.597 2.389 2.389-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M67.303 12.342l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M68.796 13.835l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M69.093 10.55l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M70.588 12.044l-0.896-0.896 0.597-0.597 0.896 0.896-0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M58.043 19.805l2.389 2.389-0.597 0.597-2.389-2.389 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M60.431 20.403l0.896 0.896-0.597 0.597-0.896-0.896 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M58.937 18.91l0.896 0.896-0.597 0.597-0.896-0.896 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M59.834 18.014l2.389 2.389-0.597 0.597-2.389-2.389 0.597-0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M60.431 9.653l-2.389 2.389-0.597-0.597 2.389-2.389 0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M61.328 10.547l-2.389 2.389-0.597-0.597 2.389-2.389 0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
              <path
                fill="#3b4249"
                d="M62.225 11.444l-2.389 2.389-0.597-0.597 2.389-2.389 0.597 0.597z"
                transform="translate(-14, 0)"
              ></path>
            </svg>
          </div>
          <div className="flex items-center">
            <button onClick={() => openDialog()}>
              <div className="flex items-center justify-end gap-8 px-5 w-[262px] h-[69px] rounded-full hover:bg-[#8497B5]/20 hover:shadow transition-colors duration-300 ease-in-out">
                <span className="text-white font-bold text-[15px]">
                  استعلام قیمت فوری
                </span>
                <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                  <BiArrowFromRight size={21} className="text-secondary" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
