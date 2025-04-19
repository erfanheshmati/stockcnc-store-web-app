"use client";

import React, { useEffect, useState } from "react";
import HelpCard from "./help-card";
import { Blog } from "@/lib/types";
import { API_URL } from "@/lib/constants";

export default function Helps() {
  const [helpsData, setHelpsData] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const res = await fetch(`${API_URL}/blog?tutorial=true`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setHelpsData(data.docs);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchBlogsData();
  }, []);

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center w-full bg-[#618FB61A]/10">
        <div className="flex items-center justify-start gap-1 mt-6">
          <h2 className="text-primary font-bold text-[22px]">راهنمای خرید</h2>
          <h2 className="text-primary font-semibold text-[15px]">
            دستگاه های سی ان سی
          </h2>
        </div>
        <div
          className="wrapper my-6 h-[300px] overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {helpsData.map((data, index) => (
            <React.Fragment key={data._id}>
              <HelpCard data={data} />
              <hr
                className={`${
                  index === helpsData.length - 1 ? "hidden" : ""
                } flex items-center justify-end mr-20`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ********************************************************************************************************************* */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col w-6/12 lg:w-5/12 xl:w-4/12">
        <div className="flex items-center justify-start gap-1">
          <h2 className="text-primary font-bold text-[24px]">راهنمای خرید</h2>
          <h2 className="text-primary font-semibold text-[17px]">
            دستگاه های سی ان سی
          </h2>
        </div>
        <hr className="mt-6" />
        <div className="flex flex-col gap-4 mt-6 pr-1 pl-6 h-[370px] overflow-auto custom-scroll">
          {helpsData.map((data, index) => (
            <React.Fragment key={data._id}>
              <HelpCard data={data} />
              <hr
                className={`${
                  index === helpsData.length - 1 ? "hidden" : ""
                } flex items-center justify-end mr-20`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
