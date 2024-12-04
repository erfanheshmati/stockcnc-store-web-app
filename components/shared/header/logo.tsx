import Image from "next/image";

export default function Logo() {
  return (
    <div className="sm:hidden">
      <Image src="/icons/logo.png" alt="CNC Logo" width={86} height={12} />
    </div>
  );
}
