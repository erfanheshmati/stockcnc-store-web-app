"use client";

import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ProductCard from "./product-card";
import { productsData } from "@/lib/data";

// import Swiper core and required modules, styles
import { Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function Products() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex flex-col items-center">
          <h2 className="text-primary font-bold text-[22px]">
            محصولات برند داوو
          </h2>
          <div className="wrapper !px-0 relative pt-4">
            {/* Custom arrows */}
            <div className="custom-swiper-button-prev left-4 inset-y-1/2 bg-primary flex items-center justify-center rounded-full w-10 h-10 z-[5]">
              <BiChevronLeft size={19} color="white" />
            </div>
            <div className="custom-swiper-button-next right-4 inset-y-1/2 bg-primary flex items-center justify-center rounded-full w-10 h-10 z-[5]">
              <BiChevronRight size={19} color="white" />
            </div>
            <Swiper
              modules={[Navigation, FreeMode]}
              slidesPerView={1}
              spaceBetween={0}
              navigation={{
                prevEl: ".custom-swiper-button-prev",
                nextEl: ".custom-swiper-button-next",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: -80,
                },
                330: {
                  slidesPerView: 1,
                  spaceBetween: -100,
                },
                350: {
                  slidesPerView: 1,
                  spaceBetween: -120,
                },
                380: {
                  slidesPerView: 1,
                  spaceBetween: -150,
                },
                450: {
                  slidesPerView: 1,
                  spaceBetween: -180,
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: -20,
                },
                550: {
                  slidesPerView: 2,
                  spaceBetween: -40,
                },
                600: {
                  slidesPerView: 3,
                  spaceBetween: 150,
                },
                650: {
                  slidesPerView: 3,
                  spaceBetween: 100,
                },
                700: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {productsData.map((data) => (
                <SwiperSlide className="pb-10" key={data.slug}>
                  <ProductCard data={data} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* *********************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:w-7/12 lg:w-8/12 xl:w-9/12">
        <div className="flex items-center justify-between">
          <h2 className="text-primary font-bold text-[24px] mr-2">
            محصولات برند داوو
          </h2>
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
        <hr className="mt-6 mr-2" />
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={0}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: -80,
              },
              830: {
                slidesPerView: 1,
                spaceBetween: -100,
              },
              900: {
                slidesPerView: 1,
                spaceBetween: -120,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: -50,
              },
              1280: {
                slidesPerView: 3,
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
