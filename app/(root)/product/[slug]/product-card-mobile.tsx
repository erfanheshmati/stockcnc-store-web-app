import { useDialog } from "@/contexts/dialog-context";
import { IMAGE_URL } from "@/lib/constants";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductCardMobile({ product }: { product: Product }) {
  const { openDialog } = useDialog();

  return (
    <div
      className={`flex flex-col p-5 m-1 gap-2 rounded-xl shadow-md min-w-[97%] sm:min-w-[70%] ${
        !product.available ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center w-8/12 h-[110px] sm:h-[150px] rounded-xl bg-[#EFF1F6]">
          <img
            src={`${IMAGE_URL}/${product.primaryImage}`}
            alt={product.title}
            width={170}
            height={110}
            className={`w-full h-[110px] sm:h-[150px] object-center rounded-xl ${
              !product.available ? "filter grayscale" : ""
            }`}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-secondary/60 font-bold text-[12px] pt-1">
            {product.brand.enTitle}
          </span>
          <img
            src={`${IMAGE_URL}/${product.country.logo}`}
            alt={product.country.title}
            width={18}
            height={18}
          />
        </div>
      </div>
      <div className="flex items-center">
        <h3 className="text-primary font-semibold text-[14px] leading-6 pt-2">
          {product.title}
        </h3>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <span className="text-secondary/90 font-semibold text-[11px]">
          {product.options}
        </span>
        <span className="text-secondary/90 font-semibold text-[11px]">
          {product.yearOfManufacture}
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
          className="flex w-full items-center justify-center h-[45px] 2xl:w-[110px] xl:h-[55px] rounded-lg text-black hover:text-white border"
        >
          <span className="text-secondary font-medium text-[14px]">جزییات</span>
        </Link>
      </div>
    </div>
  );
}
