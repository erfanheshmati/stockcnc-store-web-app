"use client";

import { useFiltersLogic } from "@/contexts/filter-logic-context";
import { BiX } from "react-icons/bi";

export default function SortMobile({ onClose }: { onClose: () => void }) {
  const { sortOption, setSortOption } = useFiltersLogic();

  return (
    <div
      className="md:hidden flex flex-col items-center w-full max-w-sm sm:max-w-md p-6 shadow-2xl rounded-2xl bg-white overflow-y-auto relative"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div className="text-primary font-bold text-[16px]">مرتب سازی</div>
      <div className="absolute right-5 top-5">
        <button onClick={onClose}>
          <BiX size={20} className="text-secondary/60" />
        </button>
      </div>
      <div className="mt-4 w-full">
        <div className="flex flex-col gap-3">
          <span
            className={`border rounded-lg p-4 font-medium text-[14px] ${
              sortOption === "latest"
                ? "text-white bg-primary font-semibold"
                : "text-secondary"
            }`}
            onClick={() => setSortOption("latest")}
          >
            جدیدترین
          </span>
          <span
            className={`border rounded-lg p-4 font-medium text-[14px] ${
              sortOption === "mostViewed"
                ? "text-white bg-primary font-semibold"
                : "text-secondary"
            }`}
            onClick={() => setSortOption("mostViewed")}
          >
            پربازدیدترین
          </span>
        </div>
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
