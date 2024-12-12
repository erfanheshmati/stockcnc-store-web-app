import BannerThin from "@/components/shared/banner-thin";
import Sitemap from "./sitemap";
import Filters from "./filters";
import { ViewProvider } from "@/contexts/view-context";
import ViewSwitch from "./view-switch";
import ViewList from "./view-list";
import ViewGrid from "./view-grid";
import DialogInquiry from "../../dialog-inquiry";
import ViewMobile from "./view-mobile";
import DialogFilters from "./dialog-filters";
import ButtonsMobile from "./buttons-mobile";
import { FilterProvider } from "@/contexts/filter-context";

export default function ArchivePage() {
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
            <h2 className="text-primary font-bold text-[20px]">
              دستگاه تراش سی ان سی
            </h2>
          </div>
          {/* Content */}
          <div className="flex flex-col gap-8 pt-8 wrapper">
            {/* Buttons */}
            <ButtonsMobile />
            {/* Product View */}
            <ViewMobile />
            {/* Description */}
            <div className="flex flex-col gap-4 bg-[#618FB61A] -mx-4 px-4 py-8">
              <h2 className="text-primary font-bold text-[16px] text-center">
                دستگاه تراش سی ان سی
              </h2>
              <p className="text-secondary font-medium text-[12px] leading-7 text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد
              </p>
            </div>
          </div>
        </div>

        {/* ****************************************************************************************************************** */}

        {/* Desktop View */}
        <div className="hidden md:block relative">
          <BannerThin />
          {/* Sitemap */}
          <div className="flex items-center justify-center">
            <div className="wrapper flex items-center justify-between absolute -mt-12 z-10">
              <Sitemap />
            </div>
          </div>
          {/* Content */}
          <div className="wrapper flex flex-row md:gap-10 xl:gap-20 py-12">
            {/* Filters */}
            <div className="flex flex-col gap-8 w-5/12 lg:w-4/12 xl:w-3/12">
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
                  <h2 className="text-primary font-bold text-[24px]">
                    دستگاه تراش سی ان سی
                  </h2>
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
              {/* List */}
              <ViewList />
              {/* Grid */}
              <ViewGrid />
              {/* Description */}
              <div className="flex flex-col gap-4 border rounded-xl shadow-md p-8 mt-14">
                <h2 className="text-primary font-bold text-[20px]">
                  دستگاه تراش سی ان سی
                </h2>
                <p className="text-secondary font-medium text-[13px] leading-7 text-justify">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد
                </p>
              </div>
            </div>
          </div>
        </div>
      </FilterProvider>
    </ViewProvider>
  );
}
