import BannerThin from "@/components/shared/banner-thin";
import { API_URL } from "@/lib/constants";
import Sitemap from "./site-map";
import { Brand } from "@/lib/types";
import BrandCard from "./brand-card";

export default async function BrandsPage() {
  const res = await fetch(`${API_URL}/brand`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");

  const brandsData = await res.json();

  return (
    <div className="relative">
      <BannerThin />
      {/* Mobile Heading */}
      <div className="flex md:hidden justify-center absolute w-full top-10">
        <h1 className="text-primary font-bold text-[20px]">برندهای موجود</h1>
      </div>
      {/* Sitemap */}
      <div className="hidden md:flex items-center justify-center">
        <div className="wrapper flex items-center justify-between absolute -mt-12 z-10">
          <Sitemap />
        </div>
      </div>
      {/* Content */}
      <div className="wrapper flex gap-10 lg:gap-20 py-6 md:py-12">
        <div className="flex flex-col w-full min-h-screen">
          {/* Desktop Heading */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-primary font-bold text-[24px]">
                برندهای موجود
              </h2>
            </div>
          </div>
          {/* Brands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 md:py-6">
            {brandsData.map((brand: Brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
