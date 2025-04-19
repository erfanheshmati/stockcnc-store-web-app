"use client";

import { API_URL, IMAGE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo1({ className }: { className: string }) {
  const [logo, setLogo] = useState<string | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      // Check localStorage first
      const cachedLogo = localStorage.getItem("logoCache");
      if (cachedLogo) {
        const { data, timestamp } = JSON.parse(cachedLogo);
        const isCacheValid = Date.now() - timestamp < 24 * 60 * 60 * 1000; // 24h
        if (isCacheValid) {
          setLogo(data);
          return;
        }
      }
      try {
        const res = await fetch(`${API_URL}/web-text-plans`, {
          cache: "force-cache", // Browser caching
        });
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        // Update state and cache
        setLogo(data.logo);
        localStorage.setItem(
          "logoCache",
          JSON.stringify({
            data: data.logo,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchLogo();
  }, []);

  return (
    <Link href="/">
      {error && <p className="text-red-500 pt-1">{error}</p>}

      {!error && (
        <img
          src={`${IMAGE_URL}/${logo}`}
          alt="Logo Icon"
          className={cn("w-[100px]", className)}
        />
      )}
    </Link>
  );
}
