import { notFound, redirect, permanentRedirect } from "next/navigation";
import BannerThin from "@/components/shared/banner-thin";
import React from "react";
import ProductImages from "./product-images";
import ShareButton from "./share-button";
import Sitemap from "./site-map";
import ProductInfo from "./product-info";
import ProductIntroduce from "./product-introduce";
import { AccordionProvider } from "@/contexts/accordion-context";
import ProductHealthCard from "./product-health-card";
import RelatedProducts from "./related-products";
import PriceInquiryButton from "./price-inquiry-button";
import DialogInquiry from "../../dialog-inquiry";
import { API_URL, APP_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res1 = await fetch(`${API_URL}/product/${params.slug}`);
  const res2 = await fetch(`${API_URL}/web-text-plans`);

  const data = await res1.json();
  const info = await res2.json();

  if (!res1.ok || !res2.ok) {
    return {
      title: "خطا در دریافت اطلاعات",
    };
  }

  // Use existing canonical or fallback to current URL
  const canonicalUrl = data.canonical || `${APP_URL}/product/${params.slug}`;

  return {
    title: `${data.seoTitle} - ${info.title}`,
    description: data.metaData,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${API_URL}/product/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");

  const data = await res.json();

  // Check redirection
  if (data.redirectStatus && data.newUrl) {
    if (Number(data.redirectStatus) === 301) {
      permanentRedirect(data.newUrl);
    } else {
      redirect(data.newUrl);
    }
  }

  // If no data, return 404
  if (!data) return notFound();

  const proCatId = data.category._id;

  return (
    <AccordionProvider>
      <DialogInquiry />

      {/* Mobile View */}
      <div className="flex flex-col md:hidden relative">
        <ProductImages data={data} />
        <ProductIntroduce index={2} data={data} />
        <ProductInfo index={3} data={data} />
        <ProductHealthCard index={4} data={data} />

        {/* Related Products */}
        <div className="wrapper">
          <RelatedProducts proCatId={proCatId} proId={params.slug} />
        </div>

        {/* Price Inquiry */}
        <PriceInquiryButton data={data} />
      </div>

      {/* ************************************************************************************************************************ */}

      {/* Desktop View */}
      <div className="hidden md:block relative">
        <BannerThin />

        {/* Sitemap & Share */}
        <div className="flex items-center justify-center">
          <div className="wrapper flex items-center justify-between absolute -mt-12">
            <Sitemap data={data} />
            <ShareButton />
          </div>
        </div>

        {/* Product Content */}
        <div className="bg-gradient-to-t from-gray-50 via-white to-white">
          <div className="wrapper flex flex-col-reverse lg:flex-row items-center gap-10 py-12">
            {/* Right Side */}
            <div className="flex flex-col w-full gap-10 lg:w-1/2 xl:w-7/12 pt-10 lg:pt-0">
              <ProductIntroduce index={2} data={data} />
            </div>
            {/* Left Side */}
            <div className="flex flex-col w-full lg:w-1/2 xl:w-5/12">
              <ProductImages data={data} />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="wrapper flex flex-col lg:flex-row items-start gap-0 lg:gap-10 xl:gap-20 py-12">
          <ProductInfo index={2} data={data} />
          <ProductHealthCard index={2} data={data} />
        </div>

        {/* Related Products */}
        <div className="wrapper">
          <RelatedProducts proCatId={proCatId} proId={params.slug} />
        </div>
      </div>
    </AccordionProvider>
  );
}
