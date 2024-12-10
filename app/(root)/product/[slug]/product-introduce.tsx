"use client";

import PriceInquiryButton from "./price-inquiry-button";
import { BiArrowFromTop, BiChevronDown, BiLeftArrow } from "react-icons/bi";
import { useAccordion } from "@/contexts/accordion-context";

const specificationsItems = [
  {
    id: 1,
    title: "کشور سازنده",
    content: "کره جنوبی",
    icon: `<svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26Z" fill="#F0F2F7"/>
  <path d="M17.5216 13C17.5216 14.1304 15.4971 16.9565 12.9999 16.9565C10.5026 16.9565 8.47815 14.1304 8.47815 13C8.47815 10.5027 10.5026 8.47827 12.9999 8.47827C15.4971 8.47827 17.5216 10.5027 17.5216 13Z" fill="#D2405A"/>
  <path d="M17.5216 13C17.5216 15.4973 15.4971 17.5217 12.9999 17.5217C10.5026 17.5217 8.47815 15.4973 8.47815 13" fill="#496C96"/>
  <path d="M17.7919 16.9968L18.9907 15.798L19.7899 16.5972L18.5911 17.796L17.7919 16.9968Z" fill="#3B4249"/>
  <path d="M15.7953 18.9954L16.9941 17.7965L17.7933 18.5958L16.5945 19.7946L15.7953 18.9954Z" fill="#3B4249"/>
  <path d="M20.1902 19.3948L21.389 18.196L22.1882 18.9952L20.9894 20.194L20.1902 19.3948Z" fill="#3B4249"/>
  <path d="M18.1913 21.3928L19.3901 20.194L20.1893 20.9932L18.9905 22.192L18.1913 21.3928Z" fill="#3B4249"/>
  <path d="M18.9922 18.1956L20.191 16.9967L20.9902 17.796L19.7914 18.9948L18.9922 18.1956Z" fill="#3B4249"/>
  <path d="M16.9956 20.1938L18.1944 18.995L18.9936 19.7943L17.7948 20.9931L16.9956 20.1938Z" fill="#3B4249"/>
  <path d="M20.1948 9.00537L16.998 5.80852L17.7972 5.0093L20.994 8.20615L20.1948 9.00537Z" fill="#3B4249"/>
  <path d="M16.9979 8.2063L15.7991 7.00748L16.5983 6.2083L17.7971 7.40711L16.9979 8.2063Z" fill="#3B4249"/>
  <path d="M18.9968 10.2048L17.798 9.00602L18.5972 8.20683L19.796 9.40565L18.9968 10.2048Z" fill="#3B4249"/>
  <path d="M19.3938 5.80835L18.195 4.60953L18.9942 3.81031L20.193 5.00913L19.3938 5.80835Z" fill="#3B4249"/>
  <path d="M21.395 7.80713L20.1962 6.60831L20.9954 5.80909L22.1942 7.00791L21.395 7.80713Z" fill="#3B4249"/>
  <path d="M4.6073 18.1936L7.80415 21.3905L7.00493 22.1897L3.80808 18.9928L4.6073 18.1936Z" fill="#3B4249"/>
  <path d="M7.8042 18.9922L9.00301 20.191L8.20383 20.9902L7.00501 19.7914L7.8042 18.9922Z" fill="#3B4249"/>
  <path d="M5.80518 16.9946L7.00399 18.1934L6.20477 18.9927L5.00595 17.7939L5.80518 16.9946Z" fill="#3B4249"/>
  <path d="M7.00549 15.7952L10.2023 18.992L9.40312 19.7912L6.20627 16.5944L7.00549 15.7952Z" fill="#3B4249"/>
  <path d="M7.8042 4.60718L4.60735 7.80403L3.80812 7.00481L7.00498 3.80796L7.8042 4.60718Z" fill="#3B4249"/>
  <path d="M9.00439 5.80542L5.80754 9.00227L5.00832 8.20305L8.20517 5.0062L9.00439 5.80542Z" fill="#3B4249"/>
  <path d="M10.2047 7.00513L7.00786 10.202L6.20867 9.40279L9.40553 6.20594L10.2047 7.00513Z" fill="#3B4249"/>
  </svg>
  `,
  },
  {
    id: 2,
    title: "کورس Z",
    content: "500",
    icon: "",
  },
  {
    id: 3,
    title: "مدل کنترل",
    content: "Oi_TA",
    icon: "",
  },
  {
    id: 4,
    title: "محدوده طول کارگیر",
    content: "تا 500 میلیمتر",
    icon: "",
  },
  {
    id: 5,
    title: "ماکزیمم طول کارگیر (mm)",
    content: "تا 500 میلیمتر",
    icon: "",
  },
  {
    id: 6,
    title: "تیپ تراش",
    content: "تراش CNC",
    icon: "",
  },
];

export default function ProductIntroduce({ index }: { index: number }) {
  const { openIndex, toggleAccordion } = useAccordion();

  return (
    <>
      {/* Mobile View */}
      <div className="flex md:hidden flex-col gap-6 mt-8 wrapper">
        {/* Product Title */}
        <div className="flex flex-col gap-2">
          <h2 className="text-primary font-bold text-[18px] line-clamp-1">
            دستگاه تراش سی ان سی مدل پوما برند DOOSAN
          </h2>
          <h3 className="text-secondary/70 text-[10px]">
            two-axis horizontal CNC turning machine
          </h3>
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
            className={`flex flex-col gap-8 mt-2 w-full overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-screen mb-10" : "max-h-0"
            }`}
          >
            {specificationsItems.map((item) => (
              <div className="flex items-center justify-between" key={item.id}>
                <div className="flex items-center gap-2">
                  <BiLeftArrow size={14} className="text-secondary/60" />
                  <span className="text-secondary font-semibold text-[12px]">
                    {item.title}
                  </span>
                </div>
                <div className="flex-grow relative mx-4">
                  <span
                    className="block w-full h-[1px] bg-repeat-x opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, transparent, black 50%, transparent)",
                      backgroundSize: "8px",
                    }}
                  ></span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-primary font-bold text-[13px]">
                    {item.content}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ********************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-10">
        {/* Product Title */}
        <div className="flex flex-col gap-4">
          <h2 className="text-primary font-bold text-[28px] line-clamp-1">
            دستگاه تراش سی ان سی مدل پوما برند DOOSAN
          </h2>
          <h3 className="text-secondary/70 text-[12px]">
            two-axis horizontal CNC turning machine
          </h3>
        </div>
        {/* Product Specifications */}
        <div className="flex flex-col gap-6 w-full lg:max-w-md">
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
          {specificationsItems.map((item) => (
            <div className="flex items-center justify-between" key={item.id}>
              <div className="flex items-center gap-2">
                <BiLeftArrow size={14} className="text-secondary/60" />
                <span className="text-secondary font-semibold text-[14px]">
                  {item.title}
                </span>
              </div>
              <div className="flex-grow relative mx-4">
                <span
                  className="block w-full h-[1px] bg-repeat-x opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, transparent, black 50%, transparent)",
                    backgroundSize: "8px",
                  }}
                ></span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-primary font-bold text-[15px]">
                  {item.content}
                </span>
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
              </div>
            </div>
          ))}
        </div>
        {/* Price Inquiry */}
        <div className="flex items-center gap-4">
          <div className="flex lg:hidden xl:flex items-center gap-8 bg-[#F0F2F7] py-6 px-10 rounded-md">
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
          <PriceInquiryButton />
        </div>
      </div>
    </>
  );
}
