import { useDialog } from "@/contexts/dialog-context";
import { IMAGE_URL } from "@/lib/constants";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductCardMobile({ product }: { product: Product }) {
  const { openDialog } = useDialog();

  return (
    <div className="flex flex-col p-5 m-1 gap-2 rounded-xl shadow-md">
      <div
        className={`flex items-start justify-between gap-4 ${
          !product.available ? "opacity-70" : ""
        }`}
      >
        <div className="flex w-auto h-auto rounded-xl bg-[#EFF1F6]">
          <Link href={`/product/${product._id}`} target="_blank">
            <img
              src={`${IMAGE_URL}/360${product.primaryImage}`}
              alt={product.title}
              width={170}
              height={110}
              className={`w-full h-auto rounded-xl ${
                !product.available ? "filter grayscale" : ""
              }`}
            />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={`${IMAGE_URL}/${product?.brand?.logo}`}
            alt={product?.brand?.enTitle}
            width={60}
          />
          <img
            src={`${IMAGE_URL}/${product.country.logo}`}
            alt={product.country.title}
            width={18}
            height={18}
          />
        </div>
      </div>
      <div
        className={`flex items-center ${
          !product.available ? "opacity-70" : ""
        }`}
      >
        <h3 className="text-primary font-sans font-bold text-[12px] leading-6 pt-2">
          <Link href={`/product/${product._id}`} target="_blank">
            {product.enTitle}
          </Link>
        </h3>
      </div>
      <hr className={`my-2 ${!product.available ? "opacity-70" : ""}`} />
      <div
        className={`flex items-center justify-between ${
          !product.available ? "opacity-70" : ""
        }`}
      >
        <span className="text-secondary/90 font-semibold text-[11px]">
          {product.category.title}
        </span>
        <span className="text-secondary/90 font-semibold text-[11px]">
          سال ساخت {product.yearOfManufacture}
        </span>
        <span className="text-secondary/90 font-semibold text-[11px]">
          {product.condition}
        </span>
      </div>
      <div className="flex items-center gap-6">
        {!product.available && (
          <span className="flex w-full items-center justify-center h-[45px] 2xl:w-[140px] xl:h-[55px] text-red-500 font-medium text-[14px]">
            ناموجود
          </span>
        )}

        {product.available && (
          <button
            onClick={() => openDialog(product._id)}
            className="flex w-full items-center justify-center h-[45px] 2xl:w-[140px] xl:h-[55px] rounded-lg text-black hover:text-white border"
          >
            <span className="text-secondary font-medium text-[14px]">
              استعلام قیمت
            </span>
          </button>
        )}

        <Link
          href={`/product/${product._id}`}
          target="_blank"
          className="flex w-full items-center justify-center h-[45px] 2xl:w-[110px] xl:h-[55px] rounded-lg text-black hover:text-white border"
        >
          <span className="text-secondary font-medium text-[14px]">جزییات</span>
        </Link>
      </div>
    </div>
  );
}
