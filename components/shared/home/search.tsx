"use client";

import { BASE_URL } from "@/lib/constants";
import { Category, MostSearch } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronDown, BiRotateLeft } from "react-icons/bi";

export default function Search() {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [mostSearchesData, setMostSearchesData] = useState<MostSearch[]>([]);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/category`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        if (!data.categories) throw new Error("اطلاعاتی یافت نشد!");
        setCategoriesData(data.categories);
        setMostSearchesData(data.search);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchCategoriesData();
  }, []);

  const handleInputChange = (e: { target: { value: string } }) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input) {
      setSuggestions(
        mostSearchesData
          .map((item) => item.title)
          .filter((item) => item.toLowerCase().includes(input.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchInput.trim()) {
      queryParams.append("search", searchInput.trim());
      if (selectedCategory) {
        queryParams.append("category", selectedCategory);
      }
      router.push(`/archiv?${queryParams.toString()}`);
    }
  };

  const handleMostSearchClick = (itemTitle: string) => {
    setSearchInput(itemTitle);
    const event = { preventDefault: () => {} } as React.FormEvent;
    handleSearch(event);
  };

  const filteredData = categoriesData.slice(0, -1);

  return (
    <div className="flex w-[90%] md:w-[740px] lg:w-[995px] h-[75px] md:h-[92px] bg-white shadow-lg rounded-2xl absolute -bottom-8 md:-bottom-11 z-[1]">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-between gap-4 md:gap-14 xl:gap-16 w-full px-6 md:px-10"
      >
        <input
          type="text"
          placeholder="نام یا مشخصات دستگاه را وارد کنید ..."
          value={searchInput}
          onChange={handleInputChange}
          className="w-full focus:outline-none text-[13px] md:text-[15px]"
        />
        {/* Suggestions Dropdown */}
        {/* {suggestions.length > 0 && ( */}
        <div className="absolute inset-0 top-24 md:top-32 lg:top-36 flex flex-col lg:flex-row items-center justify-start gap-4 2xl:px-2">
          <span className="min-w-fit flex items-center gap-2 text-[#92A0B7] text-[13px] lg:text-[15px]">
            <BiRotateLeft size={24} />
            پر جستجو ترین ها
          </span>
          <ul
            className="wrapper flex items-center gap-4 sm:gap-8 lg:gap-4 md:max-w-[730px] lg:max-w-4xl min-h-[50px] overflow-x-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            {/* {suggestions.map((item, index) => ( */}
            {mostSearchesData.map((item) => (
              <li
                key={item._id}
                className="min-w-fit py-3 px-4 sm:px-6 md:px-8 text-[#6B7F8E] text-[12px] lg:text-[14px] lg:border border-[#E6E9F2] bg-[#F1F3F8] lg:bg-white lg:hover:bg-gradient-to-tl from-[#eceff1] via-[#fefefe] to-[#fff] rounded-md cursor-pointer"
                onClick={() => handleMostSearchClick(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        {/* )} */}
        <div className="relative">
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="hidden md:flex px-4 focus:outline-none text-[14px] min-w-[150px] h-[55px] rounded-3xl border-l border-t text-[#536683] cursor-pointer appearance-none"
          >
            <option value="">دسته بندی</option>

            {error && (
              <option className="text-red-500 text-center w-full mt-6">
                {error}
              </option>
            )}

            {!error &&
              filteredData.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.title}
                </option>
              ))}
          </select>
          {/* Custom Arrow Icon */}
          <div className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none">
            <BiChevronDown />
          </div>
        </div>
        <button className="min-w-[62px]">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="62"
            height="42"
            viewBox="0 0 115 32"
            className="group"
          >
            <path
              fill="#8898af"
              d="M1.939 26.224h7.991c0.176 0 0.37 0 0.579 0 0.221 0 0.436-0.016 0.645-0.049 0.221-0.022 0.436-0.066 0.645-0.132 0.21-0.055 0.397-0.149 0.563-0.281 0.43-0.364 0.695-0.794 0.794-1.29h-5.741c-0.463 0-0.943-0.017-1.439-0.050-0.485-0.044-0.965-0.138-1.439-0.281-0.463-0.154-0.91-0.38-1.34-0.678-0.419-0.309-0.794-0.728-1.125-1.257-0.496-0.761-0.855-1.688-1.075-2.779-0.21-1.103-0.314-2.437-0.314-4.004 0-0.871 0.033-1.643 0.099-2.316s0.171-1.274 0.314-1.803c0.154-0.529 0.342-1.004 0.563-1.423 0.232-0.419 0.513-0.816 0.844-1.191 0.342-0.397 0.695-0.733 1.059-1.009 0.375-0.276 0.789-0.502 1.241-0.678s0.954-0.303 1.506-0.381c0.551-0.077 1.18-0.116 1.886-0.116h7.395c0.265 0 0.529 0.005 0.794 0.017 0.276 0.011 0.551 0.044 0.827 0.099s0.54 0.138 0.794 0.248c0.265 0.11 0.513 0.265 0.744 0.463s0.414 0.414 0.546 0.645c0.132 0.232 0.237 0.469 0.314 0.711 0.077 0.232 0.127 0.469 0.149 0.711 0.022 0.232 0.033 0.447 0.033 0.645v9.877h2.432v4.55h-2.498c-0.088 0.728-0.237 1.395-0.447 2.002-0.199 0.618-0.502 1.191-0.91 1.72-0.684 0.871-1.572 1.483-2.664 1.836-1.092 0.364-2.327 0.546-3.706 0.546h-10.059v-4.351zM13.156 12.741c0-0.254-0.033-0.469-0.099-0.645-0.055-0.176-0.193-0.342-0.414-0.496-0.188-0.121-0.364-0.199-0.529-0.232s-0.342-0.050-0.529-0.050h-0.745c-0.232 0-0.469 0.011-0.711 0.033-0.243 0.011-0.48 0.050-0.711 0.116s-0.452 0.165-0.662 0.298c-0.21 0.132-0.403 0.314-0.579 0.546-0.077 0.088-0.16 0.215-0.248 0.381-0.077 0.154-0.154 0.364-0.232 0.629-0.066 0.254-0.121 0.574-0.165 0.96-0.044 0.375-0.066 0.833-0.066 1.373 0 0.805 0.055 1.494 0.165 2.068 0.121 0.574 0.309 0.993 0.562 1.257 0.21 0.254 0.441 0.447 0.695 0.579 0.265 0.121 0.529 0.21 0.794 0.265 0.276 0.044 0.546 0.072 0.811 0.083 0.276 0 0.529 0 0.761 0h1.903v-7.164zM21.908 19.938h12.971v-4.351c0-0.463-0.022-0.882-0.066-1.257s-0.121-0.744-0.232-1.108c-0.177-0.574-0.513-1.081-1.009-1.522-0.485-0.43-1.291-0.645-2.415-0.645h-6.568v-4.533h9.645c1.092 0 2.090 0.132 2.994 0.397 0.916 0.254 1.726 0.739 2.432 1.456 0.474 0.474 0.844 1.004 1.109 1.588 0.276 0.585 0.48 1.197 0.612 1.836s0.209 1.296 0.232 1.969c0.033 0.662 0.050 1.318 0.050 1.969v4.202h3.458v4.533h-23.211v-4.533zM28.278 30.427v-3.954h6.634v3.954h-6.634zM56.121 12.774l0.033-0.033v2.482c0 0.529 0.050 1.103 0.149 1.721 0.099 0.607 0.342 1.175 0.728 1.704 0.209 0.287 0.441 0.513 0.695 0.678 0.265 0.165 0.535 0.298 0.811 0.397 0.287 0.088 0.584 0.149 0.893 0.182 0.309 0.022 0.629 0.033 0.959 0.033h0.579v4.533h-2.68c-0.364 0-0.761-0.005-1.191-0.017-0.43-0.022-0.899-0.055-1.406-0.099-1.004-0.077-1.969-0.342-2.895-0.794-0.926 0.452-1.886 0.717-2.879 0.794-0.496 0.044-0.96 0.077-1.39 0.099-0.43 0.011-0.827 0.017-1.191 0.017h-2.564v-4.533h0.463c0.331 0 0.651-0.011 0.96-0.033 0.309-0.033 0.607-0.094 0.893-0.182 0.287-0.099 0.552-0.232 0.794-0.397 0.254-0.165 0.491-0.392 0.711-0.678 0.386-0.529 0.629-1.097 0.728-1.704 0.099-0.618 0.149-1.191 0.149-1.721v-8.669h6.651v6.221zM53.541 4.717v-3.971h6.651v3.971h-6.651zM45.517 4.717v-3.971h6.634v3.971h-6.634zM60.555 19.938h2.945v-13.417h6.535v13.417h3.789v-13.417h6.584v13.417h2.812c0.11 0 0.248-0.028 0.414-0.083 0.176-0.066 0.298-0.143 0.364-0.232 0.044-0.088 0.072-0.215 0.083-0.38 0.011-0.177 0.017-0.342 0.017-0.496v-12.226h6.601v13.417h2.283v4.533h-32.427v-4.533zM92.651 19.938h12.971v-4.351c0-0.463-0.022-0.882-0.066-1.257s-0.121-0.744-0.232-1.108c-0.176-0.574-0.513-1.081-1.009-1.522-0.485-0.43-1.291-0.645-2.415-0.645h-6.568v-4.533h9.645c1.092 0 2.090 0.132 2.994 0.397 0.915 0.254 1.726 0.739 2.432 1.456 0.474 0.474 0.844 1.004 1.108 1.588 0.276 0.585 0.48 1.197 0.612 1.836s0.21 1.296 0.232 1.969c0.033 0.662 0.049 1.318 0.049 1.969v4.202h2.366v4.533h-22.12v-4.533zM99.020 30.427v-3.954h6.634v3.954h-6.634z"
              className="group-hover:fill-primary transition-all duration-300 ease-in-out"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
