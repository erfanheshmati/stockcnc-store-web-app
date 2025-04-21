import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo3({ className }: { className: string }) {
  return (
    <Link href="/">
      <img
        src="/icons/stock-cnc.png"
        alt="Logo"
        className={cn("w-[100px]", className)}
      />
    </Link>
  );
}
