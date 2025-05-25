"use client";

import FiltersMobile from "@/app/(root)/archiv/filters-mobile";
import { useEffect } from "react";

interface DialogBoxFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogBoxFilters: React.FC<DialogBoxFiltersProps> = ({
  isOpen,
  onClose,
}) => {
  // Prevent scrolling when pop-up is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 px-4 sm:px-0 z-20">
      <FiltersMobile onClose={onClose} />
    </div>
  ) : null;
};

export default DialogBoxFilters;
