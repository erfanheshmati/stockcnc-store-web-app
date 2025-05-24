"use client";

import { useAccordion } from "@/contexts/accordion-context";
import { BiArrowFromTop } from "react-icons/bi";
import { Product } from "@/lib/types";

export default function ProductInfo({
  index,
  data,
}: {
  index: number;
  data: Product;
}) {
  const { openIndex, toggleAccordion } = useAccordion();

  // const [activeTab, setActiveTab] = useState<string>("specifications");

  return (
    <>
      {/* Mobile View */}
      <div className="flex md:hidden flex-col gap-4 wrapper">
        {/* Description Title */}
        <div
          onClick={() => toggleAccordion(index)}
          className="flex items-center justify-between border-b pb-5"
        >
          <h3 className="text-primary font-bold text-[15px]">توضیحات محصول</h3>
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
            openIndex === index ? "max-h-fit mb-10" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            <p className="text-[#1F2D53] font-medium text-[12px] text-justify leading-7 whitespace-pre-line">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* ******************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-14 w-full lg:w-1/2 xl:w-7/12">
        {/* Product Description */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center border-b">
            <h3 className="text-[18px] text-primary font-bold pb-4">
              توضیحات محصول
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-black/70 font-bold text-[24px]">
              درباره این دستگاه
            </h3>
            <p className="text-[#1F2D53] font-medium text-[13px] text-justify leading-7 whitespace-pre-line">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* <div
        className={`hidden md:flex flex-col w-full lg:w-1/2 xl:w-7/12 overflow-hidden transition-all duration-300 ${
          openIndex === index ? "max-h-fit mb-20" : "max-h-0"
        }`}
      > */}
      {/* Tabs Navigation */}
      {/* <div className="flex items-center gap-10 border-b">
          <h3
            className={` text-[15px] cursor-pointer pb-4 ${
              activeTab === "specifications"
                ? "text-primary font-bold border-b-[3px] border-primary"
                : "text-secondary font-medium"
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            مشخصات محصول
          </h3>
          <h3
            className={`text-[15px] cursor-pointer pb-4 ${
              activeTab === "description"
                ? "text-primary font-bold border-b-[3px] border-primary"
                : "text-secondary font-medium"
            }`}
            onClick={() => setActiveTab("description")}
          >
            توضیحات محصول
          </h3>
        </div> */}

      {/* Tabs Content */}
      {/* <div className="mt-8"> */}
      {/* {activeTab === "specifications" && ( */}
      {/* <div className="flex flex-col gap-8"> */}
      {/* <div className="flex items-start gap-14"> */}
      {/* Column 1 */}
      {/* <div className="flex flex-col gap-1 w-full"> */}
      {/* {data.attributes.length === 0 && (
                    <p className="flex items-center justify-start text-secondary text-sm">
                      مشخصاتی برای نمایش وجود ندارد
                    </p>
                  )} */}

      {/* {data.attributes
                    .slice(0, Math.ceil(data.attributes.length / 2)) // First half of the array
                    .map((item, idx) => {
                      // Check if item.value contains at least one English letter
                      const hasEnglish = /[A-Za-z]/.test(item.value);

                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-4 ${
                            idx % 2 !== 0
                              ? "rounded-lg border bg-gradient-to-l from-[#f9fafc] to-white"
                              : ""
                          }`}
                        >
                          <h3 className="text-[#1F2329] font-medium text-[14px]">
                            {item.attribute?.title}
                          </h3>
                          <span
                            dir={hasEnglish ? "ltr" : "rtl"}
                            className={`text-primary font-bold text-[15px] ${
                              hasEnglish ? "font-sans" : ""
                            }`}
                          >
                            {typeof item.value === "boolean"
                              ? item.value
                                ? "دارد"
                                : "ندارد"
                              : item.value}
                          </span>
                        </div>
                      );
                    })} */}
      {/* </div> */}

      {/* Column 2 */}
      {/* <div className="flex flex-col gap-1 w-full"> */}
      {/* {data.attributes
                    .slice(Math.ceil(data.attributes.length / 2)) // Second half of the array
                    .map((item, idx) => {
                      // Check if item.value contains at least one English letter
                      const hasEnglish = /[A-Za-z]/.test(item.value);

                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-4 ${
                            idx % 2 !== 0
                              ? "rounded-lg border bg-gradient-to-l from-[#f9fafc] to-white"
                              : ""
                          }`}
                        >
                          <h3 className="text-[#1F2329] font-medium text-[14px]">
                            {item.attribute?.title}
                          </h3>
                          <span
                            dir={hasEnglish ? "ltr" : "rtl"}
                            className={`text-primary font-bold text-[15px] ${
                              hasEnglish ? "font-sans" : ""
                            }`}
                          >
                            {typeof item.value === "boolean"
                              ? item.value
                                ? "دارد"
                                : "ندارد"
                              : item.value}
                          </span>
                        </div>
                      );
                    })} */}
      {/* </div> */}
      {/* </div> */}
      {/* <div className="flex items-center gap-8 mt-4 p-6 rounded-lg border bg-gradient-to-r from-[#f9fafc] to-white">
                <h3 className="text-black/80 font-semibold text-[14px]">
                  آپشن های این دستگاه
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold text-[14px]">
                    {data.options}
                  </span>
                  <span className="text-primary font-medium text-[10px]">
                    •
                  </span>
                  <span className="text-primary font-bold text-[14px]">
                    {data.condition}
                  </span>
                </div>
              </div> */}
      {/* </div> */}
      {/* )} */}

      {/* {activeTab === "description" && (
            <div className="flex flex-col gap-2">
              <h3 className="text-black/70 font-bold text-[24px]">
                درباره این دستگاه
              </h3>
              <p className="text-[#1F2D53] font-medium text-[13px] text-justify leading-7 whitespace-pre-line">
                {data.description}
              </p>
            </div>
          )} */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
