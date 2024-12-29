"use client";

import BlogCard from "@/components/shared/home/blog-card";
import { Blog } from "@/lib/types";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ViewGrid({
  blogsData,
  currentPage,
  totalPages,
  totalDocs,
  limit,
}: {
  blogsData: Blog[];
  currentPage: number;
  totalPages: number;
  totalDocs: number;
  limit: number;
}) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-8 pt-8">
      <div className="grid grid-cols-3 gap-x-5 gap-y-10">
        {blogsData.length ? (
          blogsData.map((blog: Blog) => <BlogCard key={blog._id} data={blog} />)
        ) : (
          <div className="text-secondary text-sm">
            مطلبی برای نمایش وجود ندارد
          </div>
        )}
      </div>

      {/* Pagination */}
      {blogsData.length > 0 && (
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
            نمایش {limit * (currentPage - 1) + 1} تا{" "}
            {Math.min(limit * currentPage, totalDocs)} از {totalDocs} مورد
          </div>
        </div>
      )}
    </div>
  );
}
