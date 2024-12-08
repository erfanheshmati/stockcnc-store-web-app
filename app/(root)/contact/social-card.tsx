import { Social } from "@/lib/types";
import Link from "next/link";

export default function SocialCard({ data }: { data: Social }) {
  return (
    <Link href={data.href}>
      <div className="border bg-gradient-to-b from-secondary/10 to-white px-6 py-5 rounded-xl text-secondary hover:bg-none hover:bg-[#8E98AD] hover:text-white transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[14px]">{data.title}</span>
            <span className="text-[12px]">{data.description}</span>
          </div>
          <div className="flex items-center">{data.icon}</div>
        </div>
      </div>
    </Link>
  );
}
