"use client";

import ProductCardMobile from "./product-card-mobile";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useFiltersLogic } from "@/contexts/filter-logic-context";
import { useRouter, useSearchParams } from "next/navigation";

export default function ViewMobile({
  currentPage,
  // totalPages,
  // totalDocs,
  limit,
  search,
  category,
  sort,
}: {
  currentPage: number;
  // totalPages: number;
  // totalDocs: number;
  limit: number;
  search: string;
  category: string;
  sort: string;
}) {
  const { filteredProducts } = useFiltersLogic();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract `totalDocs` and `totalPages` from query parameters
  const totalDocs = parseInt(searchParams.get("totalDocs") || "0", 10);
  const totalPages = parseInt(searchParams.get("totalPages") || "0", 10);

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());
    searchParams.set("category", category.toString());
    searchParams.set("q", search.toString());
    searchParams.set("sort", sort.toString());
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 pt-4 pb-8">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCardMobile key={product._id} product={product} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-secondary text-sm mt-6">
            محصولی با این مشخصات وجود ندارد
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <>
            <div
              className="flex justify-center items-center gap-3 mt-6"
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
    </div>
  );
}
