import Header from "@/components/shared/header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F0F2F7]">
      <div className="md:hidden">
        <Header />
      </div>
      {children}
    </div>
  );
}
