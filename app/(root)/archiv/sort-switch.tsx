"use client";

import { useFiltersLogic } from "@/contexts/filter-logic-context";
import SortMobile from "./sort-mobile";
import { useDialog } from "@/contexts/dialog-context";

export default function SortSwitch() {
  const { sortOption, setSortOption } = useFiltersLogic();
  const { closeDialog } = useDialog();

  return (
    <>
      <SortMobile onClose={closeDialog} />

      <div className="flex items-center gap-4">
        <span
          className={`font-medium text-[14px] hover:font-semibold hover:text-primary cursor-pointer ${
            sortOption === "latest"
              ? "text-primary font-semibold"
              : "text-secondary"
          }`}
          onClick={() => setSortOption("latest")}
        >
          جدیدترین
        </span>
        <span
          className={`font-medium text-[14px] hover:font-semibold hover:text-primary cursor-pointer ${
            sortOption === "mostViewed"
              ? "text-primary font-semibold"
              : "text-secondary"
          }`}
          onClick={() => setSortOption("mostViewed")}
        >
          پربازدیدترین
        </span>
      </div>
    </>
  );
}
