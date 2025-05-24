import { IMAGE_URL } from "@/lib/constants";
import { Brand } from "@/lib/types";
import Link from "next/link";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex flex-col items-center gap-5">
        <figure className="flex items-center justify-center w-full h-[80px] border rounded-lg bg-gradient-to-l from-[#f2f3f5]/70 via-[#fff] via-30% to-[#fff]">
          <img
            src={`${IMAGE_URL}/${brand.logo}`}
            alt={brand.title}
            className="w-[100px] h-auto"
          />
        </figure>
        <h3 className="text-[#1F2329] font-bold text-[18px]">{brand.title}</h3>
        <Link
          href={`/product/${brand._id}`}
          target="_blank"
          className="flex items-center justify-center w-full h-[45px] md:h-[55px] rounded-lg text-black hover:text-white border hover:border-none hover:bg-primary transition-colors duration-300 ease-in-out"
        >
          <span className="font-[500] text-[14px]">مشاهده محصولات برند</span>
        </Link>
      </div>
    </div>
  );
}
