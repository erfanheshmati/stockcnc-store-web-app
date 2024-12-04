"use client";

import Image from "next/image";
import { useState } from "react";
import { BiChevronDown, BiRotateLeft } from "react-icons/bi";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const mostSearchedItems = [
    "ماشین های تراش",
    "ماشین های فرز",
    "ماشین های بورینگ",
    "ماشین های سنتر",
    "ماشین های پانچ",
  ];

  // Filter suggestions based on user input
  const handleInputChange = (e: { target: { value: string } }) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input) {
      setSuggestions(
        mostSearchedItems.filter((item) =>
          item.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  return (
    // <div className="flex w-[328px] sm:w-[500px] md:w-[740px] lg:w-[995px] h-[75px] md:h-[92px] bg-white shadow-lg rounded-2xl absolute -bottom-8 md:-bottom-11">
    <div className="flex w-full md:w-[740px] lg:w-[995px] h-[75px] md:h-[92px] bg-white shadow-lg rounded-2xl absolute -bottom-8 md:-bottom-11">
      <form className="flex items-center justify-between gap-4 md:gap-14 xl:gap-16 w-full px-6 md:px-10">
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
            className="wrapper flex items-center gap-4 md:max-w-[730px] lg:max-w-4xl min-h-[50px] overflow-x-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            {/* {suggestions.map((item, index) => ( */}
            {mostSearchedItems.map((item, index) => (
              <li
                key={index}
                className="min-w-fit py-3 px-4 sm:px-6 md:px-8 text-[#6B7F8E] text-[12px] lg:text-[14px] lg:border border-[#E6E9F2] bg-[#F1F3F8] lg:bg-white lg:hover:bg-gradient-to-tl from-[#eceff1] via-[#fefefe] to-[#fff] rounded-md cursor-pointer"
                onClick={() => setSearchInput(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* )} */}
        <div className="relative">
          <select
            name=""
            id=""
            className="hidden md:flex px-4 focus:outline-none text-[14px] min-w-[150px] h-[55px] rounded-3xl border-l border-t text-[#536683] cursor-pointer appearance-none"
          >
            <option value="">دسته بندی</option>
            <option value="">ماشین های تراش</option>
            <option value="">ماشین های فرز</option>
            <option value="">ماشین های بورینگ</option>
            <option value="">ماشین های سنتر</option>
            <option value="">ماشین های پانچ</option>
          </select>
          {/* Custom Arrow Icon */}
          <div className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none">
            <BiChevronDown />
          </div>
        </div>
        <button className="min-w-[62px]">
          <Image
            src="/icons/search.png"
            alt="Search Icon"
            width={62}
            height={42}
          />
        </button>
      </form>
    </div>
  );
}
