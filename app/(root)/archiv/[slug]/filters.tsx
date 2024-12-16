"use client";

import { useMemo, useState } from "react";
import { BiArrowFromTop } from "react-icons/bi";
import FiltersMobile from "./filters-mobile";
import { useDialog } from "@/contexts/dialog-context";
import { Product } from "@/lib/types";
import clsx from "clsx";

type CheckedItems = {
  [attributeTitle: string]: {
    [value: string]: boolean;
  };
};

export default function Filters({ productsList }: { productsList: Product[] }) {
  const { closeDialog } = useDialog();

  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilter = (index: number | null) => {
    setOpenFilter(openFilter === index ? null : index);
  };

  const handleCheck = (attributeTitle: string, value: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [attributeTitle]: {
        ...prev[attributeTitle],
        [value]: !prev[attributeTitle]?.[value],
      },
    }));
  };

  // Extract attributes and their values
  const attributes = useMemo(() => {
    // Flatten all attributes from all products into one array
    const allAttributes = productsList.flatMap((product) =>
      product.attributes.filter((attr) => attr.attribute.isFilter)
    );

    // Deduplicate attributes by title
    const uniqueAttributes: { [title: string]: string[] } = {};
    allAttributes.forEach((attr) => {
      const { title, values } = attr.attribute;
      if (!uniqueAttributes[title]) {
        uniqueAttributes[title] = values;
      }
    });

    return Object.entries(uniqueAttributes).map(([title, values]) => ({
      title,
      values,
    }));
  }, [productsList]);

  const renderedFilters = useMemo(() => {
    return attributes.map((attribute, index) => (
      <div key={index}>
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
        {attribute.values && openFilter === index && (
          <div className="py-4 border-b">
            {attribute.values.map((value, idx) => (
              <div key={idx} className="flex items-center gap-2 px-6 py-3">
                <input
                  type="checkbox"
                  id={`filter-${index}-${idx}`}
                  checked={checkedItems[attribute.title]?.[value] || false}
                  onChange={() => handleCheck(attribute.title, value)}
                  className="w-5 h-5 cursor-pointer"
                />
                <label
                  htmlFor={`filter-${index}-${idx}`}
                  className={clsx("font-semibold text-[14px] cursor-pointer", {
                    "text-black": checkedItems[attribute.title]?.[value],
                    "text-black/60": !checkedItems[attribute.title]?.[value],
                  })}
                >
                  {value}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  }, [attributes, openFilter, checkedItems, toggleFilter]);

  return (
    <>
      {/* Mobile View */}
      <FiltersMobile onClose={closeDialog} />

      {/* *************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:block border rounded-lg sticky top-10">
        {attributes.length ? (
          renderedFilters
        ) : (
          <div className="text-center py-4">هیچ فیلتری وجود ندارد</div>
        )}
        {/* In-Stock Toggle Switch */}
        <label
          htmlFor="in-stock-toggle"
          className="flex items-center justify-between px-5 py-5 cursor-pointer hover:bg-gradient-to-l from-[#DFE3EF4F] to-white"
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
              id="in-stock-toggle"
              className="sr-only"
              checked={inStockOnly}
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
    </>
  );
}
