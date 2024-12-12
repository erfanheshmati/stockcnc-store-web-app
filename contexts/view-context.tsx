"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ViewContextProps {
  viewType: string;
  setViewType: React.Dispatch<React.SetStateAction<string>>;
}

const ViewContext = createContext<ViewContextProps | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [viewType, setViewType] = useState<string>("list");

  return (
    <ViewContext.Provider value={{ viewType, setViewType }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = (): ViewContextProps => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};
