import { useDialog } from "@/contexts/dialog-context";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardMobile({ product }: { product: Product }) {
  const { openDialog } = useDialog();

  return (
    <div className="flex flex-col p-5 gap-4 rounded-2xl shadow-xl">
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
      <div className="flex items-center gap-4">
        <hr className="w-full" />
        <span className="text-secondary text-[10px] min-w-fit">
          {product.description}
        </span>
      </div>
      <div className="flex items-center justify-between">
        {product.tags.map((tag, index) => (
          <span
            key={index}
            className="text-secondary/90 font-semibold text-[11px]"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={openDialog}
          className="flex w-full items-center justify-center h-[45px] 2xl:w-[140px] xl:h-[55px] rounded-lg text-black hover:text-white border"
        >
          <span className="text-secondary font-medium text-[14px]">
            استعلام قیمت
          </span>
        </button>
        <Link
          href={`/product/${product.slug}`}
          className="flex w-full items-center justify-center h-[45px] 2xl:w-[110px] xl:h-[55px] rounded-lg text-black hover:text-white border"
        >
          <span className="text-secondary font-medium text-[14px]">جزییات</span>
        </Link>
      </div>
    </div>
  );
}
