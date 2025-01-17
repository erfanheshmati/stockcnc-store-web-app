"use client";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { ColorsProvider } from "@/contexts/color-context";
import { DialogProvider } from "@/contexts/dialog-context";
import { ToastContainer } from "react-toastify";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ColorsProvider>
      <DialogProvider>
        <div className="flex flex-col">
          <Header />
          <ToastContainer className="min-w-fit" />
          <main className="flex-1 pt-[58px] md:pt-[76px]">{children}</main>
          <Footer />
        </div>
      </DialogProvider>
    </ColorsProvider>
  );
}
