"use client";

// import Swiper core and required modules, styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL, IMAGE_URL } from "@/lib/constants";
import { BannerSlider } from "@/lib/types";

export default function Banner({ children }: { children: React.ReactNode }) {
  const [bannersData, setBannersData] = useState<BannerSlider[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannersData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/web-text-plans`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        const sortedBanners = data.banners.sort(
          (a: { sort: number }, b: { sort: number }) => b.sort - a.sort
        );
        setBannersData(sortedBanners);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchBannersData();
  }, []);

  return (
    <div className="h-[250px] sm:h-[300px] md:h-[391px] bg-primary relative flex">
      {/* Banner Background Layer */}
      <div className="absolute inset-0 bg-header-background bg-center bg-cover opacity-[2%]"></div>

      {/* Banner Content */}
      <div className="flex justify-center w-full xl:wrapper z-[1] relative">
        {/* Slider */}
        <div className="flex items-center justify-center w-full relative">
          {/* Custom Pagination */}
          {/* <div className="custom-swiper-pagination hidden md:flex items-center justify-center bottom-14 gap-1 z-[5] cursor-pointer"></div> */}
          {/* Custom Arrows */}
          <div className="custom-swiper-button-prev left-4 z-[5] cursor-pointer hover:opacity-70">
            <BiArrowFromRight size={20} color="white" />
          </div>
          <div className="custom-swiper-button-next right-4 z-[5] cursor-pointer hover:opacity-70">
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
            className="h-full"
          >
            {error && (
              <p className="text-red-500 text-center w-full">{error}</p>
            )}

            {!error &&
              bannersData.map((item) => (
                <SwiperSlide key={item._id}>
                  <Link href={item.url} className="relative">
                    <Image
                      src={`${IMAGE_URL}/${item.imageWeb}`}
                      alt={item.title}
                      width={207}
                      height={139}
                      className="hidden md:block w-full h-full"
                    />
                    <Image
                      src={`${IMAGE_URL}/${item.imageMobile}`}
                      alt={item.title}
                      width={207}
                      height={139}
                      className="block md:hidden w-full h-full"
                    />
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {children}
      </div>
    </div>
  );
}
