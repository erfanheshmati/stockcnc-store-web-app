import BannerThin from "@/components/shared/banner-thin";
import { ViewProvider } from "@/contexts/view-context";
import { FilterProvider } from "@/contexts/filter-context";
import { BASE_URL } from "@/lib/constants";
import DialogInquiry from "../dialog-inquiry";
import DialogFilters from "../archiv/[slug]/dialog-filters";
import ButtonsMobile from "../archiv/[slug]/buttons-mobile";
import ViewMobile from "../archiv/[slug]/view-mobile";
import Filters from "../archiv/[slug]/filters";
import ViewSwitch from "../archiv/[slug]/view-switch";
import ViewList from "../archiv/[slug]/view-list";
import ViewGrid from "../archiv/[slug]/view-grid";
import { Product } from "@/lib/types";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const searchQuery = searchParams?.search || "محصولات";

  const res = await fetch(`${BASE_URL}/web-text-plans`);
  const info = await res.json();

  if (!res.ok) {
    return {
      title: "خطا در دریافت اطلاعات",
    };
  }

  return {
    title: `${searchQuery} - ${info.title}`,
    description: info.archiveProductMetaData,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const searchQuery = searchParams?.search || "";
  const catQuery = searchParams?.cat || "";
  let error: string | null = null;

  const res = await fetch(`${BASE_URL}/product`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");

  const productsData = await res.json();

  // Normalize the search query by replacing any extra spaces with a single space
  const normalizedSearchQuery = searchQuery.replace(/\s+/g, " ").trim();

  // Split by space and handle search query parts
  const searchParts = normalizedSearchQuery.split(" ");

  const productsList = productsData.docs.filter((product: Product) => {
    return (
      searchParts.some((part) => {
        return (
          product.title.includes(part) ||
          product.description.includes(part) ||
          product.enTitle.includes(part) ||
          product.country.title.includes(part) ||
          product.brand.title.includes(part) ||
          product.brand.enTitle.includes(part) ||
          product.options.includes(part) ||
          product.yearOfManufacture.includes(part) ||
          product.condition.includes(part)
        );
      }) && product.category._id.includes(catQuery)
    );
  });

  if (productsList.length === 0) {
    error = "جستجو بی نتیجه بود";
  }

  return (
    <ViewProvider>
      <FilterProvider>
        <DialogInquiry />
        <DialogFilters />

        {/* Mobile View */}
        <div className="block md:hidden relative">
          <BannerThin />
          {/* Heading */}
          <div className="absolute w-full flex justify-center top-24">
            <h1 className="text-primary font-bold text-[20px]">
              {searchQuery || "محصولات سی ان سی استوک"}
            </h1>
          </div>
          {/* Content */}
          <div className="flex flex-col gap-8 pt-8 wrapper min-h-screen">
            {/* Buttons */}
            <ButtonsMobile />
            {/* Error */}
            {error ? (
              <div className="flex items-start justify-center pt-20 h-full text-secondary text-sm">
                {error}
              </div>
            ) : (
              <>
                {/* Product View */}
                <ViewMobile productsList={productsList} />
              </>
            )}
          </div>
        </div>

        {/* ****************************************************************************************************************** */}

        {/* Desktop View */}
        <div className="hidden md:block relative">
          <BannerThin />
          {/* Content */}
          <div className="wrapper flex flex-row md:gap-10 xl:gap-20 py-12">
            {/* Filters */}
            <div className="flex flex-col gap-8 w-5/12 lg:w-4/12 xl:w-3/12">
              <h3 className="text-secondary font-semibold text-[20px]">
                فیلترها
              </h3>
              <Filters productsList={productsList} />
            </div>
            {/* Product View */}
            <div className="flex flex-col w-9/12 min-h-screen">
              {/* Heading */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-primary font-bold text-[24px]">
                    {searchQuery || "محصولات سی ان سی استوک"}
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-secondary font-medium text-[14px] hover:font-semibold cursor-pointer">
                    جدیدترین
                  </span>
                  <span className="text-secondary font-medium text-[14px] hover:font-semibold cursor-pointer">
                    محبوب ترین
                  </span>
                </div>
                <ViewSwitch />
              </div>
              {/* Error */}
              {error ? (
                <div className="flex items-start justify-center pt-20 h-full text-secondary text-sm">
                  {error}
                </div>
              ) : (
                <>
                  {/* List */}
                  <ViewList productsList={productsList} />
                  {/* Grid */}
                  <ViewGrid productsList={productsList} />
                </>
              )}
            </div>
          </div>
        </div>
      </FilterProvider>
    </ViewProvider>
  );
}
