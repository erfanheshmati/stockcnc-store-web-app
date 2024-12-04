import { Help } from "@/lib/types";
import Image from "next/image";

export default function HelpCard({ data }: { data: Help }) {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-4 my-2">
        <div>
          <Image src={data.image} alt="Help Image" width={95} height={85} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-primary font-semibold text-[13px] line-clamp-1">
            {data.title}
          </h3>
          <div className="text-[#A1AEBB] text-[10px] line-clamp-2 leading-4">
            {data.description}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-4">
        <div>
          <Image src={data.image} alt="Help Image" width={95} height={85} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-primary font-bold text-[14px] line-clamp-1">
            {data.title}
          </h3>
          <div className="text-[#A1AEBB] text-[10px] line-clamp-2 leading-4">
            {data.description}
          </div>
        </div>
      </div>
    </>
  );
}
