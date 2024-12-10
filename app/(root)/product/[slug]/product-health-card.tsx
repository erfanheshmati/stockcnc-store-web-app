"use client";

import { useAccordion } from "@/contexts/accordion-context";
import { BiArrowFromTop, BiAward, BiDetail } from "react-icons/bi";

const healthData = [
  { title: "سلامت ظاهری", percentage: 100 },
  { title: "سلامت برقی", percentage: 80 },
  { title: "سلامت اتصالات", percentage: 60 },
  { title: "سلامت سوزن", percentage: 40 },
];

export default function ProductHealthCard({ index }: { index: number }) {
  const { openIndex, toggleAccordion } = useAccordion();

  return (
    <>
      {/* Mobile View */}
      <div className="flex md:hidden flex-col gap-4 wrapper">
        {/* Description Title */}
        <div
          onClick={() => toggleAccordion(index)}
          className="flex items-center justify-between border-b pb-5"
        >
          <span className="text-primary font-bold text-[15px]">
            کارت سلامت دستگاه
          </span>
          <BiArrowFromTop
            size={15}
            className={`transform transition-transform duration-300 ${
              openIndex === index ? "rotate-180" : ""
            }`}
          />
        </div>
        {/* Description Content */}
        <div
          className={`flex flex-col gap-8 mt-2 w-full overflow-hidden transition-all duration-300 ${
            openIndex === index ? "max-h-screen mb-10" : "max-h-0"
          }`}
        >
          {healthData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-secondary font-semibold text-[13px] min-w-[25%] sm:min-w-[15%]">
                {item.title}
              </span>
              <div className="flex-1 relative mx-2 bg-gray-200 h-2 rounded-full min-w-[40%]">
                <div
                  className={`absolute top-0 right-0 h-full rounded-full
                ${item.percentage > 90 && "bg-green-500"}
            ${item.percentage > 70 && item.percentage <= 90 && "bg-lime-600"}
            ${item.percentage > 50 && item.percentage <= 70 && "bg-yellow-500"}
            ${item.percentage > 30 && item.percentage <= 50 && "bg-orange-500"}
            ${item.percentage <= 30 && "bg-red-500"}
                    `}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span
                className={`font-bold text-[14px] text-left min-w-[20%] sm:min-w-[12%]
                ${item.percentage > 90 && "text-green-500"}
          ${item.percentage > 70 && item.percentage <= 90 && "text-lime-600"}
          ${item.percentage > 50 && item.percentage <= 70 && "text-yellow-500"}
          ${item.percentage > 30 && item.percentage <= 50 && "text-orange-500"}
          ${item.percentage <= 30 && "text-red-500"}
                  `}
              >
                {item.percentage} درصد
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* *************************************************************************************************************************** */}

      {/* Desktop View */}
      <div
        className={`hidden md:flex flex-col px-4 gap-10 w-full lg:w-1/2 xl:w-5/12 overflow-hidden transition-all duration-300 rounded-xl ${
          openIndex === index ? "max-h-screen mb-10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-10 py-8 border-r border-t rounded-xl shadow-xl w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-black/70 font-bold text-[20px]">
              کارت سلامت دستگاه
            </h3>
            <span>
              <BiDetail size={30} />
            </span>
          </div>

          {healthData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-secondary font-semibold text-[14px] min-w-[12%] lg:min-w-[20%]">
                {item.title}
              </span>
              <div className="flex-1 relative ml-1 mr-2 bg-gray-200 h-4 rounded-full min-w-[40%]">
                <div
                  className={`absolute top-0 right-0 h-full rounded-full
                ${item.percentage > 90 && "bg-green-500"}
            ${item.percentage > 70 && item.percentage <= 90 && "bg-lime-600"}
            ${item.percentage > 50 && item.percentage <= 70 && "bg-yellow-500"}
            ${item.percentage > 30 && item.percentage <= 50 && "bg-orange-500"}
            ${item.percentage <= 30 && "bg-red-500"}
                    `}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="flex-grow relative ml-2 mr-1 block lg:hidden xl:block">
                <span
                  className="block w-full h-[1px] bg-repeat-x opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, transparent, black 50%, transparent)",
                    backgroundSize: "8px",
                  }}
                ></span>
              </div>
              <span
                className={`font-bold text-[16px] text-left min-w-[12%]
                ${item.percentage > 90 && "text-green-500"}
          ${item.percentage > 70 && item.percentage <= 90 && "text-lime-600"}
          ${item.percentage > 50 && item.percentage <= 70 && "text-yellow-500"}
          ${item.percentage > 30 && item.percentage <= 50 && "text-orange-500"}
          ${item.percentage <= 30 && "text-red-500"}
                `}
              >
                {item.percentage} درصد
              </span>
            </div>
          ))}
        </div>

        {/* Guarrantee Card */}
        <div className="flex items-center gap-8 bg-[#F0F2F7] py-8 px-10 rounded-md relative">
          <span className="text-secondary font-medium text-[14px] line-clamp-1">
            تمامی محصولات سی ان سی استوک با ضمانت کتبی ارائه می شوند
          </span>
          <BiAward size={30} className="text-secondary absolute left-8" />
        </div>
      </div>
    </>
  );
}
