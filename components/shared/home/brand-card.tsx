import { IMAGE_URL } from "@/lib/constants";
import { Brand } from "@/lib/types";
import Image from "next/image";

export default function BrandCard({ data }: { data: Brand }) {
  return (
    <div className="flex items-center justify-between w-[287px] min-h-[97px] rounded-2xl shadow px-6 cursor-pointer border border-gray-200/70 hover:bg-gradient-to-tl from-[#f2f3f5] via-[#fff] to-[#fff]">
      <div className="flex flex-col gap-2">
        <h3 className="text-[#1F2329] font-bold text-[16px]">{data.title}</h3>
        <span className="text-[#A1AEBB] text-[12px]">{data.summary}</span>
      </div>
      <div>
        <Image
          src={`${IMAGE_URL}/${data.logo}`}
          alt={data.title}
          width={85}
          height={15}
        />
      </div>
    </div>
  );
}
