"use client";

// import Swiper core and required modules, styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import ProductCard from "@/components/shared/home/product-card";
import ProductCardMobile from "./product-card-mobile";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

export default function RelatedProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product`, {
          method: "POST",
        });
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setProductsData(data.docs);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchProductsData();
  }, []);

  return (
    <>
      {/* Mobile View */}
      <div className="flex md:hidden flex-col w-full gap-4 my-10">
        <div className="flex items-center justify-between">
          <h2 className="text-primary font-bold text-[18px] w-full text-center">
            محصولات مرتبط
          </h2>
        </div>
        <div
          className="flex flex-col gap-4 h-[520px] overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {productsData.map((product) => (
            <ProductCardMobile product={product} key={product._id} />
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
              <SwiperSlide className="py-10 px-3" key={data._id}>
                <ProductCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
