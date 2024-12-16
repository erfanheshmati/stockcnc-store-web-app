import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/custom.css";
import {
  APP_DESCRIPTION,
  APP_TITLE,
  BASE_URL,
  IMAGE_URL,
} from "@/lib/constants";

const yekanFont = localFont({
  src: [
    { path: "./fonts/Yekan-Bakh-FaNum-01-Hairline.woff", weight: "100" },
    { path: "./fonts/Yekan-Bakh-FaNum-02-Thin.woff", weight: "200" },
    { path: "./fonts/Yekan-Bakh-FaNum-03-Light.woff", weight: "300" },
    { path: "./fonts/Yekan-Bakh-FaNum-04-Regular.woff", weight: "400" },
    { path: "./fonts/Yekan-Bakh-FaNum-05-Medium.woff", weight: "500" },
    { path: "./fonts/Yekan-Bakh-FaNum-06-Bold.woff", weight: "600" },
    { path: "./fonts/Yekan-Bakh-FaNum-07-Heavy.woff", weight: "700" },
    { path: "./fonts/Yekan-Bakh-FaNum-08-Fat.woff", weight: "800" },
  ],
});

async function fetchAppMetadata() {
  try {
    const res = await fetch(`${BASE_URL}/web-text-plans`, {
      // Disable caching if data updates frequently
      // cache: "no-store",
    });
    if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
    const data = await res.json();
    return {
      title: data.title || `${APP_TITLE}`,
      description: data.defaultMetaData || `${APP_DESCRIPTION}`,
      favicon: data.favicon || "/icons/favicon.ico",
    };
  } catch (error) {
    console.error((error as Error).message);
    return {
      title: `${APP_TITLE}`,
      description: `${APP_DESCRIPTION}`,
      favicon: "/icons/favicon.ico",
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const appMetadata = await fetchAppMetadata();
  return {
    title: appMetadata.title,
    description: appMetadata.description,
    icons: {
      icon: `${IMAGE_URL}/${appMetadata.favicon}`,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekanFont.className}>{children}</body>
    </html>
  );
}
