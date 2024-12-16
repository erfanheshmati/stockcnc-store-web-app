"use client";

import { BASE_URL } from "@/lib/constants";
import { FooterBrand, FooterProduct, FooterQuickAccess } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Links() {
  const [footerQuickAccess, setFooterQuickAccess] = useState<
    FooterQuickAccess[]
  >([]);
  const [footerBrands, setFooterBrands] = useState<FooterBrand[]>([]);
  const [footerProducts, setFooterProducts] = useState<FooterProduct[]>([]);

  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/web-text-plans`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setFooterQuickAccess(data.footerQuickAccess);
        setFooterProducts(data.footerProducts);
        setFooterBrands(data.footerBrands);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchFooterLinks();
  }, []);

  return (
    <div className="flex gap-16 lg:gap-8 xl:gap-16 z-10 md:mx-auto lg:mx-0">
      <div className="flex flex-col pt-1">
        <h2 className="text-white font-bold text-[15px]">
          انواع ماشین های سی ان سی
        </h2>
        <ul className="flex flex-col gap-4 mt-6">
          {footerProducts.slice(0, 4).map((item) => (
            <li
              key={item._id}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.url}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col pt-1">
        <ul className="flex flex-col gap-4 mt-12">
          {footerProducts.slice(4, 8).map((item) => (
            <li
              key={item._id}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.url}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col pt-1">
        <h2 className="text-white font-bold text-[15px]">
          انواع برند دستگاه ها
        </h2>
        <ul className="flex flex-col gap-4 mt-6 ">
          {footerBrands.slice(0, 4).map((item) => (
            <li
              key={item._id}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.url}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col pt-1">
        <h2 className="text-white font-bold text-[15px]">دسترسی سریع</h2>
        <ul className="flex flex-col gap-4 mt-6">
          {footerQuickAccess.slice(0, 4).map((item) => (
            <li
              key={item._id}
              className="text-white/75 text-[13px] hover:text-white hover:underline"
            >
              <Link href={item.url}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
