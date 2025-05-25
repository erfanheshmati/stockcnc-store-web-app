import { notFound, permanentRedirect, redirect } from "next/navigation";
import BannerThin from "@/components/shared/banner-thin";
import Sitemap from "./site-map";
import Filters from "../../archiv/filters";
import ViewSwitch from "../../archiv/view-switch";
import ViewList from "../../archiv/view-list";
import ViewGrid from "../../archiv/view-grid";
import DialogInquiry from "../../dialog-inquiry";
import ViewMobile from "../../archiv/view-mobile";
import DialogFilters from "../../archiv/dialog-filters";
import ButtonsMobile from "../../archiv/buttons-mobile";
import { FilterProvider } from "@/contexts/filter-popup-context";
import { API_URL, IMAGE_URL } from "@/lib/constants";
import { Brand } from "@/lib/types";
import { FiltersLogicProvider } from "@/contexts/filter-logic-context";
import SortSwitch from "../../archiv/sort-switch";
import { SortProvider } from "@/contexts/sort-popup-context";
import DialogSort from "../../archiv/dialog-sort";
import { ViewProvider } from "@/contexts/view-context";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res1 = await fetch(`${API_URL}/brand`);
  const res2 = await fetch(`${API_URL}/web-text-plans`);

  if (!res1.ok || !res2.ok) {
    return {
      title: "خطا در دریافت اطلاعات",
    };
  }

  const brandsData = await res1.json();
  const info = await res2.json();

  const brand = brandsData.find(
    (brand: Brand) => brand.enTitle === params.slug
  );

  return {
    title: `${brand?.seoTitle || info.archiveProductSeoTitle} - ${info.title}`,
    description: brand?.metaData || info.archiveProductMetaData,
  };
}

export default async function BrandPage({
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams: {
    brand?: string;
    sort?: string;
  };
}) {
  const brandQuery = searchParams?.brand || "";
  const sortQuery = searchParams?.sort || "";

  let error: string | null = null;

  const res1 = await fetch(`${API_URL}/web-text-plans`);
  const res2 = await fetch(`${API_URL}/brand`);
  const res3 = await fetch(
    `${API_URL}/product?brand=${brandQuery}&sort=${sortQuery}`,
    { cache: "no-store" }
  );

  const info = await res1.json();
  const brandsData = await res2.json();
  const productsData = await res3.json();

  // Check redirection
  if (info.archiveProductRedirectStatus && info.archiveProductNewUrl) {
    if (Number(info.archiveProductRedirectStatus) === 301) {
      permanentRedirect(info.archiveProductNewUrl);
    } else {
      redirect(info.archiveProductNewUrl);
    }
  }

  // If no data, return 404
  if (!productsData) return notFound();

  const brand = brandsData?.find((brand: Brand) => brand._id === brandQuery);

  if (productsData.length === 0) {
    error = "جستجو بی نتیجه بود";
  }

  return (
    <FiltersLogicProvider initialProducts={productsData}>
      <FilterProvider>
        <SortProvider>
          <ViewProvider>
            {/* Pop-Ups */}
            <DialogInquiry />
            <DialogFilters />
            <DialogSort />

            {/* Mobile View */}
            <div className="block md:hidden relative">
              <BannerThin />
              {/* Heading */}
              <div className="absolute w-full flex justify-center top-10">
                <h1 className="text-primary font-bold text-[20px]">
                  محصولات {brand.title}
                </h1>
              </div>
              {/* Content */}
              <div className="flex flex-col pt-8 wrapper min-h-screen">
                {/* Buttons */}
                <ButtonsMobile />
                {/* Product View */}
                {error ? (
                  <div className="flex items-start justify-center pt-20 h-screen text-secondary text-sm">
                    {error}
                  </div>
                ) : (
                  <ViewMobile />
                )}
                {/* Description */}
                {brand && (
                  <div className="flex flex-col gap-4 bg-[#618FB61A] -mx-4 px-4 py-8 mt-auto">
                    <h2 className="text-primary font-bold text-[16px] text-center">
                      درباره {brand.title}
                    </h2>
                    <p className="text-secondary font-medium text-[12px] leading-7 text-justify">
                      {brand.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ****************************************************************************************************************** */}

            {/* Desktop View */}
            <div className="hidden md:block relative">
              <BannerThin />
              {/* Sitemap */}
              <div className="flex items-center justify-center">
                <div className="wrapper flex items-center justify-between absolute -mt-12 z-10">
                  <Sitemap brand={brand} />
                </div>
              </div>
              {/* Content */}
              <div className="wrapper flex flex-col py-12">
                <div className="flex md:gap-10 xl:gap-20">
                  {/* Filters */}
                  <div className="flex flex-col gap-8 w-6/12 lg:w-4/12 xl:w-3/12">
                    <h3 className="text-secondary font-semibold text-[20px]">
                      فیلترها
                    </h3>
                    <Filters />
                  </div>
                  {/* Product View */}
                  <div className="flex flex-col w-9/12">
                    {/* Heading */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h1 className="text-primary font-bold text-[24px]">
                          محصولات {brand.title}
                        </h1>
                      </div>
                      <SortSwitch sort={sortQuery} />
                      <ViewSwitch />
                    </div>
                    {/* Contents */}
                    <div className="flex flex-col justify-between h-full">
                      {error ? (
                        <div className="flex items-start justify-center pt-20 h-full text-secondary text-sm">
                          {error}
                        </div>
                      ) : (
                        <>
                          {/* List */}
                          <ViewList />
                          {/* Grid */}
                          <ViewGrid />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Brand Card */}
                {brand && (
                  <div className="border rounded-xl shadow-md py-8 mt-16 2xl:mt-20 bg-gradient-to-l from-[#f2f3f5]/70 via-[#fff] via-40% to-[#fff]">
                    <div className="flex md:gap-10 xl:gap-20">
                      {/* Logo */}
                      <div className="flex items-center justify-center w-6/12 lg:w-4/12 xl:w-3/12">
                        <img
                          src={`${IMAGE_URL}/${brand.logo}`}
                          alt={brand.enTitle}
                          className="w-[220px] h-auto"
                        />
                      </div>
                      {/* Description */}
                      <div className="flex flex-col gap-4 pl-6 w-9/12">
                        <h2 className="text-primary font-bold text-[20px]">
                          درباره {brand.title}
                        </h2>
                        <p className="text-secondary font-medium text-[13px] leading-7 text-justify">
                          {brand.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ViewProvider>
        </SortProvider>
      </FilterProvider>
    </FiltersLogicProvider>
  );
}
