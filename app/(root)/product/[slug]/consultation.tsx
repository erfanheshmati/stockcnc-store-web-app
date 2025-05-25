"use client";

import { API_URL } from "@/lib/constants";
import { notifyError, notifySuccess } from "@/lib/toast";
import { useState } from "react";
import { BiPhoneCall } from "react-icons/bi";

// Define FormData type
interface FormData {
  fullName: string;
  phone: string;
}

export default function Consultation({ productId }: { productId: string }) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fullName) {
      setError("نام و نام خانوادگی خود را وارد کنید");
      return;
    } else if (!formData.phone) {
      setError("شماره همراه خود را وارد کنید");
      return;
    } else if (formData.phone.length < 11) {
      setError("شماره همراه باید 11 رقم باشد");
      return;
    } else {
      setError(null);
      setIsSubmitting(true);
      try {
        const requestBody: Record<string, unknown> = {
          fullName: formData.fullName,
          phone: formData.phone,
          ...(productId && { product: productId }),
        };
        const response = await fetch(`${API_URL}/price-inquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) notifySuccess("استعلام قیمت با موفقیت ثبت شد");
        else notifyError("خطا در ارسال! دوباره تلاش کنید");
      } catch (err) {
        console.log((err as Error).message);
        notifyError("خطا در ارسال! دوباره تلاش کنید");
      } finally {
        setIsSubmitting(false);
        setFormData({ fullName: "", phone: "" });
      }
    }
  };

  return (
    <div className="px-10 py-8 border-r border-t rounded-xl shadow-xl">
      <div className="flex flex-col gap-4">
        {/* Heading */}
        <div className="flex items-center justify-between">
          <h3 className="text-black/70 font-bold text-[20px]">مشاوره خرید</h3>
          <BiPhoneCall size={30} />
        </div>
        {/* Form */}
        <form onSubmit={handleFormSubmit} className="mt-4">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="* نام و نام خانوادگی"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="p-4 w-full rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
            />
            <input
              type="number"
              placeholder="* شماره تماس"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-4 w-full rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
            />
            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-16 bg-primary rounded-xl text-white font-semibold text-[15px] hover:bg-primary/90 transition-all duration-300 ease-in-out"
            >
              {isSubmitting ? "در حال ارسال..." : "استعلام فوری تلفنی"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
