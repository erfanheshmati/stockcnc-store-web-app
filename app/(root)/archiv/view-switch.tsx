"use client";

import { useView } from "@/contexts/view-context";
import { MdViewList, MdViewModule } from "react-icons/md";

export default function ViewSwitch() {
  const { viewType, setViewType } = useView();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setViewType("grid")}
        className={`p-2 rounded hover:opacity-80 transition-all duration-300 ease-in-out ${
          viewType === "grid" ? "bg-primary text-white" : "bg-secondary/15"
        }`}
      >
        <MdViewModule
          size={20}
          className={`${
            viewType === "grid" ? "text-white" : "text-secondary/60"
          }`}
        />
      </button>
      <button
        onClick={() => setViewType("list")}
        className={`p-2 rounded hover:opacity-80 transition-all duration-300 ease-in-out ${
          viewType === "list" ? "bg-primary text-white" : "bg-secondary/15"
        }`}
      >
        <MdViewList
          size={20}
          className={`${
            viewType === "list" ? "text-white" : "text-secondary/70"
          }`}
        />
      </button>
    </div>
  );
}
