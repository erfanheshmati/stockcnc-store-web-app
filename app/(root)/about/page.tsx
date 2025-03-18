import BannerThin from "@/components/shared/banner-thin";
import { BASE_URL, IMAGE_URL } from "@/lib/constants";
import Link from "next/link";
import { PiTelegramLogo, PiWhatsappLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import DialogInquiry from "../dialog-inquiry";
import { AboutUsMember } from "@/lib/types";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

export async function generateMetadata() {
  const res = await fetch(`${BASE_URL}/web-text-plans`);
  const data = await res.json();

  if (!res.ok) {
    return { title: "خطا در دریافت اطلاعات" };
  }

  return {
    title: `${data.aboutUsSeoTitle} - ${data.title}`,
    description: data.aboutUsMetaData,
  };
}

export default async function AboutPage() {
  const res = await fetch(`${BASE_URL}/web-text-plans`, { cache: "no-store" });
  const data = await res.json();
  const aboutUsTitle = data.aboutUsTitle;
  const aboutUsHtmlContent = data.aboutUsHtmlContent;
  const aboutUsMembers = data.aboutUsMembers;

  const sanitizedContent =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(aboutUsHtmlContent)
      : aboutUsHtmlContent;

  return (
    <>
      <DialogInquiry />

      {/* Mobile View */}
      <div className="relative block md:hidden">
        <BannerThin />
        {/* Banner Signature */}
        <div>
          <img
            src="/icons/stock-cnc-blue.png"
            alt="icon"
            width={48}
            height={48}
            className="absolute top-[72px] left-[11%] z-[2]"
          />
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="62"
            viewBox="0 0 42 32"
            className="absolute top-24 left-[6%] z-[-1]"
          >
            <path
              fill="#e8ecf3"
              d="M34.824 1.412c-0.914 0.324-1.834 0.633-2.742 0.975-3.674 1.386-7.211 3.097-10.669 4.988-5.989 3.274-11.753 6.945-17.372 10.869-0.926 0.647-1.819 1.346-2.728 2.021-0.363 0.269-0.779 0.251-1.194-0.076 0.131-0.122 0.252-0.245 0.382-0.354 1.747-1.472 3.563-2.847 5.422-4.159 4.863-3.43 9.827-6.688 15.052-9.488 4.016-2.152 8.117-4.1 12.425-5.534 0.492-0.164 0.994-0.295 1.494-0.433 0.752-0.207 1.315 0.145 1.8 0.693 0.183 0.207 0.201 0.402 0.035 0.645-0.176 0.258-0.378 0.503-0.599 0.719-1.038 1.019-2.178 1.907-3.344 2.754-2.855 2.074-5.73 4.117-8.586 6.189-6.184 4.484-12.247 9.141-18.095 14.098-0.37 0.314-0.735 0.634-1.066 1.015 0.122-0.080 0.246-0.158 0.367-0.24 3.027-2.055 6.116-4.002 9.286-5.807 5.965-3.397 12.162-6.236 18.619-8.442 1.827-0.624 3.669-1.2 5.557-1.599 0.234-0.049 0.472-0.070 0.708-0.109 0.723-0.118 1.256 0.235 1.707 0.769 0.23 0.272 0.234 0.433-0.008 0.69-0.231 0.246-0.484 0.48-0.758 0.669-1.415 0.982-2.838 1.95-4.262 2.918-3.994 2.714-7.989 5.424-11.983 8.137-0.084 0.058-0.162 0.126-0.221 0.234 0.169-0.071 0.338-0.138 0.505-0.213 2.645-1.185 5.3-2.344 8.042-3.263 1.261-0.422 2.543-0.78 3.818-1.157 0.241-0.071 0.495-0.094 0.744-0.131 0.756-0.114 1.301 0.278 1.765 0.833 0.179 0.214 0.179 0.421-0.017 0.638-0.272 0.301-0.557 0.601-0.88 0.837-0.782 0.572-1.578 1.127-2.39 1.651-1.558 1.005-3.131 1.983-4.698 2.974-0.146 0.092-0.286 0.194-0.406 0.351 0.475-0.147 0.95-0.29 1.424-0.44 2.146-0.678 4.308-1.29 6.506-1.751 0.44-0.093 0.89-0.16 1.338-0.184 0.806-0.044 1.373 0.422 1.848 1.041 0.141 0.183 0.139 0.396 0.021 0.584-0.123 0.196-0.255 0.397-0.423 0.547-0.606 0.539-1.224 1.064-1.847 1.58-1.040 0.861-2.092 1.707-3.129 2.571-0.248 0.206-0.466 0.453-0.685 0.695-0.261 0.288-0.477 0.603-0.36 1.078-0.122-0.017-0.207-0.020-0.288-0.043-0.063-0.018-0.121-0.056-0.178-0.091-0.842-0.51-0.97-1.153-0.377-1.957 0.548-0.742 1.237-1.335 1.928-1.919 0.867-0.732 1.756-1.435 2.635-2.153 0.207-0.169 0.408-0.348 0.586-0.599-0.219 0.046-0.438 0.088-0.657 0.138-2.36 0.535-4.678 1.235-6.995 1.942-0.993 0.303-1.997 0.563-2.991 0.86-0.815 0.243-1.419-0.129-1.952-0.705-0.205-0.222-0.206-0.396 0.004-0.619 0.222-0.236 0.461-0.466 0.725-0.645 1.235-0.838 2.47-1.675 3.725-2.479 1.527-0.978 3.073-1.922 4.609-2.883 0.144-0.090 0.278-0.198 0.391-0.359-0.095 0.020-0.192 0.033-0.284 0.060-3.643 1.080-7.161 2.521-10.632 4.089-2.276 1.028-4.527 2.116-6.79 3.177-0.049 0.023-0.097 0.046-0.145 0.068-0.694 0.317-1.234 0.219-1.776-0.321-0.211-0.21-0.225-0.315-0.002-0.506 0.358-0.308 0.722-0.613 1.107-0.882 1.831-1.279 3.665-2.553 5.507-3.814 3.85-2.637 7.705-5.268 11.562-7.894 1.211-0.825 2.438-1.625 3.656-2.439 0.107-0.072 0.205-0.158 0.275-0.309-0.354 0.095-0.709 0.187-1.061 0.288-4.037 1.149-7.957 2.648-11.82 4.32-6.203 2.684-12.116 5.959-17.849 9.601-1.768 1.123-3.517 2.282-5.278 3.418-0.293 0.189-0.597 0.364-0.911 0.509-0.515 0.238-0.984 0.041-1.433-0.227-0.14-0.083-0.153-0.226-0.068-0.36 0.102-0.161 0.201-0.333 0.334-0.464 0.798-0.793 1.579-1.608 2.413-2.357 2.809-2.524 5.738-4.892 8.677-7.247 5.972-4.788 12.129-9.306 18.316-13.78 1.428-1.033 2.794-2.16 4.186-3.248 0.178-0.139 0.337-0.304 0.505-0.458-0.019-0.031-0.037-0.062-0.056-0.093l0 0z"
            ></path>
          </svg>
        </div>
        {/* Page Content */}
        <div className="wrapper-about flex flex-col items-center py-20">
          <h1 className="text-primary font-bold text-[22px] absolute top-10">
            {aboutUsTitle}
          </h1>

          <div>{parse(sanitizedContent)}</div>

          {/* Members Section */}
          <h2 className="text-primary font-bold text-[16px] border-t border-b w-full text-center py-4">
            اعضای شرکت
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-0 py-6 w-full">
            {aboutUsMembers.map((member: AboutUsMember) => (
              <div
                key={member._id}
                className="flex flex-col items-center gap-3 rounded-2xl px-6 py-6"
                style={{ boxShadow: "34px -4px 79px -18px rgba(0,0,0,0.1)" }}
              >
                <div className="relative">
                  <img
                    src={`${IMAGE_URL}/${member.avatar}`}
                    alt={member.name}
                    className="w-[55px] h-[55px]"
                  />
                  <img
                    src="/icons/stock-cnc-blue.png"
                    alt="icon"
                    width={16}
                    height={16}
                    className="absolute left-0 top-0"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-black font-semibold text-[12px]">
                    {member.name}
                  </span>
                  <span className="text-secondary font-semibold text-[10px] line-clamp-1">
                    {member.position}
                  </span>
                </div>
                <hr className="w-full hidden sm:block" />
                <div className="flex items-center justify-around w-full">
                  <Link href={member.tweeter}>
                    <PiWhatsappLogo
                      size={16}
                      className="text-secondary hover:text-cyan-500 transition-colors duration-300 ease-in-out"
                    />
                  </Link>
                  <Link href={member.telegram}>
                    <PiTelegramLogo
                      size={15}
                      className="text-secondary hover:text-blue-600 transition-colors duration-300 ease-in-out"
                    />
                  </Link>
                  <Link href={member.instagram}>
                    <SlSocialInstagram
                      size={14}
                      className="text-secondary hover:text-pink-800 transition-colors duration-300 ease-in-out"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* *************************************************************************************************************** */}

      {/* Desktop View */}
      <div className="relative hidden md:block">
        <BannerThin />
        {/* Banner Signature */}
        <div>
          <img
            src="/icons/stock-cnc-blue.png"
            alt="icon"
            width={64}
            height={64}
            className="absolute top-[120px] left-[19%] 2xl:left-[18%] z-[2]"
          />
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="110"
            height="82"
            viewBox="0 0 42 32"
            className="absolute top-40 left-[15%] lg:left-[16%] z-[1]"
          >
            <path
              fill="#e8ecf3"
              d="M34.824 1.412c-0.914 0.324-1.834 0.633-2.742 0.975-3.674 1.386-7.211 3.097-10.669 4.988-5.989 3.274-11.753 6.945-17.372 10.869-0.926 0.647-1.819 1.346-2.728 2.021-0.363 0.269-0.779 0.251-1.194-0.076 0.131-0.122 0.252-0.245 0.382-0.354 1.747-1.472 3.563-2.847 5.422-4.159 4.863-3.43 9.827-6.688 15.052-9.488 4.016-2.152 8.117-4.1 12.425-5.534 0.492-0.164 0.994-0.295 1.494-0.433 0.752-0.207 1.315 0.145 1.8 0.693 0.183 0.207 0.201 0.402 0.035 0.645-0.176 0.258-0.378 0.503-0.599 0.719-1.038 1.019-2.178 1.907-3.344 2.754-2.855 2.074-5.73 4.117-8.586 6.189-6.184 4.484-12.247 9.141-18.095 14.098-0.37 0.314-0.735 0.634-1.066 1.015 0.122-0.080 0.246-0.158 0.367-0.24 3.027-2.055 6.116-4.002 9.286-5.807 5.965-3.397 12.162-6.236 18.619-8.442 1.827-0.624 3.669-1.2 5.557-1.599 0.234-0.049 0.472-0.070 0.708-0.109 0.723-0.118 1.256 0.235 1.707 0.769 0.23 0.272 0.234 0.433-0.008 0.69-0.231 0.246-0.484 0.48-0.758 0.669-1.415 0.982-2.838 1.95-4.262 2.918-3.994 2.714-7.989 5.424-11.983 8.137-0.084 0.058-0.162 0.126-0.221 0.234 0.169-0.071 0.338-0.138 0.505-0.213 2.645-1.185 5.3-2.344 8.042-3.263 1.261-0.422 2.543-0.78 3.818-1.157 0.241-0.071 0.495-0.094 0.744-0.131 0.756-0.114 1.301 0.278 1.765 0.833 0.179 0.214 0.179 0.421-0.017 0.638-0.272 0.301-0.557 0.601-0.88 0.837-0.782 0.572-1.578 1.127-2.39 1.651-1.558 1.005-3.131 1.983-4.698 2.974-0.146 0.092-0.286 0.194-0.406 0.351 0.475-0.147 0.95-0.29 1.424-0.44 2.146-0.678 4.308-1.29 6.506-1.751 0.44-0.093 0.89-0.16 1.338-0.184 0.806-0.044 1.373 0.422 1.848 1.041 0.141 0.183 0.139 0.396 0.021 0.584-0.123 0.196-0.255 0.397-0.423 0.547-0.606 0.539-1.224 1.064-1.847 1.58-1.040 0.861-2.092 1.707-3.129 2.571-0.248 0.206-0.466 0.453-0.685 0.695-0.261 0.288-0.477 0.603-0.36 1.078-0.122-0.017-0.207-0.020-0.288-0.043-0.063-0.018-0.121-0.056-0.178-0.091-0.842-0.51-0.97-1.153-0.377-1.957 0.548-0.742 1.237-1.335 1.928-1.919 0.867-0.732 1.756-1.435 2.635-2.153 0.207-0.169 0.408-0.348 0.586-0.599-0.219 0.046-0.438 0.088-0.657 0.138-2.36 0.535-4.678 1.235-6.995 1.942-0.993 0.303-1.997 0.563-2.991 0.86-0.815 0.243-1.419-0.129-1.952-0.705-0.205-0.222-0.206-0.396 0.004-0.619 0.222-0.236 0.461-0.466 0.725-0.645 1.235-0.838 2.47-1.675 3.725-2.479 1.527-0.978 3.073-1.922 4.609-2.883 0.144-0.090 0.278-0.198 0.391-0.359-0.095 0.020-0.192 0.033-0.284 0.060-3.643 1.080-7.161 2.521-10.632 4.089-2.276 1.028-4.527 2.116-6.79 3.177-0.049 0.023-0.097 0.046-0.145 0.068-0.694 0.317-1.234 0.219-1.776-0.321-0.211-0.21-0.225-0.315-0.002-0.506 0.358-0.308 0.722-0.613 1.107-0.882 1.831-1.279 3.665-2.553 5.507-3.814 3.85-2.637 7.705-5.268 11.562-7.894 1.211-0.825 2.438-1.625 3.656-2.439 0.107-0.072 0.205-0.158 0.275-0.309-0.354 0.095-0.709 0.187-1.061 0.288-4.037 1.149-7.957 2.648-11.82 4.32-6.203 2.684-12.116 5.959-17.849 9.601-1.768 1.123-3.517 2.282-5.278 3.418-0.293 0.189-0.597 0.364-0.911 0.509-0.515 0.238-0.984 0.041-1.433-0.227-0.14-0.083-0.153-0.226-0.068-0.36 0.102-0.161 0.201-0.333 0.334-0.464 0.798-0.793 1.579-1.608 2.413-2.357 2.809-2.524 5.738-4.892 8.677-7.247 5.972-4.788 12.129-9.306 18.316-13.78 1.428-1.033 2.794-2.16 4.186-3.248 0.178-0.139 0.337-0.304 0.505-0.458-0.019-0.031-0.037-0.062-0.056-0.093l0 0z"
            ></path>
          </svg>
        </div>
        {/* Page Layer Top-Right */}
        <div className="relative hidden xl:flex">
          <img
            src="/images/circle-right.png"
            alt="Page Layer"
            className="absolute right-0 top-40 w-[220px] h-[220px]"
          />
        </div>
        {/* Page Content */}
        <div className="wrapper-about flex flex-col items-center py-16">
          <h1 className="text-primary font-bold text-[32px] mb-10">
            {aboutUsTitle}
          </h1>

          <div>{parse(sanitizedContent)}</div>

          {/* Members Section */}
          <div className="flex items-center gap-6 w-full">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 32 32"
            >
              <path
                fill="#015ba5"
                d="M0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16z"
              ></path>
            </svg>
            <h2 className="text-secondary font-bold text-[20px] border-t border-b w-full py-6">
              اعضای شرکت
            </h2>
          </div>
          <div className="flex flex-col items-center w-full mr-3 py-8 pr-9 pl-3">
            <div className="flex items-center">
              {aboutUsMembers.map((member: AboutUsMember) => (
                <div
                  key={member._id}
                  className="flex flex-col items-center gap-6 rounded-2xl px-10 py-10"
                  style={{ boxShadow: "34px -4px 79px -18px rgba(0,0,0,0.1)" }}
                >
                  <div className="relative">
                    <img
                      src={`${IMAGE_URL}/${member.avatar}`}
                      alt={member.name}
                      className="w-[100px] h-[100px]"
                    />
                    <img
                      src="/icons/stock-cnc-blue.png"
                      alt="icon"
                      width={20}
                      height={20}
                      className="absolute left-1 top-1"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-black font-semibold text-[16px]">
                      {member.name}
                    </span>
                    <span className="text-secondary font-semibold text-[12px] line-clamp-1">
                      {member.position}
                    </span>
                  </div>
                  <hr className="w-full" />
                  <div className="flex items-center justify-between w-full">
                    <Link href={member.tweeter} target="_blank">
                      <PiWhatsappLogo
                        size={21}
                        className="text-secondary hover:text-green-500 transition-colors duration-300 ease-in-out"
                      />
                    </Link>
                    <Link href={member.telegram} target="_blank">
                      <PiTelegramLogo
                        size={20}
                        className="text-secondary hover:text-blue-600 transition-colors duration-300 ease-in-out"
                      />
                    </Link>
                    <Link href={member.instagram} target="_blank">
                      <SlSocialInstagram
                        size={19}
                        className="text-secondary hover:text-pink-800 transition-colors duration-300 ease-in-out"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Page Layer Bottom-Left */}
        <div className="relative hidden xl:flex">
          <img
            src="/images/circle-left.png"
            alt="Page Layer"
            className="absolute left-0 bottom-40 w-[220px] h-[220px]"
          />
        </div>
      </div>
    </>
  );
}
