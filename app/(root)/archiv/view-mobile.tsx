"use client";

import ProductCardMobile from "./product-card-mobile";
import { useFiltersLogic } from "@/contexts/filter-logic-context";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { BASE_URL } from "@/lib/constants";

export default function ViewMobile() {
  const { filteredProducts, totalDocs, setFilteredProducts, totalPages } =
    useFiltersLogic();
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams(); // Access current query params

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      // Append current search params to the API request
      const query = searchParams.toString();
      const response = await fetch(`${BASE_URL}/product?page=${page}&${query}`);
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

  return (
    <div>
      <div className="flex flex-col gap-10 pt-4 pb-8">
        {visibleProducts.length ? (
          visibleProducts.map((product) => (
            <ProductCardMobile key={product._id} product={product} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-secondary text-sm mt-6">
            محصولی با این مشخصات وجود ندارد
          </div>
        )}

        {/* Load More Button */}
        {visibleProducts.length < totalDocs && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-secondary/10 text-secondary/90 rounded-md px-6 py-3 text-sm font-semibold"
              disabled={loading}
            >
              {loading ? "در حال بارگذاری..." : "مشاهده محصولات بیشتر"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
