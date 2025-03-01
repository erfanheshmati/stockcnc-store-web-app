"use client";

import { useMemo } from "react";
import { BiArrowFromTop } from "react-icons/bi";
import FiltersMobile from "./filters-mobile";
import { useDialog } from "@/contexts/dialog-context";
import clsx from "clsx";
import { useFiltersLogic } from "@/contexts/filter-logic-context";
import DualRangeSlider from "./dual-range-slider";

export default function Filters() {
  const { closeDialog } = useDialog();

  const {
    attributes,
    checkedItems,
    inStockOnly,
    setInStockOnly,
    toggleFilter,
    openFilter,
    handleCheckAndFilterChange,
    handleRangeChange,
    enabledAttributes,
    filteredProductsCount,
    applyFilters,
    clearFilters,
  } = useFiltersLogic();

  const renderedFilters = useMemo(() => {
    return attributes
      .filter((attribute) => enabledAttributes.has(attribute.id))
      .map((attribute, index) => (
        <div key={attribute.id}>
          <button
            className="flex justify-between items-center w-full border-b hover:bg-gradient-to-l from-[#DFE3EF4F] to-white"
            onClick={() => toggleFilter(index)}
          >
            <span className="text-black/90 font-semibold text-[15px] px-5 py-4">
              {attribute.title}
            </span>
            <span className="p-5 border-r">
              <BiArrowFromTop
                size={18}
                className={clsx(
                  "text-secondary transform transition-transform duration-300",
                  { "rotate-180": openFilter === index }
                )}
              />
            </span>
          </button>
          {openFilter === index && (
            <div className="py-4 border-b">
              {/* String-Based Filters (Checkboxes) */}
              {attribute.type === "string" &&
                (attribute.value || []).map((option, idx) => {
                  // Cast the filter value as a CheckboxFilter so we can index using option.value
                  const checkboxValue = (
                    checkedItems[attribute.id] as
                      | { [key: string]: boolean }
                      | undefined
                  )?.[option.value];
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-6 py-2"
                    >
                      <input
                        type="checkbox"
                        id={`filter-${index}-${idx}`}
                        checked={Boolean(checkboxValue)}
                        onChange={() =>
                          handleCheckAndFilterChange(attribute.id, option.value)
                        }
                        className="w-5 h-5 cursor-pointer"
                      />
                      <label
                        className={clsx("font-semibold text-[14px]", {
                          "text-black": checkboxValue,
                          "text-black/60": !checkboxValue,
                        })}
                      >
                        {option.value} ({option.count})
                      </label>
                    </div>
                  );
                })}

              {/* Numeric Filters (Dual Range Slider for Min & Max) */}
              {attribute.type === "number" && (
                <DualRangeSlider
                  min={attribute.min}
                  max={attribute.max}
                  currentValue={
                    checkedItems[attribute.id] &&
                    typeof checkedItems[attribute.id] === "object" &&
                    "min" in checkedItems[attribute.id] &&
                    "max" in checkedItems[attribute.id]
                      ? (checkedItems[attribute.id] as {
                          min: number;
                          max: number;
                        })
                      : { min: attribute.min, max: attribute.max }
                  }
                  onChange={(newRange) =>
                    handleRangeChange(attribute.id, newRange)
                  }
                />
              )}
            </div>
          )}
        </div>
      ));
  }, [
    attributes,
    openFilter,
    checkedItems,
    toggleFilter,
    enabledAttributes,
    handleCheckAndFilterChange,
    handleRangeChange,
  ]);

  return (
    <>
      <FiltersMobile onClose={closeDialog} />

      <div className="hidden md:block sticky top-24">
        <div className="border rounded-lg">
          {renderedFilters}

          {/* In-Stock Toggle Switch */}
          <label
            htmlFor="stock-toggle"
            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gradient-to-l from-[#DFE3EF4F] to-white"
          >
            <span className="text-black/90 font-semibold text-[15px]">
              فقط نمایش موجودها
            </span>
            <div
              className={clsx(
                "relative w-12 h-6 rounded-md shadow-inner",
                { "bg-primary": inStockOnly },
                { "bg-gray-200": !inStockOnly }
              )}
            >
              <input
                type="checkbox"
                id="stock-toggle"
                className="sr-only"
                checked={inStockOnly ?? false}
                onChange={() => setInStockOnly(!inStockOnly)}
              />
              <div
                className={clsx(
                  "absolute w-5 h-5 left-0.5 top-0.5 bg-white rounded-md shadow transition-transform",
                  { "translate-x-6": inStockOnly },
                  { "translate-x-0": !inStockOnly }
                )}
              ></div>
            </div>
          </label>
        </div>

        {/* Show Products Button */}
        <button
          onClick={applyFilters}
          className="flex items-center justify-center w-full bg-primary text-white font-semibold text-md py-4 mt-3 rounded-lg hover:opacity-85 transition-all duration-300 ease-in-out"
        >
          مشاهده
          <div className="px-1">{filteredProductsCount}</div>
          محصول
        </button>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="w-full text-center bg-red-500 text-white font-semibold text-md py-4 mt-3 rounded-lg hover:opacity-85 transition-all duration-300 ease-in-out"
        >
          حذف فیلترها
        </button>
      </div>
    </>
  );
}
