import Image from "next/image";

export default function BannerThin() {
  return (
    <div className="h-[156px] bg-[#f0f2f7] relative flex">
      {/* Banner Background Layer */}
      <div className="absolute inset-0 bg-header-background bg-center bg-cover opacity-[20%]"></div>

      {/* Banner Content */}
      <div className="flex mt-12 justify-center wrapper mx-4 z-[1] relative">
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/icons/logo-blue.png"
            alt="Logo Icon"
            width={195}
            height={27}
          />
          <Image
            src="/icons/cnc-stock.png"
            alt="CNC Stock"
            width={95}
            height={25}
          />
        </div>
      </div>
    </div>
  );
}
