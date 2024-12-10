import { brandsData } from "@/lib/data";
import BrandCard from "./brand-card";

export default function Brands() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center w-full">
        <div className="flex items-center justify-start gap-1">
          <span className="text-primary font-bold text-[22px]">برند های</span>
          <span className="text-primary font-semibold text-[15px]">
            سی ان سی استوک
          </span>
        </div>
        <ul
          className="flex items-center gap-4 min-h-[50px] w-full px-4 overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {brandsData.map((data) => (
            <li
              key={data.id}
              className="min-w-fit p-4 text-[#6B7F8E] text-[12px] bg-[#F1F3F8] rounded-md cursor-pointer mt-4"
            >
              {data.title}
            </li>
          ))}
        </ul>
      </div>

      {/* ******************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col">
        <div className="flex items-center justify-start gap-1">
          <span className="text-primary font-bold text-[24px]">برند های</span>
          <span className="text-primary font-semibold text-[17px]">
            سی ان سی استوک
          </span>
        </div>
        <hr className="mt-6 ml-8" />
        <div className="flex flex-col gap-4 pt-10 pb-2 h-[530px] overflow-auto custom-scroll px-1 pl-6">
          {brandsData.map((data) => (
            <BrandCard data={data} key={data.id} />
          ))}
        </div>
      </div>
    </>
  );
}
