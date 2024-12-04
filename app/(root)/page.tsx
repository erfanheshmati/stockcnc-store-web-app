import Banner from "@/components/shared/home/banner";
import Blogs from "@/components/shared/home/blogs";
import Brands from "@/components/shared/home/brands";
import Categories from "@/components/shared/home/categories";
import Consultation from "@/components/shared/home/consultation";
import Helps from "@/components/shared/home/helps";
import Inquire from "@/components/shared/home/inquire";
import Products from "@/components/shared/home/products";
import Search from "@/components/shared/home/search";

export default function Home() {
  return (
    <div className="relative">
      <Banner>
        <Search />
      </Banner>
      <div className="wrapper">
        <Categories />
        <Consultation />
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 mt-10 mb-2 md:mt-24 md:wrapper -mx-4 md:mx-0">
          <Brands />
          <Products />
        </div>
        <Inquire />
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 mt-10 mb-4 md:my-24 md:wrapper -mx-4 md:mx-0">
          <Helps />
          <Blogs />
        </div>
      </div>
    </div>
  );
}
