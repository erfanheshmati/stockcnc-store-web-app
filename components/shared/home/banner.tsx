"use client";

import Image from "next/image";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import Link from "next/link";

// import Swiper core and required modules, styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[360px] md:h-[391px] bg-primary relative flex px-4 md:px-0">
      {/* Banner Background Layer */}
      <div className="absolute inset-0 bg-header-background bg-center bg-cover opacity-[2%]"></div>

      {/* Banner Content */}
      <div className="flex items-center justify-center wrapper z-[1] relative">
        {/* Slider */}
        <div className="flex items-center justify-center w-full relative">
          {/* Custom Pagination */}
          <div className="custom-swiper-pagination flex items-center justify-center bottom-0 gap-0 z-[5] cursor-pointer"></div>
          {/* Custom Arrows */}
          <div className="custom-swiper-button-prev -left-4 md:left-0 z-[5] cursor-pointer hover:opacity-70">
            <BiArrowFromRight size={20} color="white" />
          </div>
          <div className="custom-swiper-button-next -right-4 md:right-0 z-[5] cursor-pointer hover:opacity-70">
            <BiArrowFromLeft size={20} color="white" />
          </div>
          {/* Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            pagination={{
              el: ".custom-swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".custom-swiper-button-prev",
              nextEl: ".custom-swiper-button-next",
            }}
          >
            <SwiperSlide>
              <Link href="/" className="flex flex-col items-center gap-4 py-8">
                <Image
                  src="/images/products/cnc.png"
                  alt="Product Image"
                  width={207}
                  height={139}
                />
                <div className="flex flex-col items-start">
                  <span className="text-white/60 text-[14px] md:text-[17px]">
                    فروش عمده
                  </span>
                  <span className="text-white font-bold text-[17px] md:text-[22px]">
                    انواع دستگاه های سی ان سی
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/" className="flex flex-col items-center gap-4 py-8">
                <Image
                  src="/images/products/cnc.png"
                  alt="Product Image"
                  width={207}
                  height={139}
                />
                <div className="flex flex-col items-start">
                  <span className="text-white/60 text-[14px] md:text-[17px]">
                    فروش عمده
                  </span>
                  <span className="text-white font-bold text-[17px] md:text-[22px]">
                    انواع دستگاه های سی ان سی
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        {children}
      </div>
    </div>
  );
}
