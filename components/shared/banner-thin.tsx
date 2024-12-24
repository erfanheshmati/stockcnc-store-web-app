import Logo1 from "./logo-1";

export default function BannerThin() {
  return (
    <div className="h-[100px] md:h-[150px] bg-[#f0f2f7] relative flex">
      {/* Banner Background Layer */}
      <div className="absolute inset-0 bg-header-background bg-center opacity-[20%]"></div>

      {/* Banner Content */}
      <div className="hidden md:flex items-center justify-center wrapper -mt-8 md:mt-0 mx-4 z-[1] relative">
        <Logo1 className="w-[200px]" />
      </div>
    </div>
  );
}
