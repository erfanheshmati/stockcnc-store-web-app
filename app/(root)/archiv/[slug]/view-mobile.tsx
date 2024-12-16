"use client";

import ProductCardMobile from "./product-card-mobile";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Product } from "@/lib/types";

export default function ViewMobile({
  productsList,
}: {
  productsList: Product[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; // Number of products per page

  // Calculate total pages
  const totalPages = Math.ceil(productsList.length / productsPerPage);

  // Get products for current page
  const currentProducts = productsList.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {currentProducts.map((product) => (
          <ProductCardMobile key={product._id} product={product} />
        ))}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-6" dir="ltr">
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
          نمایش {productsPerPage * (currentPage - 1) + 1} تا{" "}
          {Math.min(productsPerPage * currentPage, productsList.length)} از{" "}
          {productsList.length} مورد
        </div>
      </div>
    </div>
  );
}
