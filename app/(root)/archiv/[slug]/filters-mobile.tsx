"use client";

import { useState } from "react";
import { BiArrowFromTop, BiX } from "react-icons/bi";

const filters = [
  {
    title: "تیپ تراش",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
  {
    title: "کنترل",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
  {
    title: "مدل کنترل",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
  {
    title: "محدوده طول گیر",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
  {
    title: "ماکزیمم طول گیر (mm)",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
  {
    title: "ماکزیمم طول ماشین کاری (mm)",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
  {
    title: "قطر سه نظام (mm)",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
  {
    title: "قطر داخلی اسپیندل (mm)",
    options: [
      "طول تراش CNC",
      "سری تراش CNC",
      "کاروسل CNC",
      "	پیشانی تراش CNC",
      "کره تراش CNC",
      "مولتی اسپیندل CNC",
    ],
  },
];

type CheckedItems = {
  [filterTitle: string]: {
    [option: string]: boolean;
  };
};

export default function FiltersMobile({ onClose }: { onClose: () => void }) {
  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  const toggleFilter = (index: number | null) => {
    setOpenFilter(openFilter === index ? null : index);
  };

  const handleCheck = (filterTitle: string, option: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [filterTitle]: {
        ...prev[filterTitle],
        [option]: !prev[filterTitle]?.[option],
      },
    }));
  };

  return (
    <div
      className="md:hidden flex flex-col items-center w-full max-w-sm sm:max-w-md p-6 shadow-2xl rounded-2xl bg-white overflow-y-auto relative"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div className="text-primary font-bold text-[16px]">فیلترها</div>
      <div className="absolute right-2 top-2 w-9 h-9 bg-secondary/10 rounded-lg p-2">
        <button onClick={onClose}>
          <BiX size={20} className="text-secondary/60" />
        </button>
      </div>
      <div className="mt-4 w-full">
        {filters.map((filter, index) => (
          <div key={index} className="bg-secondary/10 rounded-xl my-2">
            <button
              className="flex justify-between items-center w-full"
              onClick={() => toggleFilter(index)}
            >
              <span className="text-black/70 font-semibold text-[13px] px-5 py-4">
                {filter.title}
              </span>
              <span className="p-5">
                <BiArrowFromTop
                  size={18}
                  className={`text-secondary transform transition-transform duration-300 ${
                    openFilter === index ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
            {/* Filter Options */}
            {filter.options && openFilter === index && (
              <div className="py-2">
                {filter.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-5 py-2">
                    <input
                      type="checkbox"
                      id={`filter-${index}-${idx}`}
                      checked={checkedItems[filter.title]?.[option] || false}
                      onChange={() => handleCheck(filter.title, option)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <label
                      htmlFor={`filter-${index}-${idx}`}
                      className={`font-semibold text-[12px] cursor-pointer ${
                        checkedItems[filter.title]?.[option]
                          ? "text-black"
                          : "text-black/60"
                      }`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* In-Stock Toggle Switch */}
        <label
          htmlFor="in-stock-toggle"
          className="flex items-center justify-between bg-secondary/10 rounded-xl px-5 py-4"
        >
          <span className="text-black/70 font-semibold text-[13px]">
            فقط نمایش موجودها
          </span>
          <div
            className={`relative w-12 h-6 rounded-md shadow-inner ${
              inStockOnly ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <input
              type="checkbox"
              id="in-stock-toggle"
              className="sr-only"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
            />
            <div
              className={`absolute w-5 h-5 left-0.5 top-0.5 bg-white rounded-md shadow transition-transform ${
                inStockOnly ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      </div>
      {/* Button */}
      <button
        onClick={onClose}
        className="block md:hidden fixed bottom-0 w-full py-4 z-10 text-white font-bold text-[14px] bg-primary"
      >
        مشاهده محصولات
      </button>
    </div>
  );
}
