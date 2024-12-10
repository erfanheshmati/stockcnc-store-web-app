"use client";

import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

// import Swiper core and required modules, styles
// import { Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "@/components/shared/home/product-card";
import { productsData } from "@/lib/data";
import ProductCardMobile from "./product-card-mobile";

export default function RelatedProducts() {
  return (
    <>
      {/* Mobile View */}
      <div className="flex md:hidden flex-col w-full gap-4 my-10">
        <div className="flex items-center justify-between">
          <h2 className="text-primary font-bold text-[18px] w-full text-center">
            محصولات مرتبط
          </h2>
        </div>
        <div className="flex flex-col gap-4 h-[520px] overflow-auto">
          {productsData.map((product) => (
            <ProductCardMobile product={product} key={product.slug} />
          ))}
        </div>
      </div>

      {/* ************************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col w-full mb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-primary font-bold text-[24px]">محصولات مرتبط</h2>
          <Link
            href="/products"
            className="flex items-center gap-4 hover:underline"
          >
            <span className="pt-1">مشاهده همه محصولات</span>
            <span className="flex items-center justify-center bg-secondary">
              <BiChevronLeft size={18} color="white" />
            </span>
          </Link>
        </div>
        <hr className="mt-6" />
        <div>
          <Swiper
            slidesPerView={4}
            spaceBetween={0}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: -60,
              },
              840: {
                slidesPerView: 2,
                spaceBetween: -120,
              },
              920: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1060: {
                slidesPerView: 3,
                spaceBetween: -20,
              },
              1160: {
                slidesPerView: 3,
                spaceBetween: -100,
              },
              1240: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
          >
            {productsData.map((data) => (
              <SwiperSlide className="py-10 px-3" key={data.slug}>
                <ProductCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
