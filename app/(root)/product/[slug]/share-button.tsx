"use client";

import { notifySuccess } from "@/lib/toast";
import { BiShare } from "react-icons/bi";

export default function ShareButton() {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        notifySuccess("لینک صفحه در کلیپ بورد کپی شد");
      }}
      className="flex items-center gap-2 text-primary font-bold text-[14px] hover:opacity-70 z-10 transition-all duration-300 ease-in-out"
    >
      به اشتراک گذاری
      <BiShare size={22} />
    </button>
  );
}
