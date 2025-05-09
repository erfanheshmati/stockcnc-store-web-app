import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/custom.css";
import { permanentRedirect, redirect } from "next/navigation";
import { cache } from "react";
import {
  APP_DESCRIPTION,
  APP_TITLE,
  API_URL,
  IMAGE_URL,
  APP_URL,
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

const getWebTextPlans = cache(async () => {
  const res = await fetch(`${API_URL}/web-text-plans`);
  if (!res.ok) throw new Error("خطا در دریافت اطلاعات!");
  return res.json();
});

async function fetchAppMetadata() {
  try {
    const data = await getWebTextPlans();

    // Use existing canonical or fallback to current URL
    const canonicalUrl = data.homeCanonical || APP_URL;

    return {
      title: data.title || `${APP_TITLE}`,
      description: data.defaultMetaData || `${APP_DESCRIPTION}`,
      canonical: canonicalUrl,
      favicon: data.favicon || "/icons/favicon.ico",
    };
  } catch (error) {
    console.error((error as Error).message);

    return {
      title: `${APP_TITLE}`,
      description: `${APP_DESCRIPTION}`,
      canonical: "",
      favicon: "/icons/favicon.ico",
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const appMetadata = await fetchAppMetadata();

  return {
    title: appMetadata.title,
    description: appMetadata.description,
    alternates: {
      canonical: appMetadata.canonical,
    },
    icons: {
      icon: `${IMAGE_URL}/${appMetadata.favicon}`,
    },
    other: {
      "google-site-verification": "S6sI3j1U7NWPtgmEEGBxbtEsBJM3JjWLH9P4MK1MEDU",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getWebTextPlans();

  // Check redirection
  if (data.homeRedirectStatus && data.homeNewUrl) {
    if (Number(data.homeRedirectStatus) === 301) {
      permanentRedirect(data.homeNewUrl);
    } else {
      redirect(data.homeNewUrl);
    }
  }

  return (
    <html lang="fa" dir="rtl">
      <body className={yekanFont.className}>{children}</body>
    </html>
  );
}
