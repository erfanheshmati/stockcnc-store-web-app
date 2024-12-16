"use client";

import DialogBoxInquiry from "@/components/shared/dialog-box-inquiry";
import { useDialog } from "@/contexts/dialog-context";

export default function DialogInquiry() {
  const { isDialogOpen, closeDialog } = useDialog();

  return <DialogBoxInquiry isOpen={isDialogOpen} onClose={closeDialog} />;
}
