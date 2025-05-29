import React from "react";
import { permanentRedirect, redirect } from "next/navigation";
import BannerThin from "@/components/shared/banner-thin";
import { API_URL, APP_URL } from "@/lib/constants";
import DialogInquiry from "../dialog-inquiry";
import ViewGrid from "./view-grid";
import { Blog } from "@/lib/types";
import HelpCard from "@/components/shared/home/help-card";
import ViewMobile from "./view-mobile";

export async function generateMetadata() {
  const res = await fetch(`${API_URL}/web-text-plans`);

  const info = await res.json();

  if (!res.ok) {
    return {
      title: "خطا در دریافت اطلاعات",
    };
  }

  // Use existing canonical or fallback to current URL
  const canonicalUrl = info.archiveBlogCanonical || `${APP_URL}/blogs`;

  return {
    title: `${info.archiveBlogSeoTitle} - ${info.title}`,
    description: info.archiveBlogMetaData,
    alternates: {
      canonical: canonicalUrl,
    },
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
  const limitQuery = parseInt(searchParams?.limit || "9", 10);

  const res1 = await fetch(`${API_URL}/web-text-plans`);
  const res2 = await fetch(`${API_URL}/blog?tutorial=true`, {
    cache: "no-store",
  });
  const res3 = await fetch(
    `${API_URL}/blog?page=${pageQuery}&limit=${limitQuery}`,
    {
      cache: "no-store",
    }
  );

  if (!res1.ok || !res2.ok) throw new Error("خطا در دریافت اطلاعات!");

  const info = await res1.json();
  const data1 = await res2.json();
  const data2 = await res3.json();

  // Check redirection
  if (info.archiveBlogRedirectStatus && info.archiveBlogNewUrl) {
    if (Number(info.archiveBlogRedirectStatus) === 301) {
      permanentRedirect(info.archiveBlogNewUrl);
    } else {
      redirect(info.archiveBlogNewUrl);
    }
  }

  const helpsData = data1.docs;
  const blogsData = data2.docs;
  const totalDocs = data2.totalDocs;
  const totalPages = data2.totalPages;

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
          <div className="md:hidden lg:flex flex-col w-3/12">
            <div className="flex flex-col gap-8 sticky top-24">
              <h3 className="text-secondary font-semibold text-[20px] pt-1">
                راهنمای خرید
              </h3>
              <div className="flex flex-col gap-4">
                {helpsData.map(
                  (blog: Blog, index: number, filteredBlogs: Blog[]) => (
                    <React.Fragment key={blog._id}>
                      <HelpCard data={blog} />
                      <hr
                        className={`${
                          index === filteredBlogs.length - 1 ? "hidden" : ""
                        } flex items-center justify-end mr-20`}
                      />
                    </React.Fragment>
                  )
                )}
              </div>
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
