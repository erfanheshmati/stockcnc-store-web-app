"use client";

import { MdViewList, MdViewModule } from "react-icons/md";

export default function ViewSwitch({
  currentPage,
  limit,
  search,
  category,
  view,
}: {
  currentPage: number;
  limit: number;
  search: string;
  category: string;
  view: string;
}) {
  const handleViewChange = (viewType: string = view) => {
    window.history.pushState(
      null,
      "",
      `?page=${currentPage}&limit=${limit}&category=${category}&search=${search}&view=${viewType}`
    );
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleViewChange("grid")}
        className={`p-2 rounded hover:opacity-80 transition-all duration-300 ease-in-out ${
          view === "grid" ? "bg-primary text-white" : "bg-secondary/15"
        }`}
      >
        <MdViewModule
          size={20}
          className={`${view === "grid" ? "text-white" : "text-secondary/60"}`}
        />
      </button>
      <button
        onClick={() => handleViewChange("list")}
        className={`p-2 rounded hover:opacity-80 transition-all duration-300 ease-in-out ${
          view === "list" ? "bg-primary text-white" : "bg-secondary/15"
        }`}
      >
        <MdViewList
          size={20}
          className={`${view === "list" ? "text-white" : "text-secondary/70"}`}
        />
      </button>
    </div>
  );
}
