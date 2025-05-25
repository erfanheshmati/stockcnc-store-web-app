"use client";

import ProductCardGrid from "./product-card-grid";
import { useFiltersLogic } from "@/contexts/filter-logic-context";
import { useSearchParams } from "next/navigation";
import { useView } from "@/contexts/view-context";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { API_URL } from "@/lib/constants";
import Loading from "@/app/loading";

export default function ViewGrid() {
  const {
    filteredProducts,
    totalDocs,
    setFilteredProducts,
    totalPages,
    isLoading,
  } = useFiltersLogic();
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { viewType } = useView();
  const searchParams = useSearchParams(); // Access current query params

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      // Append current search params to the API request
      const query = searchParams.toString();
      const response = await fetch(`${API_URL}/product?page=${page}&${query}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setVisibleProducts((prev) => [...prev, ...data.docs]); // Merge new products with existing ones
      setFilteredProducts([...visibleProducts, ...data.docs]); // Update the context products
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage); // Update the current page
      fetchProducts(nextPage); // Fetch the next batch of products
    }
  };

  useEffect(() => {
    setVisibleProducts(filteredProducts); // Sync with filtered products when filters change
  }, [filteredProducts]);

  if (isLoading) return <Loading className="justify-start mt-28" />;

  return (
    <>
      {viewType === "grid" && (
        <div
          className={`flex flex-col gap-14 pt-6 ${
            !visibleProducts.length && "h-full justify-start items-center"
          }`}
        >
          <div
            className={`${
              visibleProducts.length &&
              "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
            }`}
          >
            {visibleProducts.length ? (
              visibleProducts.map((data) => (
                <ProductCardGrid key={data._id} data={data} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-secondary">
                <img
                  src="/images/not-exist.png"
                  alt=""
                  className="w-[400px] h-auto"
                />
                محصولی با این مشخصات وجود ندارد
              </div>
            )}
          </div>

          {/* Load More Button */}
          {visibleProducts.length < totalDocs && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="bg-secondary/10 text-secondary/90 rounded-md px-6 py-3 text-sm font-semibold hover:opacity-80 transition-all duration-300 ease-in-out"
                disabled={loading}
              >
                {loading ? "در حال بارگذاری..." : "مشاهده محصولات بیشتر"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
