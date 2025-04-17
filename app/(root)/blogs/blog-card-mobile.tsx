import { IMAGE_URL } from "@/lib/constants";
import { Blog } from "@/lib/types";
import Link from "next/link";
import moment from "moment-jalaali";

export default function BlogCardMobile({ blog }: { blog: Blog }) {
  const formattedDate = moment(blog.createdAt).format("jYYYY/jMM/jDD");

  return (
    <div className="flex justify-between border rounded-lg p-2">
      <div className="flex gap-4 w-full">
        <img
          src={`${IMAGE_URL}/${blog.image}`}
          alt={blog.title}
          width={120}
          height={100}
          className="min-w-2/5 max-w-2/5 h-[100px] rounded-md"
        />
        <div className="flex flex-col justify-between py-2 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-primary font-bold text-[14px] line-clamp-1">
              {blog.title}
            </h3>
            {blog.tutorial === true && (
              <span className="bg-accent px-2 py-1 rounded-lg text-white text-[10px]">
                آموزشی
              </span>
            )}
          </div>
          <div className="text-[#A1AEBB] text-[10px] line-clamp-1">
            {blog.summary}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[#536683] text-[10px]">
                نویسنده: {blog.author}
              </span>
              <span className="text-[#536683] text-[10px]">
                در تاریخ {formattedDate}
              </span>
            </div>
            <Link
              href={`/blog/${blog._id}`}
              target="_blank"
              className="flex items-center justify-center rounded-lg border"
            >
              <span className="font-medium text-[12px] p-2 truncate">
                خواندن ادامه
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
