"use client";

import BlogCard from "@/components/shared/home/blog-card";
import { Blog } from "@/lib/types";
import { Divide } from "lucide-react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ViewGrid({ blogsData }: { blogsData: Blog[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9; // Number of blogs per page

  // Calculate total pages
  const totalPages = Math.ceil(blogsData.length / blogsPerPage);

  // Get blogs for current page
  const currentBlogs = blogsData.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-8 pt-8">
      <div className="grid grid-cols-3 gap-x-5 gap-y-10">
        {currentBlogs.length ? (
          currentBlogs.map((blog: Blog) => (
            <BlogCard key={blog._id} data={blog} />
          ))
        ) : (
          <div className="text-secondary text-sm">
            مطلبی برای نمایش وجود ندارد
          </div>
        )}
      </div>

      {/* Pagination */}
      {currentBlogs.length > 0 && (
        <div className="flex flex-col gap-2 mx-auto">
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
            نمایش {blogsPerPage * (currentPage - 1) + 1} تا{" "}
            {Math.min(blogsPerPage * currentPage, blogsData.length)} از{" "}
            {blogsData.length} مورد
          </div>
        </div>
      )}
    </div>
  );
}
