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
              // centeredSlides={true}
              // slidesPerView={"auto"}
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
                <SwiperSlide className="pb-10" key={data.id}>
                  <ProductCard data={data} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col w-full">
        <div className="flex items-center justify-between mr-7">
          <h2 className="text-primary font-bold text-[24px]">
            محصولات برند داوو
          </h2>
          <Link href="#" className="flex items-center gap-4 hover:underline">
            <span>مشاهده همه محصولات</span>
            <span className="flex items-center justify-center w-[18px] h-[18px] bg-secondary">
              <BiChevronLeft size={18} color="white" />
            </span>
          </Link>
        </div>
        <hr className="mt-6 mr-7" />
        <div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 h-[590px] pr-6 pl-2 py-10 overflow-x-hidden overflow-y-auto custom-scroll"
          dir="ltr"
        >
          {productsData.map((data) => (
            <ProductCard data={data} key={data.id} />
          ))}
        </div>
      </div>
    </>
  );
}
