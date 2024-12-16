"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DialogContextProps {
  isDialogOpen: boolean;
  openDialog: (productId: string) => void;
  closeDialog: () => void;
  productId: string | null;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const openDialog = (id: string) => {
    setProductId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setProductId(null);
  };

  return (
    <DialogContext.Provider
      value={{ isDialogOpen, openDialog, closeDialog, productId }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
