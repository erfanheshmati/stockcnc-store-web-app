"use client";

import {
  CheckboxFilter,
  useFiltersLogic,
} from "@/contexts/filter-logic-context";
import { useMemo } from "react";
import { BiArrowFromTop, BiX } from "react-icons/bi";
import DualRangeSlider from "./dual-range-slider";

export default function FiltersMobile({ onClose }: { onClose: () => void }) {
  const {
    attributes,
    checkedItems,
    inStockOnly,
    setInStockOnly,
    toggleFilter,
    openFilter,
    handleCheckAndFilterChange,
    handleRangeChange,
    // filteredProductsCount,
    clearFilters,
    applyFilters,
  } = useFiltersLogic();

  // Determine dual-range-slider step value for numeric filters
  const getStepForFilter = (title: string) => {
    return title === "سال ساخت (میلادی)" ? 1 : 10;
  };

  const renderedFilters = useMemo(() => {
    return attributes
      .filter((attribute) => {
        const requiredAttributeId = attribute.requiredAttribute;
        // Always show filters that:
        // 1. Have no requiredAttribute
        // 2. Have requiredAttribute pointing to themselves
        if (!requiredAttributeId || requiredAttributeId === attribute.id)
          return true;
        // If a filter depends on another filter, check if that filter is selected
        const requiredFilterChecked =
          checkedItems[requiredAttributeId] &&
          Object.values(
            checkedItems[requiredAttributeId] as CheckboxFilter
          ).some(Boolean);
        return requiredFilterChecked; // Show only if required filter is checked
      })
      .map((attribute, index) => {
        const isChecked =
          checkedItems[attribute.id] &&
          (attribute.type === "string"
            ? Object.values(checkedItems[attribute.id] as CheckboxFilter).some(
                Boolean
              )
            : (attribute.type === "number" &&
                checkedItems[attribute.id].min !== attribute.min) ||
              checkedItems[attribute.id].max !== attribute.max);

        const isOpen = openFilter === index || isChecked; // Keep open if checked

        // Check if a segment contains any English letter
        const isEnglishSegment = (segment: string) => /[A-Za-z]/.test(segment);
        // Split the text into segments. The regex below splits the string into groups
        // that are either sequences of letters/numbers (including Persian digits) or non-alphanumerics
        const segments =
          attribute.title.match(
            /([A-Za-z0-9\u06F0-\u06F9]+|[^A-Za-z0-9\u06F0-\u06F9]+)/g
          ) || [];

        // For numeric filters, determine the step value.
        const step =
          attribute.type === "number"
            ? getStepForFilter(attribute.title)
            : undefined;

        return (
          <div key={attribute.id} className="bg-secondary/10 rounded-xl my-2">
            <button
              className="flex justify-between items-center w-full"
              onClick={() => toggleFilter(index)}
            >
              <span className="text-black/80 font-semibold px-5 py-4">
                {segments.map((seg, index) =>
                  isEnglishSegment(seg) ? (
                    <span key={index} className="font-sans text-[12px]">
                      {seg}
                    </span>
                  ) : (
                    <span key={index} className="text-[13px]">
                      {seg}
                    </span>
                  )
                )}
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
            {isOpen && (
              <div className="py-2">
                {/* String-Based Filters (Checkboxes) */}
                {attribute.type === "string" &&
                  (attribute.value || []).map((option, idx) => {
                    // Cast the filter value as a CheckboxFilter so we can index using option.value
                    const checkboxValue = (
                      checkedItems[attribute.id] as
                        | { [key: string]: boolean }
                        | undefined
                    )?.[option.value];

                    // Check if option.value contains at least one English letter
                    const hasEnglish = /[A-Za-z]/.test(option.value);

                    return (
                      <div key={idx} className="flex items-center px-5 py-2">
                        <input
                          type="checkbox"
                          id={`filter-${index}-${idx}`}
                          checked={Boolean(checkboxValue)}
                          onChange={() =>
                            handleCheckAndFilterChange(
                              attribute.id,
                              option.value
                            )
                          }
                          className="w-5 h-5"
                        />
                        <label
                          htmlFor={`filter-${index}-${idx}`}
                          className={`
                            flex items-center gap-1 text-[12px] font-semibold pt-0.5 pr-2 ${
                              checkboxValue ? "text-black" : "text-black/60"
                            }`}
                        >
                          <span className={hasEnglish ? "font-sans" : ""}>
                            {option.value}
                          </span>
                          <span className={hasEnglish ? "pt-0.5" : ""}>
                            ({option.count})
                          </span>
                        </label>
                      </div>
                    );
                  })}

                {/* Numeric Filters (Dual Range Slider for Min & Max) */}
                {attribute.type === "number" && (
                  <DualRangeSlider
                    min={attribute.min}
                    max={attribute.max}
                    step={step}
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
        );
      });
  }, [
    attributes,
    openFilter,
    checkedItems,
    toggleFilter,
    handleCheckAndFilterChange,
    handleRangeChange,
  ]);

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
              checked={inStockOnly ?? false}
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
        onClick={() => {
          onClose(); // Invoke the function
          applyFilters(); // Invoke the function
        }}
        className="flex items-center justify-center fixed bottom-0 w-full py-4 z-10 text-white font-bold text-[14px] bg-primary"
      >
        {/* {filteredProductsCount > 0 ? (
          <>
            مشاهده
            <div className="px-1">{filteredProductsCount}</div>
            محصول
          </>
        ) : (
          <span>محصولی پیدا نشد</span>
        )} */}
        مشاهده محصولات
      </button>
    </div>
  );
}
