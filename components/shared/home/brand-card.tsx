import { Brand } from "@/lib/types";
import Image from "next/image";

export default function BrandCard({ data }: { data: Brand }) {
  return (
    <div className="flex items-center justify-between w-[287px] h-[97px] rounded-2xl shadow px-6 cursor-pointer border border-gray-200/70 hover:bg-gradient-to-tl from-[#f2f3f5] via-[#fff] to-[#fff]">
      <div className="flex flex-col gap-2">
        <h3 className="text-[#1F2329] font-bold text-[16px]">{data.title}</h3>
        <span className="text-[#A1AEBB] text-[12px]">{data.description}</span>
      </div>
      <div>
        <Image src={data.logo} alt="Daewoo Logo" width={83} height={15} />
      </div>
    </div>
  );
}
