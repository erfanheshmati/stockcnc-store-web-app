"use client";

import { useDialog } from "@/contexts/dialog-context";
import { Product } from "@/lib/types";

export default function PriceInquiryButton({ data }: { data: Product }) {
  const { openDialog } = useDialog();

  return (
    <>
      {/* Mobile View */}
      <button
        onClick={() => openDialog(data._id)}
        className="block md:hidden fixed bottom-0 w-full py-4 z-[19] text-white font-bold text-[14px] bg-[#00D45A]"
      >
        استعلام فوری قیمت
      </button>

      {/* ************************************************************************************************************************* */}

      {/* Desktop View */}
      <button
        onClick={() => openDialog(data._id)}
        className="hidden md:block text-white font-bold text-[17px] bg-[#00D45A] py-6 px-10 rounded-md hover:opacity-80 transition-all duration-300 ease-in-out"
      >
        استعلام فوری قیمت
      </button>
    </>
  );
}
