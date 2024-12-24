"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AccordionContextProps {
  openIndex: number | null;
  toggleAccordion: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextProps | undefined>(
  undefined
);

export const AccordionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggleAccordion }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordion = (): AccordionContextProps => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within a AccordionProvider");
  }
  return context;
};
