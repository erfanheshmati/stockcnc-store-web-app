import Info from "./info";
import Logo from "./logo";
import Menu from "./menu";

export default function Header() {
  return (
    <header className="w-full bg-[#536683] relative">
      {/* Header Background Layer */}
      <div className="absolute inset-0 bg-header-background bg-center opacity-[2%]"></div>

      {/* Navigation Bar */}
      <div className="wrapper flex items-center justify-between h-[58px] sm:h-[76px]">
        <Menu />
        <Logo />
        <Info />
      </div>
    </header>
  );
}
