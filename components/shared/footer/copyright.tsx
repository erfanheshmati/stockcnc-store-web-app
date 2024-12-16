"use client";

import { BASE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function Copyright() {
  const [title, setTitle] = useState<string | null>();

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const res = await fetch(`${BASE_URL}/web-text-plans`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setTitle(data.title);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchTitle();
  }, []);

  return (
    <div className="text-white font-bold text-[11px] md:text-[13px]">
      تمامی حقوق این وب سایت برای {title} محفوظ می باشد
    </div>
  );
}
