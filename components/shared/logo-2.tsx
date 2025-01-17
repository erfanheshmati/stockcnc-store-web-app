import Link from "next/link";

export default function Logo2() {
  return (
    <Link href="/">
      <img
        src="/icons/stock-cnc.png"
        alt="Logo"
        className="w-[40px] md:w-[50px]"
      />
    </Link>
  );
}
