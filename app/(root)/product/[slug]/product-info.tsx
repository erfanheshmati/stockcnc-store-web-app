"use client";

import { useAccordion } from "@/contexts/accordion-context";
import { useState } from "react";
import { BiArrowFromTop } from "react-icons/bi";

const specificationsData = [
  { title: "تیپ تراش", description: "CNC" },
  { title: "کنترل", description: "Oi-TA" },
  { title: "مدل کنترل", description: "FANUC" },
  { title: "محدوده طول گیر", description: "تا 500" },
  { title: "ماکزیمم طول گیر", description: "450" },
  { title: "محدوده طول گیر", description: "FANUC" },
];

export default function ProductInfo({ index }: { index: number }) {
  const { openIndex, toggleAccordion } = useAccordion();

  const [activeTab, setActiveTab] = useState<string>("description");

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
            توضیحات محصول
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
          <div className="flex flex-col gap-2">
            <p className="text-[#1F2D53] font-medium text-[12px] text-justify leading-7">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </div>
        </div>
      </div>

      {/* ******************************************************************************************************************** */}

      {/* Desktop View */}
      <div
        className={`hidden md:flex flex-col w-full lg:w-1/2 xl:w-7/12 overflow-hidden transition-all duration-300 ${
          openIndex === index ? "max-h-screen mb-20" : "max-h-0"
        }`}
      >
        {/* Tabs Navigation */}
        <div className="flex items-center gap-10 border-b">
          <span
            className={`text-[15px] cursor-pointer pb-4 ${
              activeTab === "description"
                ? "text-primary font-bold border-b-[3px] border-primary"
                : "text-secondary font-medium"
            }`}
            onClick={() => setActiveTab("description")}
          >
            توضیحات محصول
          </span>
          <span
            className={` text-[15px] cursor-pointer pb-4 ${
              activeTab === "specifications"
                ? "text-primary font-bold border-b-[3px] border-primary"
                : "text-secondary font-medium"
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            مشخصات محصول
          </span>
        </div>

        {/* Tabs Content */}
        <div className="mt-8">
          {activeTab === "description" && (
            <div className="flex flex-col gap-2">
              <h3 className="text-black/70 font-bold text-[24px]">
                درباره این دستگاه
              </h3>
              <p className="text-[#1F2D53] font-medium text-[13px] text-justify leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-14">
                {/* Column 1 */}
                <div className="flex flex-col gap-1 w-full">
                  {specificationsData.map((item, idx) => {
                    // Render odd items in the first row
                    return idx % 2 === 0 ? (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4"
                      >
                        <span className="text-[#1F2329] font-medium text-[14px]">
                          {item.title}
                        </span>
                        <span className="text-primary font-bold text-[15px]">
                          {item.description}
                        </span>
                      </div>
                    ) : (
                      // Render even items in the second row
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-l from-[#f9fafc] to-white"
                      >
                        <span className="text-[#1F2329] font-medium text-[14px]">
                          {item.title}
                        </span>
                        <span className="text-primary font-bold text-[15px]">
                          {item.description}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-1 w-full">
                  {specificationsData.map((item, idx) => {
                    // Render odd items in the first row
                    return idx % 2 === 0 ? (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4"
                      >
                        <span className="text-[#1F2329] font-medium text-[14px]">
                          {item.title}
                        </span>
                        <span className="text-primary font-bold text-[15px]">
                          {item.description}
                        </span>
                      </div>
                    ) : (
                      // Render even items in the second row
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-l from-[#f9fafc] to-white"
                      >
                        <span className="text-[#1F2329] font-medium text-[14px]">
                          {item.title}
                        </span>
                        <span className="text-primary font-bold text-[15px]">
                          {item.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-8 p-6 rounded-lg border bg-gradient-to-r from-[#f9fafc] to-white">
                <h4 className="text-black/80 font-semibold text-[14px]">
                  آپشن های این دستگاه
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold text-[14px]">
                    محورها لینیر
                  </span>
                  <span className="text-primary font-medium text-[10px]">
                    •
                  </span>
                  <span className="text-primary font-bold text-[14px]">
                    تعداد ابزار:12
                  </span>
                  <span className="text-primary font-medium text-[10px]">
                    •
                  </span>
                  <span className="text-primary font-bold text-[14px]">
                    دارای مرغک
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
