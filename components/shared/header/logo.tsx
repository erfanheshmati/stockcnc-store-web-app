import Link from "next/link";

export default function Logo() {
  return (
    <div className="md:hidden z-[2]">
      <Link href="/"></Link>
    </div>
  );
}
