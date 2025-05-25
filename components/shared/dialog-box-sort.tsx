"use client";

import SortMobile from "@/app/(root)/archiv/sort-mobile";
import { useEffect } from "react";

interface DialogBoxSortProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogBoxSort: React.FC<DialogBoxSortProps> = ({ isOpen, onClose }) => {
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
      <SortMobile onClose={onClose} />
    </div>
  ) : null;
};

export default DialogBoxSort;
