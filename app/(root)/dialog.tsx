"use client";

import DialogBox from "@/components/shared/dialog-box";
import { useDialog } from "@/contexts/dialog-context";

export default function Dialog() {
  const { isDialogOpen, closeDialog } = useDialog();
  return <DialogBox isOpen={isDialogOpen} onClose={closeDialog} />;
}
