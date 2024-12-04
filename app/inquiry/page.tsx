import { APP_TITLE } from "@/lib/constants";
import InquiryForm from "./inquiry-form";

export const metadata = {
  title: `استعلام قیمت - ${APP_TITLE}`,
};

export default function InquiryPage() {
  return (
    <div className="flex md:items-center justify-center min-h-screen">
      <InquiryForm />
    </div>
  );
}
