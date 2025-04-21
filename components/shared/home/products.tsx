"use client";

// import Swiper core and required modules, styles
import { Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ProductCard from "./product-card";
import { API_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";

export default function Products({
  selectedBrand,
}: {
  selectedBrand: string | null;
}) {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [brandName, setBrandName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await fetch(`${API_URL}/product?brand=${selectedBrand}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setProductsData(data.docs);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchProductsData();
  }, [selectedBrand]);

  useEffect(() => {
    const fetchBrandName = async () => {
      if (selectedBrand) {
        try {
          const res = await fetch(`${API_URL}/brand`);
          if (!res.ok) throw new Error("خطا در دریافت اطلاعات برند!");
          const data = await res.json();
          const brand = data.find(
            (brand: { _id: string }) => brand._id === selectedBrand
          );
          setBrandName(brand ? brand.title : "");
        } catch (error) {
          console.error((error as Error).message);
          setBrandName("");
        }
      } else {
        setBrandName("");
      }
    };
    fetchBrandName();
  }, [selectedBrand]);

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex flex-col items-center">
          <h2 className="text-primary font-bold text-[22px]">
            محصولات {brandName}
          </h2>
          <div className="wrapper !px-0 relative pt-4">
            {/* Custom arrows */}
            <div className="custom-swiper-button-prev left-4 inset-y-1/2 bg-primary flex items-center justify-center rounded-full w-10 h-10 z-[5]">
              <BiChevronLeft size={19} color="white" />
            </div>
            <div className="custom-swiper-button-next right-4 inset-y-1/2 bg-primary flex items-center justify-center rounded-full w-10 h-10 z-[5]">
              <BiChevronRight size={19} color="white" />
            </div>
            <div className="h-[362px]">
              {!error && productsData.length === 0 && (
                <p className="flex items-center justify-center text-secondary text-sm h-full">
                  محصولی برای نمایش وجود ندارد
                </p>
              )}

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
                className="h-[400px]"
              >
                {error && (
                  <p className="text-red-500 text-center w-full">{error}</p>
                )}

                {!error &&
                  productsData.map((data) => (
                    <SwiperSlide className="pb-10" key={data._id}>
                      <ProductCard data={data} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* *********************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:w-7/12 lg:w-8/12 xl:w-9/12">
        <div className="flex items-center justify-between">
          <h2 className="text-primary font-bold text-[24px] mr-2">
            محصولات {brandName}
          </h2>
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
        <hr className="mt-6 mr-2" />
        <div className="h-[550px]">
          {!error && productsData.length === 0 && (
            <p className="flex items-center justify-center text-secondary text-sm h-full">
              محصولی برای نمایش وجود ندارد
            </p>
          )}

          <Swiper
            slidesPerView={3}
            spaceBetween={0}
            grabCursor={true}
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
            className="h-[580px]"
          >
            {error && (
              <p className="text-red-500 text-center w-full">{error}</p>
            )}

            {!error &&
              productsData.map((data) => (
                <SwiperSlide className="pt-10 px-3" key={data._id}>
                  <ProductCard data={data} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
