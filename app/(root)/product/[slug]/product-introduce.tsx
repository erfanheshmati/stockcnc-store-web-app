"use client";

import PriceInquiryButton from "./price-inquiry-button";
import {
  BiArrowFromTop,
  BiChevronDown,
  BiLeftArrow,
  BiXCircle,
} from "react-icons/bi";
import { useAccordion } from "@/contexts/accordion-context";
import { Product } from "@/lib/types";
import { IMAGE_URL } from "@/lib/constants";

export default function ProductIntroduce({
  index,
  data,
}: {
  index: number;
  data: Product;
}) {
  const { openIndex, toggleAccordion } = useAccordion();

  return (
    <>
      {/* Mobile View */}
      <div className="flex md:hidden flex-col gap-6 mt-8 wrapper">
        {/* Product Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-primary font-sans font-bold text-[18px] line-clamp-1 w-9/12">
              {data.enTitle}
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-secondary/70 text-[12px]">{data.title}</h2>
            <img
              src={`${IMAGE_URL}/${data.brand.logo}`}
              alt={data.brand.title}
              className="w-20"
            />
          </div>
        </div>
        {/* Product Specifications */}
        <div className="flex flex-col gap-4 w-full">
          <div
            onClick={() => toggleAccordion(index)}
            className="flex items-center justify-between border-b pb-5"
          >
            <span className="text-primary font-bold text-[15px]">
              مشخصات محصول
            </span>
            <BiArrowFromTop
              size={15}
              className={`transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Specifications Rows */}
          <div
            className={`flex flex-col gap-8 mt-3 w-full overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-screen mb-10" : "max-h-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BiLeftArrow size={14} className="text-secondary/60" />
                <span className="text-secondary font-semibold text-[12px]">
                  کشور سازنده
                </span>
              </div>
              <div className="flex-grow relative mx-4">
                <span
                  className="block w-full h-[1px] bg-repeat-x opacity-15"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, transparent, black 50%, transparent)",
                    backgroundSize: "8px",
                  }}
                ></span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={`${IMAGE_URL}/${data.country.logo}`}
                  alt={data.country.title}
                  width={18}
                  height={18}
                />
                <span className="text-primary font-bold text-[13px] pt-0.5">
                  {data.country.title}
                </span>
              </div>
            </div>

            {/* {data.attributes.length === 0 && (
              <p className="flex items-center justify-center h-full text-secondary text-sm">
                مشخصاتی برای نمایش وجود ندارد
              </p>
            )} */}

            {data.attributes.map((item) => (
              <div className="flex items-center justify-between" key={item._id}>
                <div className="flex items-center gap-2">
                  <BiLeftArrow size={14} className="text-secondary/60" />
                  <span className="text-secondary font-semibold text-[12px]">
                    {item.attribute?.title}
                  </span>
                </div>
                <div className="flex-grow relative mx-4">
                  <span
                    className="block w-full h-[1px] bg-repeat-x opacity-15"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, transparent, black 50%, transparent)",
                      backgroundSize: "8px",
                    }}
                  ></span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary font-bold text-[13px]">
                    {item?.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ********************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-6">
        {/* Product Title */}
        <div className="flex flex-col gap-4">
          <h1 className="text-primary font-sans font-bold text-[28px] line-clamp-1">
            {data.enTitle}
          </h1>
          <div className="flex items-center justify-between lg:max-w-md">
            <h2 className="text-secondary/70 text-[14px]">{data.title}</h2>
            <img
              src={`${IMAGE_URL}/${data.brand.logo}`}
              alt={data.brand.title}
              className="w-24"
            />
          </div>
        </div>
        {/* Product Specifications */}
        <div className="flex flex-col gap-5 w-full lg:max-w-md h-[300px]">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[16px]">مشخصات دستگاه</span>
            <button
              onClick={() => toggleAccordion(index)}
              className="flex items-center gap-2 hover:underline"
            >
              <span className="text-primary font-semibold text-[13px] pt-1">
                مشاهده کامل
              </span>
              <span className="flex items-center justify-center bg-primary w-[14px] h-[14px]">
                <BiChevronDown
                  color="white"
                  size={14}
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Specifications Rows */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BiLeftArrow size={14} className="text-secondary/60" />
              <span className="text-secondary font-semibold text-[14px]">
                کشور سازنده
              </span>
            </div>
            <div className="flex-grow relative mx-4">
              <span
                className="block w-full h-[1px] bg-repeat-x opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, transparent, black 50%, transparent)",
                  backgroundSize: "8px",
                }}
              ></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-[15px] pt-0.5">
                {data.country.title}
              </span>
              <img
                src={`${IMAGE_URL}/${data.country.logo}`}
                alt={data.country.title}
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* {data.attributes.length === 0 && (
            <p className="flex items-center justify-center h-full text-secondary text-sm">
              مشخصاتی برای نمایش وجود ندارد
            </p>
          )} */}

          {data.attributes.slice(0, 5).map((item) => (
            <div className="flex items-center justify-between" key={item._id}>
              <div className="flex items-center gap-2">
                <BiLeftArrow size={14} className="text-secondary/60" />
                <span className="text-secondary font-semibold text-[14px]">
                  {item.attribute?.title}
                </span>
              </div>
              <div className="flex-grow relative mx-4">
                <span
                  className="block w-full h-[1px] bg-repeat-x opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, transparent, black 50%, transparent)",
                    backgroundSize: "8px",
                  }}
                ></span>
              </div>
              <div className="flex items-center">
                <span className="text-primary font-bold text-[15px]">
                  {item?.value}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Price Inquiry */}
        <div className="flex items-center gap-4">
          <div className="flex lg:hidden xl:flex items-center gap-8 bg-[#F0F2F7] py-6 px-10 rounded-md">
            {!data.available && (
              <>
                <span className="text-secondary font-medium text-[14px]">
                  این محصول متاسفانه{" "}
                  <span className="text-red-500 font-semibold">ناموجود</span>{" "}
                  است
                </span>
                <BiXCircle size={30} className="text-secondary" />
              </>
            )}

            {data.available && (
              <>
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
              </>
            )}
          </div>
          <PriceInquiryButton data={data} />
        </div>
      </div>
    </>
  );
}
