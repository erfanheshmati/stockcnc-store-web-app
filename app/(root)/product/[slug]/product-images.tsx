"use client";

import Image from "next/image";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { SlSizeFullscreen } from "react-icons/sl";

// import Swiper core and required modules, styles
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/images/categories/cnc-punch.png",
  "/images/categories/cnc-tarash.png",
  "/images/categories/cnc-ferez.png",
  "/images/categories/cnc-punch.png",
  "/images/categories/cnc-tarash.png",
];

export default function ProductImages() {
  const [current, setCurrent] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <div className="flex items-center justify-center md:hidden h-[280px] bg-[#EFF1F6]">
        {/* Content */}
        <div className="flex items-center justify-center wrapper z-[1]">
          {/* Slider */}
          <div className="flex items-center justify-center w-full">
            {/* Swiper */}
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="py-12">
                  <Image
                    src={image}
                    alt="Product Image"
                    width={250}
                    height={170}
                    className="h-[170px] mx-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* *************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-4 relative">
        {/* Main Image */}
        <div
          className={`${
            isFullScreen
              ? "flex justify-center items-center fixed inset-0 bg-black z-50"
              : ""
          }`}
        >
          <div
            className={`flex items-center justify-center bg-secondary/10 rounded-xl
            ${!isFullScreen && "h-[400px]"}`}
          >
            <Image
              src={images[current]}
              alt="Product Image"
              width={isFullScreen ? 800 : 344}
              height={isFullScreen ? 500 : 232}
            />
          </div>
          {isFullScreen && (
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 hover:opacity-60 transition-all duration-300 ease-in-out z-10"
            >
              <BiX size={24} color="white" />
            </button>
          )}
          {!isFullScreen && (
            <button
              onClick={() => setIsFullScreen(true)}
              className="absolute top-5 left-5 hover:opacity-70 transition-all duration-300 ease-in-out z-10"
            >
              <SlSizeFullscreen size={14} className="text-gray-400" />
            </button>
          )}
          {/* Brand Label */}
          {/* <div className="absolute inset-0 top-5 flex justify-center text-red-500 font-bold">
          DOOSAN
        </div> */}
        </div>

        {/* Thumbnails */}
        <div
          className={`flex ${images.length > 3 ? "justify-between" : "gap-6"}`}
          dir="ltr"
        >
          {images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className={`w-[120px] h-[120px] flex items-center justify-center cursor-pointer rounded-xl bg-secondary/10 hover:border hover:border-[#B7C5DA] transition-all duration-100 ease-in-out z-10
            ${current === index && "border border-[#B7C5DA]"}`}
              onClick={() => setCurrent(index)}
            >
              <Image
                src={image}
                alt="Product Thumbnail"
                width={85}
                height={55}
              />
            </div>
          ))}
          {images.length > 3 && (
            <button
              onClick={() => setShowGallery(true)}
              className="relative w-[120px] h-[120px] flex items-center justify-center rounded-xl bg-secondary hover:opacity-90 transition-all duration-300 ease-in-out"
            >
              <Image
                src={images[3]}
                alt="Product Thumbnail"
                width={85}
                height={55}
                className="opacity-40"
              />
              <span className="text-white font-semibold text-[20px] absolute">
                +{images.length - 3}
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
                {images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrent(index);
                      setShowGallery(false);
                    }}
                    className={`w-[120px] h-[120px] flex items-center justify-center cursor-pointer rounded-xl bg-secondary/10 hover:border hover:border-[#B7C5DA] transition-all duration-100 ease-in-out
                    ${current === index && "border border-[#B7C5DA]"}`}
                  >
                    <Image
                      src={image}
                      alt="Gallery Image"
                      width={85}
                      height={55}
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
