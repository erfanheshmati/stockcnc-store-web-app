"use client";

import DialogBoxSort from "@/components/shared/dialog-box-sort";
import { useSort } from "@/contexts/sort-popup-context";

export default function DialogSort() {
  const { isSortOpen, closeSort } = useSort();
  return <DialogBoxSort isOpen={isSortOpen} onClose={closeSort} />;
}
