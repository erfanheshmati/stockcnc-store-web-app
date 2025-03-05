"use client";

import { useEffect, useState } from "react";
import SortMobile from "./sort-mobile";
import { useDialog } from "@/contexts/dialog-context";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortSwitch({ sort }: { sort: string }) {
  const { closeDialog } = useDialog();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSort, setCurrentSort] = useState(sort || "latest");

  useEffect(() => {
    const urlSort = searchParams.get("sort");
    if (!urlSort) {
      setCurrentSort("latest");
    } else {
      setCurrentSort(urlSort);
    }
  }, [searchParams]);

  const handleSortChange = (sortType: string) => {
    if (sortType === currentSort) return; // Avoid unnecessary updates
    setCurrentSort(sortType); // Update state immediately
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("sort", sortType);
    router.push(`?${newParams.toString()}`);
    // window.location.href = `?${newParams.toString()}`;
  };

  return (
    <>
      <SortMobile onClose={closeDialog} />

      <div className="flex items-center gap-4">
        <span
          className={`font-medium text-[14px] hover:font-semibold hover:text-primary cursor-pointer ${
            currentSort === "latest"
              ? "text-primary font-semibold"
              : "text-secondary"
          }`}
          onClick={() => handleSortChange("latest")}
        >
          جدیدترین
        </span>
        <span
          className={`font-medium text-[14px] hover:font-semibold hover:text-primary cursor-pointer ${
            currentSort === "mostViewed"
              ? "text-primary font-semibold"
              : "text-secondary"
          }`}
          onClick={() => handleSortChange("mostViewed")}
        >
          پربازدیدترین
        </span>
      </div>
    </>
  );
}
