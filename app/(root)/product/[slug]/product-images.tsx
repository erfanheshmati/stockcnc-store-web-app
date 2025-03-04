"use client";

// import Swiper core and required modules, styles
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import { BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";
import { SlSizeFullscreen } from "react-icons/sl";
import { IMAGE_URL } from "@/lib/constants";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductImages({ data }: { data: Product }) {
  const [current, setCurrent] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <div className="flex items-center justify-center md:hidden h-auto bg-[#EFF1F6]">
        {/* Content */}
        <div className="flex items-center justify-center w-full z-[1]">
          {/* Slider */}
          <div className="flex items-center justify-center w-full relative">
            {/* Swiper */}
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
            >
              {data.gallery.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${IMAGE_URL}/${image}`}
                    alt="Product Image"
                    className="w-full h-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* *************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-6 relative">
        {/* Main Image */}
        <div className="flex items-center justify-center bg-secondary/10 rounded-xl h-auto border relative">
          <img
            src={`${IMAGE_URL}/${data.gallery[current]}`}
            alt="Product Image"
            className="w-full h-auto rounded-xl"
          />
        </div>
        {/* Set Fullscreen Button */}
        {!isFullScreen && (
          <button
            onClick={() => setIsFullScreen(true)}
            className="group absolute top-4 left-4 bg-primary p-2 rounded-full z-10"
          >
            <SlSizeFullscreen
              size={14}
              className="text-white group-hover:opacity-80 transition-all duration-300 ease-in-out"
            />
          </button>
        )}
        {/* Fullscreen View */}
        {isFullScreen && (
          <div className="flex flex-col h-screen fixed inset-0 bg-black z-50">
            <div className="flex items-center justify-between px-12 py-8">
              <button
                onClick={() => setIsFullScreen(false)}
                className="hover:opacity-60 transition-all duration-300 ease-in-out"
              >
                <BiX size={30} color="white" />
              </button>
              <Link
                href="/"
                className="text-white text-xl font-bold tracking-wider font-sans"
              >
                stockcnc.com
              </Link>
            </div>
            {/* Slideshow */}
            <div className="flex flex-col justify-center h-full relative">
              {/* Custom arrows */}
              <div className="custom-product-carousel-button-prev right-3 bg-neutral-400/80 hover:bg-neutral-300 transition-all duration-300 ease-in-out flex items-center justify-center rounded-full cursor-pointer w-9 h-9 z-[5]">
                <BiChevronRight size={24} />
              </div>
              <div className="custom-product-carousel-button-next left-3 bg-neutral-400/80 hover:bg-neutral-300 transition-all duration-300 ease-in-out flex items-center justify-center rounded-full cursor-pointer w-9 h-9 z-[5]">
                <BiChevronLeft size={24} />
              </div>
              {/* Swiper */}
              <div>
                <Swiper
                  modules={[Navigation, Pagination, FreeMode]}
                  slidesPerView={1}
                  spaceBetween={0}
                  centeredSlides={true}
                  loop={true}
                  pagination={{
                    clickable: true,
                    el: ".custom-product-carousel-pagination",
                    bulletClass: "custom-product-carousel-pagination-bullet",
                    bulletActiveClass:
                      "custom-product-carousel-pagination-bullet-active",
                  }}
                  navigation={{
                    prevEl: ".custom-product-carousel-button-prev",
                    nextEl: ".custom-product-carousel-button-next",
                  }}
                  breakpoints={{
                    768: {
                      slidesPerView: 1,
                      spaceBetween: -250,
                    },
                    1024: {
                      slidesPerView: 1,
                      spaceBetween: -400,
                    },
                    1280: {
                      slidesPerView: 1,
                      spaceBetween: -600,
                    },
                    1360: {
                      slidesPerView: 1,
                      spaceBetween: -700,
                    },
                    1536: {
                      slidesPerView: 1,
                      spaceBetween: -650,
                    },
                    1680: {
                      slidesPerView: 1,
                      spaceBetween: -800,
                    },
                    1840: {
                      slidesPerView: 1,
                      spaceBetween: -900,
                    },
                  }}
                >
                  {data.gallery.map((image, index) => (
                    <SwiperSlide className="pb-10" key={index}>
                      <img
                        src={`${IMAGE_URL}/${image}`}
                        alt="Product Image"
                        className="md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[660px] mx-auto"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Custom pagination container */}
              <div className="custom-product-carousel-pagination"></div>
            </div>
          </div>
        )}

        {/* Thumbnails */}
        <div
          className={`flex ${
            data.gallery.length > 3 ? "justify-between" : "gap-5"
          }`}
          dir="ltr"
        >
          {data.gallery.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className={`md:w-[180px] lg:w-[120px] h-full flex items-center justify-center cursor-pointer rounded-xl bg-secondary/10 hover:border hover:border-[#B7C5DA] transition-all duration-100 ease-in-out z-10
            ${current === index && "border border-[#B7C5DA]"}`}
              onClick={() => setCurrent(index)}
            >
              <img
                src={`${IMAGE_URL}/${image}`}
                alt="Product Thumbnail"
                className="w-full h-auto rounded-xl"
              />
            </div>
          ))}
          {data.gallery.length > 3 && (
            <button
              onClick={() => setShowGallery(true)}
              className="relative md:w-[180px] lg:w-[120px] h-full flex items-center justify-center rounded-xl bg-secondary hover:opacity-90 transition-all duration-300 ease-in-out"
            >
              <img
                src={`${IMAGE_URL}/${data.gallery[3]}`}
                alt="Product Thumbnail"
                className="w-full h-auto rounded-xl opacity-40"
              />
              <span className="text-white font-semibold text-[20px] absolute">
                +{data.gallery.length - 3}
              </span>
            </button>
          )}
        </div>

        {/* Gallery Modal */}
        {showGallery && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="space-y-4 bg-white rounded-lg pt-4 pb-6 px-6">
              <button
                onClick={() => setShowGallery(false)}
                className="bg-gray-200 rounded-full text-white p-1 hover:opacity-80 transition-all duration-300 ease-in-out"
              >
                <BiX size={20} className="text-gray-400" />
              </button>
              <div className="grid grid-cols-3 gap-5">
                {data.gallery.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrent(index);
                      setShowGallery(false);
                    }}
                    className={`w-[140px] h-auto flex items-center justify-center cursor-pointer rounded-xl bg-secondary/10 hover:border hover:border-[#B7C5DA] transition-all duration-100 ease-in-out
                    ${current === index && "border border-[#B7C5DA]"}`}
                  >
                    <img
                      src={`${IMAGE_URL}/${image}`}
                      alt="Gallery Image"
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
