"use client";

import Link from "next/link";
import BlogCard from "./blog-card";
import { BiChevronLeft } from "react-icons/bi";
import { blogsData } from "@/lib/data";

// import Swiper core and required modules, styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function Blogs() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-primary flex items-center gap-1">
            <span className="font-bold text-[22px]">مجله آموزشی و خبری</span>
            <span className="font-semibold text-[15px]">سی ان سی استوک</span>
          </h2>
          <div className="wrapper !px-0 relative pt-4">
            <Swiper
              loop={true}
              slidesPerView={1}
              spaceBetween={0}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: -60,
                },
                340: {
                  slidesPerView: 1,
                  spaceBetween: -80,
                },
                360: {
                  slidesPerView: 1,
                  spaceBetween: -100,
                },
                380: {
                  slidesPerView: 1,
                  spaceBetween: -110,
                },
                400: {
                  slidesPerView: 1,
                  spaceBetween: -120,
                },
                420: {
                  slidesPerView: 1,
                  spaceBetween: -130,
                },
                440: {
                  slidesPerView: 1,
                  spaceBetween: -150,
                },
                460: {
                  slidesPerView: 1,
                  spaceBetween: -180,
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: 20,
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
                  spaceBetween: 60,
                },
              }}
            >
              {blogsData.map((data) => (
                <SwiperSlide key={data.id} className="pb-10 pr-4">
                  <BlogCard data={data} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* ****************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:w-6/12 lg:w-7/12 xl:w-8/12">
        <div className="flex items-center justify-between pr-6 lg:pr-20">
          <h2 className="text-primary flex items-center gap-1">
            <span className="font-bold text-[24px]">مجله آموزشی و خبری</span>
            <span className="font-semibold text-[17px] hidden lg:block">
              سی ان سی استوک
            </span>
          </h2>
          <Link href="#" className="flex items-center gap-4 hover:underline">
            <span className="pt-1">مشاهده همه مطالب</span>
            <span className="flex items-center justify-center bg-secondary">
              <BiChevronLeft size={18} color="white" />
            </span>
          </Link>
        </div>
        <hr className="mt-6" />
        <div className="pr-2 lg:pr-20">
          <Swiper
            slidesPerView={2}
            spaceBetween={0}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              980: {
                slidesPerView: 1,
                spaceBetween: -10,
              },
              1020: {
                slidesPerView: 1,
                spaceBetween: -100,
              },
              1080: {
                slidesPerView: 1,
                spaceBetween: -150,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 100,
              },
            }}
          >
            {blogsData.map((data) => (
              <SwiperSlide className="py-6" key={data.id}>
                <BlogCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
