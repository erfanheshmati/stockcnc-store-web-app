"use client";

import React, { useEffect, useState } from "react";
import Logo1 from "../logo-1";
import { BASE_URL } from "@/lib/constants";

export default function About() {
  const [aboutUs, setAboutUs] = useState<string | null>();
  const [title, setTitle] = useState<string | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterAboutData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/web-text-plans`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setAboutUs(data.footerAboutUs);
        setTitle(data.title);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchFooterAboutData();
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-1/3 z-10">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-[15px]">درباره {title}</h2>
        <Logo1 className="w-[130px]" />
      </div>
      {error && <p className="text-red-500 text-center w-full">{error}</p>}
      {!error && (
        <p className="text-white/75 font-light text-[13px] leading-9 mt-4 text-justify line-clamp-4">
          {aboutUs}
        </p>
      )}
    </div>
  );
}
