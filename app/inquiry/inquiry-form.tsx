"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiPhoneCall, BiX } from "react-icons/bi";

export default function InquiryForm() {
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const input = document.getElementById("numberInput") as HTMLInputElement;
    if (input) {
      input.addEventListener("input", () => {
        const maxLength = 11; // Max digits allowed
        if (input.value.length > maxLength) {
          input.value = input.value.slice(0, maxLength);
        }
      });
      // Cleanup event listener on unmount
      return () => {
        input.removeEventListener("input", () => {});
      };
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value.length < 11 && value.length !== 0) {
      setError("شماره همراه باید 11 رقم باشد");
    } else {
      setError(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phoneNumber) {
      setError("شماره همراه خود را وارد کنید");
    } else if (phoneNumber.length < 11) {
      setError("شماره همراه باید 11 رقم باشد");
    } else {
      setError(null);
      // Proceed with form submission
      alert(`Form submitted successfully with phone number: ${phoneNumber}`);
    }
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center w-full max-w-sm sm:max-w-lg px-4 mt-10 relative">
        <div className="text-primary font-bold text-[16px]">استعلام قیمت</div>
        <div className="absolute right-4 -top-2 w-9 h-9 bg-secondary/5 rounded-lg p-2">
          <Link href="/">
            <BiX size={20} className="text-secondary/60" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-5 pt-6">
          <Image
            src="/icons/inquiry.png"
            alt="Inquiry Logo"
            width={66}
            height={66}
          />
          <div className="flex flex-col items-center gap-1">
            <div className="text-[#1F2D53] font-bold text-[16px]">
              دریافت قیمت از طریق پیامک
            </div>
            <div className="text-[#536683] font-semibold text-[11px]">
              استعلام با ثبت شماره همراه در کمتر از سی دقیقه
            </div>
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full mt-8">
          <input
            type="number"
            placeholder="09..."
            id="numberInput"
            value={phoneNumber}
            onChange={handleInputChange}
            className={`px-6 py-5 w-full rounded-2xl focus:outline-none bg-gradient-to-b from-secondary/10 to-white custom-input ${
              phoneNumber.length === 11
                ? "border border-green-500"
                : phoneNumber.length === 0
                ? "border border-secondary/20"
                : "border border-red-500"
            }`}
            dir="ltr"
          />
          {error && (
            <span className="flex items-center justify-start text-red-500 text-sm pt-1">
              * {error}
            </span>
          )}
          <button
            type="submit"
            className={`px-6 py-5 flex items-center justify-center bg-primary text-white text-[14px] rounded-2xl ${
              error ? "mt-2" : "mt-8"
            }`}
          >
            ثبت و استعلام قیمت
          </button>
        </form>
        {/* Separator */}
        <div className="flex items-center w-full my-8">
          <div className="flex-grow border-t border-[#D5DFE5]"></div>
          <span className="mx-4 text-[#9FACBE]">یا</span>
          <div className="flex-grow border-t border-[#D5DFE5]"></div>
        </div>
        {/* Call Info */}
        <div className="flex flex-col items-center w-full gap-6">
          <div className="text-[#1F2D53] font-bold text-[16px] w-full text-center">
            برای اطلاع از قیمت تماس بگیرید
          </div>
          <div className="flex items-center justify-center bg-[#015BA51C] w-full p-4 rounded-2xl relative">
            <span className="text-primary font-bold text-[20px]" dir="ltr">
              021 - 33450050
            </span>
            <span className="absolute left-10">
              <BiPhoneCall size={26} color="#015BA5" />
            </span>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col w-[468px] pb-8 my-10 rounded-2xl shadow-xl relative">
        <div className="flex items-center justify-center w-full h-[76px] bg-[#BAC6D6] rounded-t-2xl">
          <div className="text-white font-semibold text-[20px]">
            استعلام قیمت
          </div>
        </div>
        <div className="absolute right-5 top-6 w-6 h-6">
          <Link href="/" className="hover:opacity-60">
            <BiX color="white" size={24} />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-5 pt-8">
          <Image
            src="/icons/inquiry.png"
            alt="Inquiry Logo"
            width={94}
            height={94}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#1F2D53] font-bold text-[18px]">
              دریافت قیمت از طریق پیامک
            </div>
            <div className="text-[#536683] font-semibold text-[13px]">
              استعلام با ثبت شماره همراه در کمتر از سی دقیقه
            </div>
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col px-12 mt-8">
          <input
            type="number"
            placeholder="09...                                                       شماره همراه خود را وارد کنید"
            id="numberInput"
            value={phoneNumber}
            onChange={handleInputChange}
            className={`p-6 w-full rounded-lg focus:outline-none bg-[#EAECF4] custom-input ${
              phoneNumber.length === 11
                ? "border border-green-500"
                : phoneNumber.length === 0
                ? ""
                : "border border-red-500"
            }`}
            dir="ltr"
          />
          {error && (
            <span className="flex items-center justify-start text-red-500 text-sm pt-1">
              * {error}
            </span>
          )}
          <button
            type="submit"
            className={`p-6 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 ease-in-out ${
              error ? "mt-[6px]" : "mt-8"
            }`}
          >
            ثبت و استعلام قیمت
          </button>
        </form>
        {/* Separator */}
        <div className="flex items-center my-8 px-12">
          <div className="flex-grow border-t border-[#D5DFE5]"></div>
          <span className="mx-4 text-[#9FACBE]">یا</span>
          <div className="flex-grow border-t border-[#D5DFE5]"></div>
        </div>
        {/* Call Info */}
        <div className="flex flex-col items-center px-12 gap-6">
          <div className="text-[#1F2D53] font-bold text-[18px] w-full text-center">
            برای اطلاع از قیمت تماس بگیرید
          </div>
          <div className="flex items-center justify-center bg-[#015BA51C] w-full p-5 rounded-lg relative">
            <span className="text-primary font-bold text-[23px]" dir="ltr">
              021 - 33450050
            </span>
            <span className="absolute left-10">
              <BiPhoneCall size={26} color="#015BA5" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
