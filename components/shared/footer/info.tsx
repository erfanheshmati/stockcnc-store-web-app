"use client";

import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiAward, BiChevronDown } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { LiaTelegramPlane } from "react-icons/lia";

export default function Info() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [address, setAddress] = useState<string | null>();
  const [telephone, setTelephone] = useState<string | null>();
  const [mobile, setMobile] = useState<string | null>();
  const [aboutUs, setAboutUs] = useState<string | null>();
  const [telegram, setTelegram] = useState<string | null>();
  const [instagram, setInstagram] = useState<string | null>();
  const [whatsapp, setWhatsapp] = useState<string | null>();

  useEffect(() => {
    const fetchFooterInfo = async () => {
      try {
        const res = await fetch(`${BASE_URL}/web-text-plans`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
        const data = await res.json();
        setAddress(data.address);
        setTelephone(data.telephone);
        setMobile(data.mobile);
        setAboutUs(data.footerAboutUs);
        setTelegram(data.telegram);
        setInstagram(data.instagram);
        setWhatsapp(data.whatsapp);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchFooterInfo();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    {
      title: "شماره های تماس",
      content: `${telephone} | ${mobile}`,
      telegram: "",
      instagram: "",
      whatsapp: "",
    },
    {
      title: "نشانی ما",
      content: `${address}`,
      telegram: "",
      instagram: "",
      whatsapp: "",
    },
    {
      title: "درباره ما",
      content: `${aboutUs}`,
      telegram: "",
      instagram: "",
      whatsapp: "",
    },
    {
      title: "ما در شبکه های اجتماعی",
      content: "",
      telegram: `${telegram}`,
      instagram: `${instagram}`,
      whatsapp: `${whatsapp}`,
    },
  ];

  return (
    <>
      {/* Mobile Mode */}
      <div className="md:hidden max-w-md px-4">
        {accordionItems.map((item, index) => (
          <div key={index} className="border-b border-white/10 pb-2 mt-2">
            {/* Accordion Title */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-4 py-2 cursor-pointer"
            >
              <div className="flex items-center justify-between w-full z-[9]">
                <span className="text-white font-bold text-[13px] pointer-events-none">
                  {item.title}
                </span>
                <div className="flex items-center">
                  <BiChevronDown
                    color="#00D45A"
                    width={5}
                    height={8}
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </button>
            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="p-4 text-white/50 text-[12px] leading-6 text-justify">
                {item.content}
                {index === accordionItems.length - 1 && (
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.telegram}
                      target="_blank"
                      className="flex items-center justify-center w-[80px] h-[54px] bg-gradient-to-l from-[#5d6d85] to-secondary rounded-3xl shadow-lg border-l border-white/30 z-10"
                    >
                      <LiaTelegramPlane size={25} className="text-white" />
                    </Link>
                    <Link
                      href={item.whatsapp}
                      target="_blank"
                      className="flex items-center justify-center w-[80px] h-[54px] bg-gradient-to-l from-[#5d6d85] to-secondary rounded-3xl shadow-lg border-l border-white/30 z-10"
                    >
                      <FaWhatsapp size={25} className="text-white" />
                    </Link>
                    <Link
                      href={item.instagram}
                      target="_blank"
                      className="flex items-center justify-center w-[80px] h-[54px] bg-gradient-to-l from-[#5d6d85] to-secondary rounded-3xl shadow-lg border-l border-white/30 z-10"
                    >
                      <IoLogoInstagram size={25} className="text-white" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* **************************************************************************************************************** */}

      {/* Desktop Mode */}
      <div className="hidden md:flex justify-center w-[1028px] h-[95px] bg-gradient-to-r from-[#5d6d85] to-[#4b5b72] rounded-full shadow-lg border-t border-r border-white/30 z-10">
        <div className="flex items-center justify-around w-full">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-5">
              <BiAward size={24} color="#00D45A" />
              <div className="flex flex-col">
                <span className="text-white/50 text-[13px]">
                  نشانی دفتر مرکزی
                </span>
                <span className="text-white font-bold text-[14px]">
                  {address}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <BiAward size={24} color="#00D45A" />
              <div className="flex flex-col">
                <span className="text-white/50 text-[13px]">
                  شماره های تماس
                </span>
                <div className="flex items-center gap-5">
                  <span className="text-white font-bold text-[16px]">
                    {telephone}
                  </span>
                  <span className="text-white text-[16px]">|</span>
                  <span className="text-white font-bold text-[16px]">
                    {mobile}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Link href={`${telegram}`} target="_blank">
              <LiaTelegramPlane
                size={30}
                className="text-white hover:text-blue-400 transition-colors duration-300 ease-in-out"
              />
            </Link>
            <Link href={`${whatsapp}`} target="_blank">
              <FaWhatsapp
                size={30}
                className="text-white hover:text-green-500 transition-colors duration-300 ease-in-out"
              />
            </Link>
            <Link href={`${instagram}`} target="_blank">
              <IoLogoInstagram
                size={30}
                className="text-white hover:text-pink-600 transition-colors duration-300 ease-in-out"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
