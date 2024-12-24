"use client";

import { useFilter } from "@/contexts/filter-popup-context";
import { useSort } from "@/contexts/sort-popup-context";
import React from "react";
import { BiFilter, BiFilterAlt } from "react-icons/bi";

export default function ButtonsMobile() {
  const { openFilter } = useFilter();
  const { openSort } = useSort();

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={openSort}
        className="flex items-center gap-3 bg-secondary/10 rounded-xl px-6 py-4"
      >
        <span className="text-secondary font-semibold text-[12px]">
          مرتب سازی
        </span>
        <BiFilter size={18} className="text-secondary" />
      </button>
      <button
        onClick={openFilter}
        className="flex items-center gap-3 bg-secondary/10 rounded-xl px-7 py-4"
      >
        <span className="text-secondary font-semibold text-[12px]">
          فیلترها
        </span>
        <BiFilterAlt size={16} className="text-secondary" />
      </button>
    </div>
  );
}
