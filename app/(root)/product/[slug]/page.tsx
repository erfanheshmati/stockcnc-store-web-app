import BannerThin from "@/components/shared/banner-thin";
import React from "react";
import ProductImages from "./product-images";
import ShareButton from "./share-button";
import Sitemap from "./sitemap";
import ProductInfo from "./product-info";
import ProductIntroduce from "./product-introduce";
import { AccordionProvider } from "@/contexts/accordion-context";
import ProductHealthCard from "./product-health-card";
import RelatedProducts from "./related-products";
import PriceInquiryButton from "./price-inquiry-button";
import DialogInquiry from "../../dialog-inquiry";

export default async function ProductDetails() {
  return (
    <AccordionProvider>
      <DialogInquiry />

      {/* Mobile View */}
      <div className="flex flex-col md:hidden relative">
        <ProductImages />
        <ProductIntroduce index={2} />
        <ProductInfo index={3} />
        <ProductHealthCard index={4} />

        {/* Related Products */}
        <div className="wrapper">
          <RelatedProducts />
        </div>

        {/* Price Inquiry */}
        <PriceInquiryButton />
      </div>

      {/* ************************************************************************************************************************ */}

      {/* Desktop View */}
      <div className="hidden md:block relative">
        <BannerThin />

        {/* Sitemap & Share */}
        <div className="flex items-center justify-center">
          <div className="wrapper flex items-center justify-between absolute -mt-12">
            <Sitemap />
            <ShareButton />
          </div>
        </div>

        {/* Product Content */}
        <div className="bg-gradient-to-t from-gray-50 via-white to-white">
          <div className="wrapper flex flex-col-reverse lg:flex-row items-center gap-10 py-12">
            {/* Right Side */}
            <div className="flex flex-col w-full gap-10 lg:w-1/2 xl:w-7/12 pt-10 lg:pt-0">
              <ProductIntroduce index={1} />
            </div>
            {/* Left Side */}
            <div className="flex flex-col w-full lg:w-1/2 xl:w-5/12">
              <ProductImages />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="wrapper flex flex-col lg:flex-row items-start gap-0 lg:gap-10 xl:gap-20 py-12">
          <ProductInfo index={1} />
          <ProductHealthCard index={1} />
        </div>

        {/* Related Products */}
        <div className="wrapper">
          <RelatedProducts />
        </div>
      </div>
    </AccordionProvider>
  );
}
