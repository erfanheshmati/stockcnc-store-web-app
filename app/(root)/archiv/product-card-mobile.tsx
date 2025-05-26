import { useDialog } from "@/contexts/dialog-context";
import { IMAGE_URL } from "@/lib/constants";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductCardMobile({ product }: { product: Product }) {
  const { openDialog } = useDialog();

  return (
    <div className="flex flex-col p-5 gap-4 rounded-2xl shadow-md">
      <div
        className={`flex items-start justify-between ${
          !product.available ? "opacity-70" : ""
        }`}
      >
        <div className="flex items-center justify-center w-8/12 h-auto rounded-xl bg-[#EFF1F6]">
          <Link
            href={`/product/${product._id}`}
            target="_blank"
            className="w-full"
          >
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
          <Link
            href={`/brand/${product?.brand?.enTitle}?brand=${product?.brand?._id}`}
          >
            <img
              src={`${IMAGE_URL}/${product?.brand?.logo}`}
              alt={product?.brand?.enTitle}
              className="w-16"
            />
          </Link>
          <img
            src={`${IMAGE_URL}/${product?.country?.logo}`}
            alt={product?.country?.title}
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
        <h3 className="text-primary font-sans font-bold text-[15px] leading-6">
          <Link href={`/product/${product._id}`} target="_blank">
            {product.enTitle}
          </Link>
        </h3>
      </div>
      <div
        className={`flex items-center gap-4 ${
          !product.available ? "opacity-70" : ""
        }`}
      >
        <h3 className="text-secondary text-[12px] min-w-fit">
          {product.title}
        </h3>
        <hr className="w-full" />
      </div>
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
          {product.attributes
            .filter((attr) => attr?.attribute?.title === "کنترل")
            .map((attr, index) => (
              <span key={index}>{attr?.value}</span>
            ))}
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
