import About from "./about";
import BackToTop from "./back-to-top";
import Copyright from "./copyright";
import Info from "./info";
import Links from "./links";
import Price from "./price";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary relative">
      {/* Footer Background Layer */}
      <div className="absolute inset-0 bg-header-background bg-center md:bg-cover opacity-[2%]"></div>

      {/* Mobile Content */}
      <div className="md:hidden flex flex-col py-8 px-4 space-y-8">
        <div className="flex mx-auto">
          <Price />
        </div>
        <div className="flex mx-auto">
          <Info />
        </div>
        <div className="flex mx-auto">
          <Copyright />
        </div>
      </div>

      {/* Desktop Content */}
      <div className="wrapper py-10 space-y-10 hidden md:block">
        <div className="flex justify-between">
          <About />
          <Links />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Info />
          <Price />
        </div>
        <div className="flex items-center justify-center relative">
          <Copyright />
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
