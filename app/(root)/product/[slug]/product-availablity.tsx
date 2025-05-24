import { Product } from "@/lib/types";
import { BiXCircle } from "react-icons/bi";
import PriceInquiryButton from "./price-inquiry-button";

export default function ProductAvailablity({ data }: { data: Product }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between bg-[#F0F2F7] py-6 px-8 rounded-md">
        {!data.available && (
          <div className="flex items-center justify-between w-full">
            <span className="text-secondary font-medium text-[14px]">
              این محصول متاسفانه{" "}
              <span className="text-red-500 font-semibold">ناموجود</span> است
            </span>
            <BiXCircle size={30} className="text-secondary" />
          </div>
        )}

        {data.available && (
          <div className="flex items-center justify-between w-full">
            <span className="text-secondary font-medium text-[14px]">
              استعلام قیمت محصول به صورت آنلاین و تلفنی در کمتر از چند ساعت
            </span>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 0C6.9533 0 0 6.9533 0 15.5C0 24.0467 6.9533 31 15.5 31C24.0467 31 31 24.0467 31 15.5C31 6.9533 24.0467 0 15.5 0ZM15.5 27.9C8.66295 27.9 3.1 22.337 3.1 15.5C3.1 8.66295 8.66295 3.1 15.5 3.1C22.337 3.1 27.9 8.66295 27.9 15.5C27.9 22.337 22.337 27.9 15.5 27.9Z"
                fill="#536683"
              />
              <path
                d="M17.0262 7.18042L9.30005 16.3612H14.4508V22.9189L22.177 13.7381H17.0262V7.18042Z"
                fill="#536683"
              />
            </svg>
          </div>
        )}
      </div>
      <PriceInquiryButton data={data} />
    </div>
  );
}
