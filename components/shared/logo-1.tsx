"use client";

import { BASE_URL, IMAGE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo1({ className }: { className: string }) {
  const [logo, setLogo] = useState<string | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(`${BASE_URL}/web-text-plans`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setLogo(data.logo);
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
        <Image
          src={`${IMAGE_URL}/${logo}`}
          alt="Logo Icon"
          width={282}
          height={74}
          className={cn("w-[100px]", className)}
        />
      )}
    </Link>
  );
}
