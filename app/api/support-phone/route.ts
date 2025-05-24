import { API_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/web-text-plans`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("خطا در دریافت اطلاعات!");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch support phone:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "خطا در دریافت اطلاعات!",
      },
      { status: 500 }
    );
  }
}
