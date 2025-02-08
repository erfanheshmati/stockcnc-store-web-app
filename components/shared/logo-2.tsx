import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo2({ className }: { className: string }) {
  return (
    <Link href="/">
      <img
        src="/icons/stock-cnc.png"
        alt="Logo"
        className={cn("w-[40px]", className)}
      />
    </Link>
  );
}
