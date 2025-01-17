import Logo2 from "../logo-2";

export default function Logo() {
  return (
    <div className="md:hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2]">
      <Logo2 />
    </div>
  );
}
