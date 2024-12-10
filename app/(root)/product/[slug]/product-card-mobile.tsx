import { Product } from "@/lib/types";
import Image from "next/image";

export default function ProductCardMobile({ product }: { product: Product }) {
  return (
    <div className="flex flex-col p-5 m-1 gap-2 rounded-xl shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center w-3/5 h-[110px] sm:h-[150px] rounded-xl bg-[#EFF1F6]">
          <Image
            src={product.image}
            alt="Product Image"
            width={130}
            height={70}
            className="h-[70px] object-cover"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-secondary/60 font-bold text-[12px] pt-1">
            {product.brand}
          </span>
          <Image src={product.icon} alt="Product Icon" width={18} height={18} />
        </div>
      </div>
      <div className="flex items-center">
        <h3 className="text-primary font-semibold text-[14px] leading-8">
          {product.title}
        </h3>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between">
        {product.tags.map((tag, index) => (
          <span
            key={index}
            className="text-secondary/90 font-semibold text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
