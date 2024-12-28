import { IMAGE_URL } from "@/lib/constants";
import { Blog } from "@/lib/types";
import moment from "moment-jalaali";
import Image from "next/image";
import Link from "next/link";

export default function BlogCardMobile({ blog }: { blog: Blog }) {
  const formattedDate = moment(blog.createdAt).format("jYYYY/jMM/jDD");

  return (
    <Link
      href={`/blog/${blog._id}`}
      className="flex justify-between border rounded-lg p-2"
    >
      <div className="flex gap-4 w-full">
        <Image
          src={`${IMAGE_URL}/${blog.image}`}
          alt={blog.title}
          width={120}
          height={100}
          className="min-w-2/5 h-[100px] rounded-md"
        />
        <div className="flex flex-col justify-between py-2">
          <h3 className="text-primary font-bold text-[14px] line-clamp-1">
            {blog.title}
          </h3>
          <p
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="text-[#A1AEBB] text-[10px] line-clamp-1"
          />
          <div className="flex flex-col gap-1">
            <span className="text-[#536683] text-[10px]">
              نویسنده: {blog.author}
            </span>
            <span className="text-[#536683] text-[10px]">
              در تاریخ {formattedDate}
            </span>
          </div>
        </div>
      </div>
      <div className="w-fit pt-1">
        {blog.tutorial === true && (
          <span className="bg-accent px-2 py-1 rounded-lg text-white text-[10px]">
            آموزشی
          </span>
        )}
      </div>
    </Link>
  );
}
