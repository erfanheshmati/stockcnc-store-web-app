"use client";

import { useDialog } from "@/contexts/dialog-context";

export default function PriceInquiryButton() {
  const { openDialog } = useDialog();

  return (
    <>
      {/* Mobile View */}
      <button
        onClick={openDialog}
        className="block md:hidden fixed bottom-0 w-full py-4 z-10 text-white font-bold text-[14px] bg-[#00D45A]"
      >
        استعلام فوری قیمت
      </button>

      {/* ************************************************************************************************************************* */}

      {/* Desktop View */}
      <button
        onClick={openDialog}
        className="hidden md:block text-white font-bold text-[17px] bg-[#00D45A] py-6 px-10 rounded-md hover:opacity-80 transition-all duration-300 ease-in-out"
      >
        استعلام فوری قیمت
      </button>
    </>
  );
}
