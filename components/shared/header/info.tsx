"use client";

import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";

export default function Info() {
  const [supportPhone, setSupportPhone] = useState<string | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupportPhone = async () => {
      try {
        const res = await fetch(`${BASE_URL}/web-text-plans`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setSupportPhone(data.supportTelephone);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchSupportPhone();
  }, []);

  return (
    <>
      {/* Mobile Info */}
      <div className="md:hidden flex items-center text-white z-[9]">
        <Link href="tel:+982122954000">
          <BiSupport size={24} />
        </Link>
      </div>

      {/* Desktop Info */}
      <div className="hidden md:flex text-white hover:text-white/70 z-10 transition-all duration-300 ease-in-out">
        <Link href="tel:+982122954000" className="flex items-center gap-4 ">
          <span className="font-bold text-[14px]">تلفن مشاوره</span>
          {error && <span className="text-red-500 pt-1">{error}</span>}
          <span className="font-bold text-[18px]">
            {!error && supportPhone}
          </span>
        </Link>
      </div>
    </>
  );
}
