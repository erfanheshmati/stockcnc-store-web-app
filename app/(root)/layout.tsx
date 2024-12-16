import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { DialogProvider } from "@/contexts/dialog-context";
import { ToastContainer } from "react-toastify";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <DialogProvider>
      <div className="flex flex-col">
        <Header />
        <ToastContainer className="min-w-fit" />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </DialogProvider>
  );
}
