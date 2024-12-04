import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/custom.css";

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

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || "سی ان سی استوک",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || "ماشین آلات و تجهیزات سی ان سی",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

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
