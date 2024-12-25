"use client";

import { useFiltersLogic } from "@/contexts/filter-logic-context";
import { useMemo } from "react";
import { BiArrowFromTop, BiX } from "react-icons/bi";

export default function FiltersMobile({ onClose }: { onClose: () => void }) {
  const {
    attributes,
    checkedItems,
    inStockOnly,
    setInStockOnly,
    toggleFilter,
    openFilter,
    clearFilters,
    handleCheck,
    handleRangeChange,
    enabledAttributes,
  } = useFiltersLogic();

  const renderedFilters = useMemo(() => {
    return attributes
      .filter((attribute) => enabledAttributes.has(attribute._id))
      .map((attribute, index) => (
        <div key={attribute._id} className="bg-secondary/10 rounded-xl my-2">
          <button
            className="flex justify-between items-center w-full"
            onClick={() => toggleFilter(index)}
          >
            <span className="text-black/80 font-semibold text-[13px] px-5 py-4">
              {attribute.title}
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
          {openFilter === index && (
            <div className="py-1">
              {attribute.type === "string" &&
                attribute.values.map((value, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-5 py-2">
                    <input
                      type="checkbox"
                      id={`filter-${index}-${idx}`}
                      checked={
                        typeof checkedItems[attribute.title]?.[value] ===
                        "boolean"
                          ? (checkedItems[attribute.title]?.[value] as boolean)
                          : false
                      }
                      onChange={() => handleCheck(attribute.title, value)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <label
                      htmlFor={`filter-${index}-${idx}`}
                      className={`font-semibold text-[12px] cursor-pointer pt-0.5 ${
                        checkedItems[attribute.title]?.[value]
                          ? "text-black"
                          : "text-black/60"
                      }`}
                    >
                      {value}
                    </label>
                  </div>
                ))}

              {attribute.type === "number" && (
                <div className="px-5 py-2 text-black/60">
                  <label className="block mb-2 font-semibold text-[12px]">
                    محدوده
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="حداقل"
                      min={0}
                      value={Number(checkedItems[attribute.title]?.min) || ""}
                      // defaultValue={0}
                      className="border focus:outline-secondary px-3 py-2 w-full rounded-md placeholder:text-[12px]"
                      onChange={(e) =>
                        handleRangeChange(attribute.title, {
                          min: Number(e.target.value),
                          max: Number(checkedItems[attribute.title]?.max),
                        })
                      }
                    />
                    <span className="text-[12px]">تا</span>
                    <input
                      type="number"
                      placeholder="حداکثر"
                      value={Number(checkedItems[attribute.title]?.max) || ""}
                      // max={1000}
                      // defaultValue={1000}
                      className="border focus:outline-secondary px-3 py-2 w-full rounded-md placeholder:text-[12px]"
                      onChange={(e) =>
                        handleRangeChange(attribute.title, {
                          min: Number(checkedItems[attribute.title]?.min),
                          max: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ));
  }, [attributes, openFilter, checkedItems, toggleFilter, enabledAttributes]);

  return (
    <div
      className="md:hidden flex flex-col items-center w-full max-w-sm sm:max-w-md p-6 shadow-2xl rounded-2xl bg-white overflow-y-auto relative"
      style={{ height: "calc(100vh - 250px)" }}
    >
      <div className="text-primary font-bold text-[16px]">فیلترها</div>
      <div className="absolute right-5 top-5">
        <button onClick={onClose}>
          <BiX size={20} className="text-secondary/60" />
        </button>
      </div>
      <div className="mt-4 w-full">
        {renderedFilters}

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

        {/* Clear Filters */}
        <button
          className="w-full text-center bg-red-500 text-white font-semibold text-sm py-4 mt-2 rounded-xl"
          onClick={clearFilters}
        >
          حذف فیلترها
        </button>
      </div>

      {/* Product View Button */}
      <button
        onClick={onClose}
        className="block md:hidden fixed bottom-0 w-full py-4 z-10 text-white font-bold text-[14px] bg-primary"
      >
        مشاهده محصولات
      </button>
    </div>
  );
}
