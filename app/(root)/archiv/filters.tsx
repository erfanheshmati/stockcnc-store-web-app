"use client";

import { useMemo } from "react";
import { BiArrowFromTop } from "react-icons/bi";
import FiltersMobile from "./filters-mobile";
import { useDialog } from "@/contexts/dialog-context";
import clsx from "clsx";
import { useFiltersLogic } from "@/contexts/filter-logic-context";

export default function Filters() {
  const { closeDialog } = useDialog();

  const {
    attributes,
    checkedItems,
    inStockOnly,
    setInStockOnly,
    toggleFilter,
    openFilter,
    clearFilters,
    handleCheckAndFilterChange,
    handleRangeChange,
    enabledAttributes,
  } = useFiltersLogic();

  const renderedFilters = useMemo(() => {
    return attributes
      .filter((attribute) => enabledAttributes.has(attribute._id))
      .map((attribute, index) => (
        <div key={attribute._id}>
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
              {attribute.type === "string" &&
                attribute.values.map((value, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-6 py-2">
                    <input
                      type="checkbox"
                      id={`filter-${index}-${idx}`}
                      checked={
                        typeof checkedItems[attribute._id]?.[value] ===
                        // "boolean" || "string"
                        "boolean"
                          ? (checkedItems[attribute._id]?.[value] as boolean)
                          : false
                      }
                      onChange={() =>
                        handleCheckAndFilterChange(attribute._id, value)
                      }
                      className="w-5 h-5 cursor-pointer"
                    />
                    <label
                      // htmlFor={`filter-${index}-${idx}`}
                      className={clsx(
                        // "font-semibold text-[14px] cursor-pointer",
                        "font-semibold text-[14px]",
                        {
                          "text-black": checkedItems[attribute._id]?.[value],
                          "text-black/60":
                            !checkedItems[attribute._id]?.[value],
                        }
                      )}
                    >
                      {value}
                    </label>
                  </div>
                ))}

              {attribute.type === "number" && (
                <div className="px-6 py-2 text-black/80">
                  <label className="block mb-2 font-semibold text-[14px]">
                    محدوده
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="حداقل"
                      value={Number(checkedItems[attribute._id]?.min) || ""}
                      // min={0}
                      // defaultValue={0}
                      className="border focus:outline-secondary px-3 py-2 w-full rounded-md placeholder:text-[13px]"
                      onChange={(e) =>
                        handleRangeChange(attribute._id, {
                          min: Number(e.target.value),
                          max: Number(checkedItems[attribute._id]?.max),
                        })
                      }
                    />
                    <span className="text-[14px]">تا</span>
                    <input
                      type="number"
                      placeholder="حداکثر"
                      value={Number(checkedItems[attribute._id]?.max) || ""}
                      // max={1000}
                      // defaultValue={1000}
                      className="border focus:outline-secondary px-3 py-2 w-full rounded-md placeholder:text-[13px]"
                      onChange={(e) =>
                        handleRangeChange(attribute._id, {
                          min: Number(checkedItems[attribute._id]?.min),
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
    <>
      <FiltersMobile onClose={closeDialog} />

      <div className="hidden md:block sticky top-10">
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

        {/* Clear Filters */}
        <button
          className="w-full text-center bg-red-500 text-white font-semibold text-md py-4 mt-3 rounded-lg hover:opacity-85 transition-all duration-300 ease-in-out"
          onClick={clearFilters}
        >
          حذف فیلترها
        </button>
      </div>
    </>
  );
}
