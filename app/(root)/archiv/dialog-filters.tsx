"use client";

import DialogBoxFilters from "@/components/shared/dialog-box-filters";
import { useFilter } from "@/contexts/filter-popup-context";

export default function DialogFilters() {
  const { isFilterOpen, closeFilter } = useFilter();
  return <DialogBoxFilters isOpen={isFilterOpen} onClose={closeFilter} />;
}
