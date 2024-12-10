"use client";

import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-primary font-bold text-3xl">صفحه یافت نشد</h1>
        <p className="text-secondary font-medium text-[16px]">
          چنین صفحه ای با این آدرس وجود ندارد!
        </p>
      </div>
      <button
        className="bg-primary rounded-lg py-4 px-8 hover:opacity-90"
        onClick={() => (window.location.href = "/")}
      >
        <span className="text-white font-semibold">صفحه اصلی</span>
      </button>
    </div>
  );
}
