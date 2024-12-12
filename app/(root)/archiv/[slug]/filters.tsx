"use client";

import { useState } from "react";
import { BiArrowFromTop } from "react-icons/bi";
import FiltersMobile from "./filters-mobile";
import { useDialog } from "@/contexts/dialog-context";

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
  {
    title: "ماکزیمم سرعت اسپیندل (rpm)",
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
    title: "ماکزیمم تارت",
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
    title: "ساب اسپیندل",
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

// type FilterOption = string;

// type Filter = {
//   title: string;
//   options?: FilterOption[];
// };

type CheckedItems = {
  [filterTitle: string]: {
    [option: string]: boolean;
  };
};

export default function Filters() {
  const { closeDialog } = useDialog();

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
    <>
      {/* Mobile View */}
      <FiltersMobile onClose={closeDialog} />

      {/* *************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:block border rounded-lg sticky top-10">
        {filters.map((filter, index) => (
          <div key={index}>
            <button
              className="flex justify-between items-center w-full border-b hover:bg-gradient-to-l from-[#DFE3EF4F] to-white"
              onClick={() => toggleFilter(index)}
            >
              <span className="text-black/90 font-semibold text-[15px] px-5 py-4">
                {filter.title}
              </span>
              <span className="p-5 border-r">
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
              <div className="py-4 border-b">
                {filter.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-6 py-3">
                    <input
                      type="checkbox"
                      id={`filter-${index}-${idx}`}
                      checked={checkedItems[filter.title]?.[option] || false}
                      onChange={() => handleCheck(filter.title, option)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <label
                      htmlFor={`filter-${index}-${idx}`}
                      className={`font-semibold text-[14px] cursor-pointer ${
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
          className="flex items-center justify-between px-5 py-5 cursor-pointer hover:bg-gradient-to-l from-[#DFE3EF4F] to-white"
        >
          <span className="text-black/90 font-semibold text-[15px]">
            فقط نمایش موجودها
          </span>
          <div
            className={`relative w-12 h-6 rounded-md shadow-inner ${
              inStockOnly ? "bg-primary" : "bg-gray-200"
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
    </>
  );
}
