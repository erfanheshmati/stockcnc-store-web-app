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
import { Pagination } from "swiper/modules";

export default function RelatedProducts({
  proCatId,
  proId,
}: {
  proCatId: string;
  proId: string;
}) {
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product?category=${proCatId}`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        const filteredProducts = data.docs.filter(
          (product: Product) => product._id !== proId
        );
        setProductsData(filteredProducts);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchProductsData();
  }, [proCatId, proId]);

  return (
    <>
      {/* Mobile View */}
      <div className="flex md:hidden flex-col w-full gap-4 my-10">
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-bold text-[18px] w-full text-center">
            محصولات مرتبط
          </h3>
        </div>
        <div className="flex items-center justify-center">
          {productsData.length === 0 && (
            <p className="flex items-center justify-center w-full text-secondary text-sm">
              محصولی برای نمایش وجود ندارد
            </p>
          )}
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
          >
            {productsData?.map((product) => (
              <SwiperSlide key={product._id} className="pb-12">
                <ProductCardMobile product={product} key={product._id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ************************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col w-full mb-20">
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-bold text-[24px]">محصولات مرتبط</h3>
          <Link
            href="/archiv"
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
          {productsData.length === 0 && (
            <p className="flex items-center justify-center min-h-40 text-secondary text-sm">
              محصولی برای نمایش وجود ندارد
            </p>
          )}
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
            {productsData?.map((data) => (
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
