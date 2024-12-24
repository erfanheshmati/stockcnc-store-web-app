"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SortContextProps {
  isSortOpen: boolean;
  openSort: () => void;
  closeSort: () => void;
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

export const SortProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const openSort = () => setIsSortOpen(true);
  const closeSort = () => setIsSortOpen(false);

  return (
    <SortContext.Provider value={{ isSortOpen, openSort, closeSort }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = (): SortContextProps => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
};
