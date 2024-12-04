import BannerThin from "@/components/shared/banner-thin";
import { APP_TITLE } from "@/lib/constants";
import { membersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";

export const metadata = {
  title: `درباره ما - ${APP_TITLE}`,
};

export default function AboutPage() {
  return (
    <>
      {/* Mobile View */}
      <div className="relative block md:hidden">
        <BannerThin />
        {/* Banner Signature */}
        <div>
          <Image
            src="/images/banner-logo.png"
            alt="Banner Logo"
            width={64}
            height={64}
            className="absolute top-[120px] left-[10%] z-[2]"
          />
          <Image
            src="/images/squiggle.png"
            alt="Banner Squiggle"
            width={80}
            height={62}
            className="absolute top-[150px] left-[8%] z-[-1]"
          />
        </div>
        {/* Page Content */}
        <div className="wrapper-about flex flex-col items-center py-10">
          <h2 className="text-primary font-bold text-[22px] mb-8">درباره ما</h2>
          {/* Section 1 */}
          <h3 className="text-primary font-bold text-[16px] border-t border-b w-full text-center py-4">
            درباره شرکت
          </h3>
          <div className="flex flex-col items-center gap-4 py-6">
            <p className="text-[#121215] font-semibold text-[11px] text-justify leading-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
              جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
              فارسی ایجاد کرده است...
            </p>
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/about.png"
                alt="About Image"
                width={895}
                height={216}
              />
              <Image
                src="/icons/logo-white.png"
                alt="About Image Logo"
                width={80}
                height={80}
                className="absolute"
              />
            </div>
          </div>
          {/* Section 2 */}
          <h3 className="text-primary font-bold text-[16px] border-t border-b w-full text-center py-4">
            فروش عمده
          </h3>
          <p className="text-[#121215] font-semibold text-[11px] text-justify leading-6 py-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرده است...
          </p>
          {/* Section 3 */}
          <h3 className="text-primary font-bold text-[16px] border-t border-b w-full text-center py-4">
            واردات دستگاه های سی ان سی
          </h3>
          <p className="text-[#121215] font-semibold text-[11px] text-justify leading-6 py-6">
            نظر به درخواست زیاد از جانب مشتریان برای خرید محصولات شرکت، یدک صدرا
            اقدام به راه اندازی فروشگاه اینترنتی خود نمود تا هزینه و زمان دسترسی
            مشتریان مصرف کننده گرامی کاهش یابد و با اطمینان بیشتر خرید کنند.
          </p>
          {/* Section 4 */}
          <h3 className="text-primary font-bold text-[16px] border-t border-b w-full text-center py-4">
            اعضای شرکت
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-0 py-6 w-full">
            {membersData.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center gap-3 rounded-2xl px-6 py-6"
                style={{ boxShadow: "34px -4px 79px -18px rgba(0,0,0,0.1)" }}
              >
                <div className="relative">
                  <Image
                    src={member.image}
                    alt="Member Image"
                    width={55}
                    height={55}
                  />
                  <Image
                    src="/icons/icon.png"
                    alt="Member Icon"
                    width={16}
                    height={16}
                    className="absolute left-0 top-0"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-black font-semibold text-[12px]">
                    {member.name}
                  </span>
                  <span className="text-secondary font-semibold text-[10px] line-clamp-1">
                    {member.position}
                  </span>
                </div>
                <hr className="w-full" />
                <div className="flex items-center justify-between w-full">
                  <Link href={member.twitter}>
                    <SlSocialTwitter
                      size={15}
                      className="text-secondary hover:text-cyan-500 transition-colors duration-300 ease-in-out"
                    />
                  </Link>
                  <Link href={member.telegram}>
                    <PiTelegramLogo
                      size={15}
                      className="text-secondary hover:text-blue-600 transition-colors duration-300 ease-in-out"
                    />
                  </Link>
                  <Link href={member.instagram}>
                    <SlSocialInstagram
                      size={15}
                      className="text-secondary hover:text-pink-800 transition-colors duration-300 ease-in-out"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="relative hidden md:block">
        <BannerThin />
        {/* Banner Signature */}
        <div>
          <Image
            src="/images/banner-logo.png"
            alt="Banner Logo"
            width={84}
            height={84}
            className="absolute top-28 left-[18%] z-[2]"
          />
          <Image
            src="/images/squiggle.png"
            alt="Banner Squiggle"
            width={110}
            height={82}
            className="absolute top-40 left-[15%] lg:left-[16%] z-[1]"
          />
        </div>
        {/* Page Layer Top-Right */}
        <div className="relative hidden xl:flex">
          <Image
            src="/images/circle-right.png"
            alt="Page Layer"
            width={220}
            height={220}
            className="absolute right-0 top-40"
          />
        </div>
        {/* Page Content */}
        <div className="wrapper-about flex flex-col items-center py-16">
          <h2 className="text-primary font-bold text-[32px] mb-10">
            درباره ما
          </h2>
          {/* Section 1 */}
          <div className="flex items-center gap-6 w-full">
            <Image
              src="/icons/title-icon.png"
              alt="Title Icon"
              width={16}
              height={16}
            />
            <h3 className="text-secondary font-bold text-[20px] border-t border-b w-full py-6">
              درباره شرکت
            </h3>
          </div>
          <div className="flex flex-col items-center gap-5 w-full border-r border-dashed mr-3 py-6 pr-9 pl-3">
            <p className="text-[#121215] font-semibold text-[13px] text-justify leading-8">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
              جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
              فارسی ایجاد کرده است...
            </p>
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/about.png"
                alt="About Image"
                width={895}
                height={216}
              />
              <Image
                src="/icons/logo-white.png"
                alt="About Image Logo"
                width={80}
                height={80}
                className="absolute"
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className="flex items-center gap-6 w-full">
            <Image
              src="/icons/title-icon.png"
              alt="Title Icon"
              width={16}
              height={16}
            />
            <h3 className="text-secondary font-bold text-[20px] border-t border-b w-full py-6">
              فروش عمده
            </h3>
          </div>
          <div className="flex flex-col items-center gap-5 w-full border-r border-dashed mr-3 py-6 pr-9 pl-3">
            <p className="text-[#121215] font-semibold text-[13px] text-justify leading-8">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
              جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
              فارسی ایجاد کرده است...
            </p>
          </div>
          {/* Section 3 */}
          <div className="flex items-center gap-6 w-full">
            <Image
              src="/icons/title-icon.png"
              alt="Title Icon"
              width={16}
              height={16}
            />
            <h3 className="text-secondary font-bold text-[20px] border-t border-b w-full py-6">
              واردات دستگاه های سی ان سی
            </h3>
          </div>
          <div className="flex flex-col items-center gap-5 w-full border-r border-dashed mr-3 py-6 pr-9 pl-3">
            <p className="text-[#121215] font-semibold text-[13px] text-justify leading-8">
              نظر به درخواست زیاد از جانب مشتریان برای خرید محصولات شرکت، یدک
              صدرا اقدام به راه اندازی فروشگاه اینترنتی خود نمود تا هزینه و زمان
              دسترسی مشتریان مصرف کننده گرامی کاهش یابد و با اطمینان بیشتر خرید
              کنند.
            </p>
          </div>
          {/* Section 4 */}
          <div className="flex items-center gap-6 w-full">
            <Image
              src="/icons/title-icon.png"
              alt="Title Icon"
              width={16}
              height={16}
            />
            <h3 className="text-secondary font-bold text-[20px] border-t border-b w-full py-6">
              اعضای شرکت
            </h3>
          </div>
          <div className="flex flex-col items-center w-full mr-3 py-8 pr-9 pl-3">
            <div className="flex items-center">
              {membersData.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center gap-6 rounded-2xl px-10 py-10"
                  style={{ boxShadow: "34px -4px 79px -18px rgba(0,0,0,0.1)" }}
                >
                  <div className="relative">
                    <Image
                      src={member.image}
                      alt="Member Image"
                      width={100}
                      height={100}
                    />
                    <Image
                      src="/icons/icon.png"
                      alt="Member Icon"
                      width={30}
                      height={30}
                      className="absolute left-0.5 top-0.5"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-black font-semibold text-[16px]">
                      {member.name}
                    </span>
                    <span className="text-secondary font-semibold text-[12px] line-clamp-1">
                      {member.position}
                    </span>
                  </div>
                  <hr className="w-full" />
                  <div className="flex items-center justify-between w-full">
                    <Link href={member.twitter}>
                      <SlSocialTwitter
                        size={20}
                        className="text-secondary hover:text-cyan-500 transition-colors duration-300 ease-in-out"
                      />
                    </Link>
                    <Link href={member.telegram}>
                      <PiTelegramLogo
                        size={20}
                        className="text-secondary hover:text-blue-600 transition-colors duration-300 ease-in-out"
                      />
                    </Link>
                    <Link href={member.instagram}>
                      <SlSocialInstagram
                        size={20}
                        className="text-secondary hover:text-pink-800 transition-colors duration-300 ease-in-out"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Page Layer Bottom-Left */}
        <div className="relative hidden xl:flex">
          <Image
            src="/images/circle-left.png"
            alt="Page Layer"
            width={220}
            height={220}
            className="absolute left-0 bottom-40"
          />
        </div>
      </div>
    </>
  );
}
