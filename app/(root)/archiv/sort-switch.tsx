"use client";

import SortMobile from "./sort-mobile";
import { useDialog } from "@/contexts/dialog-context";

export default function SortSwitch({
  // currentPage,
  // limit,
  // search,
  // category,
  // view,
  sort,
}: {
  // currentPage: number;
  // limit: number;
  // search: string;
  // category: string;
  // view: string;
  sort: string;
}) {
  const { closeDialog } = useDialog();

  const handleSortChange = (sortType: string = sort) => {
    const searchParams = new URLSearchParams(window.location.search);
    // searchParams.set("page", currentPage.toString());
    // searchParams.set("limit", limit.toString());
    // searchParams.set("category", category.toString());
    // searchParams.set("q", search.toString());
    // searchParams.set("view", view.toString());
    searchParams.set("sort", sortType.toString());
    // router.push(`?${searchParams.toString()}`);
    window.location.href = `?${searchParams.toString()}`;
  };

  return (
    <>
      <SortMobile
        onClose={closeDialog}
        // currentPage={currentPage}
        // limit={limit}
        // search={search}
        // category={category}
        // view={view}
        // sort={sort}
      />

      <div className="flex items-center gap-4">
        <span
          className={`font-medium text-[14px] hover:font-semibold hover:text-primary cursor-pointer ${
            sort === "latest" ? "text-primary font-semibold" : "text-secondary"
          }`}
          onClick={() => handleSortChange("latest")}
        >
          جدیدترین
        </span>
        <span
          className={`font-medium text-[14px] hover:font-semibold hover:text-primary cursor-pointer ${
            sort === "mostViewed"
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
