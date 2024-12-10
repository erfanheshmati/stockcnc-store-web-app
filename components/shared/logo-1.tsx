import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Logo1({ className }: { className: string }) {
  return (
    <Link href="/">
      <Image
        src="/icons/logo-1.png"
        alt="Logo Icon"
        width={282}
        height={74}
        className={cn("w-[100px]", className)}
      />
    </Link>
  );
}
