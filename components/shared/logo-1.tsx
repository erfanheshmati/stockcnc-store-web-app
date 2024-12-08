import Image from "next/image";

export default function Logo1() {
  return (
    <Image
      src="/icons/logo-1.png"
      alt="Logo Icon"
      width={282}
      height={74}
      className="w-[100px] sm:w-[122px] md:w-[222px]"
    />
  );
}
