"use client";

import { useView } from "@/contexts/view-context";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCardGrid from "./product-card-grid";
import { useFiltersLogic } from "@/contexts/filter-logic-context";
import { useRouter } from "next/navigation";

export default function ViewGrid({
  currentPage,
  totalPages,
  totalDocs,
  limit,
  search,
  category,
  view,
}: {
  currentPage: number;
  totalPages: number;
  totalDocs: number;
  limit: number;
  search: string;
  category: string;
  view: string;
}) {
  const { filteredProducts } = useFiltersLogic();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());
    searchParams.set("category", category.toString());
    searchParams.set("q", search.toString());
    searchParams.set("view", view.toString());
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <>
      {view === "grid" && (
        <div
          className={`flex flex-col gap-4 pt-6 ${
            !filteredProducts.length && "h-full justify-center items-center"
          }`}
        >
          <div
            className={`${
              filteredProducts.length &&
              "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
            }`}
          >
            {filteredProducts.length ? (
              filteredProducts.map((data) => (
                <ProductCardGrid key={data._id} data={data} />
              ))
            ) : (
              <div className="text-secondary text-sm">
                محصولی با این مشخصات وجود ندارد
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <>
              <div
                className="flex items-center justify-center gap-3 mt-6"
                dir="ltr"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded hover:opacity-60 transition-all duration-300 ease-in-out ${
                    currentPage === 1
                      ? " text-gray-300 cursor-not-allowed"
                      : "text-gray-600"
                  }`}
                >
                  <IoIosArrowBack size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`flex items-center justify-center w-10 h-10 rounded hover:opacity-80 transition-all duration-300 ease-in-out ${
                      currentPage === index + 1
                        ? "bg-primary text-white"
                        : "bg-secondary/15 text-secondary"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded hover:opacity-60 transition-all duration-300 ease-in-out ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600"
                  }`}
                >
                  <IoIosArrowForward size={20} />
                </button>
              </div>
              <div className="flex items-center justify-center text-secondary text-sm">
                نمایش {limit * (currentPage - 1) + 1} تا{" "}
                {Math.min(limit * currentPage, totalDocs)} از {totalDocs} مورد
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
