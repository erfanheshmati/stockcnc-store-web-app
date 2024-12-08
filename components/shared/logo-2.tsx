import Image from "next/image";

export default function Logo2() {
  return (
    <Image
      src="/icons/logo-2.png"
      alt="Logo Icon"
      width={276}
      height={194}
      className="w-[90px] md:w-[252px]"
    />
  );
}
