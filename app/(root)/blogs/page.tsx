import React from "react";
import BannerThin from "@/components/shared/banner-thin";
import { BASE_URL } from "@/lib/constants";
import DialogInquiry from "../dialog-inquiry";
import ViewGrid from "./view-grid";
import { Blog } from "@/lib/types";
import HelpCard from "@/components/shared/home/help-card";
import ViewMobile from "./view-mobile";

export async function generateMetadata() {
  const res = await fetch(`${BASE_URL}/web-text-plans`);
  const info = await res.json();

  if (!res.ok) {
    return {
      title: "خطا در دریافت اطلاعات",
    };
  }

  return {
    title: `${info.archiveBlogSeoTitle} - ${info.title}`,
    description: info.archiveBlogMetaData,
  };
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
  };
}) {
  const pageQuery = parseInt(searchParams?.page || "1", 10);
  const limitQuery = parseInt(searchParams?.limit || "10", 10);

  const res1 = await fetch(`${BASE_URL}/web-text-plans`);
  const res2 = await fetch(
    `${BASE_URL}/blog?page=${pageQuery}&limit=${limitQuery}`
  );

  if (!res1.ok || !res2.ok) throw new Error("خطا در دریافت اطلاعات!");

  const info = await res1.json();
  const data = await res2.json();

  const blogsData = data.docs;
  const totalDocs = data.totalDocs;
  const totalPages = data.totalPages;

  return (
    <>
      {/* Pop-Ups */}
      <DialogInquiry />

      {/* Mobile View */}
      <div className="block md:hidden relative">
        <BannerThin />
        {/* Heading */}
        <div className="absolute w-full flex justify-center top-10">
          <h2 className="text-primary font-bold text-[20px]">
            {info.archiveBlogTitle}
          </h2>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-8 pt-8 wrapper min-h-screen">
          <ViewMobile
            blogsData={blogsData}
            currentPage={pageQuery}
            totalPages={totalPages}
            totalDocs={totalDocs}
            limit={limitQuery}
          />
        </div>
      </div>

      {/* ****************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:block relative">
        <BannerThin />
        {/* Content */}
        <div className="wrapper flex gap-10 lg:gap-20 py-12">
          {/* Helps */}
          <div className="hidden lg:flex flex-col gap-8 w-3/12">
            <h3 className="text-secondary font-semibold text-[20px] pt-1">
              راهنمای خرید
            </h3>
            <div className="flex flex-col gap-4 sticky top-10">
              {blogsData
                .filter((blog: Blog) => blog.tutorial === true)
                .map((blog: Blog, index: number, filteredBlogs: Blog[]) => (
                  <React.Fragment key={blog._id}>
                    <HelpCard data={blog} />
                    <hr
                      className={`${
                        index === filteredBlogs.length - 1 ? "hidden" : ""
                      } flex items-center justify-end mr-20`}
                    />
                  </React.Fragment>
                ))}
            </div>
          </div>
          {/* Product View */}
          <div className="flex flex-col w-full lg:w-9/12 min-h-screen">
            {/* Heading */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-primary font-bold text-[24px]">
                  {info.archiveBlogTitle}
                </h2>
              </div>
            </div>
            <ViewGrid
              blogsData={blogsData}
              currentPage={pageQuery}
              totalPages={totalPages}
              totalDocs={totalDocs}
              limit={limitQuery}
            />
          </div>
        </div>
      </div>
    </>
  );
}
