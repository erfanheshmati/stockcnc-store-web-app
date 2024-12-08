export default function ContactForm() {
  return (
    <form className="flex flex-col gap-4 md:gap-6 py-6">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          className="p-4 w-full md:w-1/2 rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
        />
        <input
          type="text"
          placeholder="شماره تماس"
          className="p-4 w-full md:w-1/2 rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
        />
      </div>
      <div className="flex">
        <textarea
          placeholder="متن پیام ..."
          rows={3}
          className="p-4 w-full rounded-xl border focus:outline-none bg-gradient-to-b from-secondary/10 to-white font-medium text-[14px]"
        ></textarea>
      </div>
      <div className="flex lg:justify-end">
        <button
          type="submit"
          className="w-full md:w-fit py-4 px-16 bg-primary rounded-xl text-white font-semibold text-[15px] hover:bg-primary/90 transition-all duration-300 ease-in-out"
        >
          ارسال پیام
        </button>
      </div>
    </form>
  );
}
