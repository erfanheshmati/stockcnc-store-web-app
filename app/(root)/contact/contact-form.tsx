"use client";

import { BASE_URL } from "@/lib/constants";
import { notifyError, notifySuccess } from "@/lib/toast";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, phone, message } = formData;

    if (!name || !phone || !message) {
      setErrorMessage("* پر کردن تمامی فیلدها الزامی است");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        notifySuccess("پیام شما با موفقیت ارسال شد");
        // Reset form fields
        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.log((error as Error).message);
      notifyError("خطا در ارسال پیام! لطفا مجددا تلاش کنید");
    } finally {
      setIsSubmitting(false); // Reset submitting state
      setErrorMessage(null); // Reset error state
    }
  };

  return (
    <form className="flex flex-col gap-4 md:gap-6 py-6" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
        <input
          type="text"
          placeholder="* نام و نام خانوادگی"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-4 w-full md:w-1/2 rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
        />
        <input
          type="text"
          placeholder="* شماره تماس"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="p-4 w-full md:w-1/2 rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
        />
      </div>
      <div className="flex relative">
        <textarea
          rows={3}
          placeholder="* متن پیام ..."
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="p-4 w-full rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
        ></textarea>

        {errorMessage && (
          <div className="text-red-500 text-sm absolute -bottom-7">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="flex lg:justify-end mt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-fit py-4 px-16 bg-primary rounded-xl text-white font-semibold text-[15px] hover:bg-primary/90 transition-all duration-300 ease-in-out"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </div>
    </form>
  );
}
