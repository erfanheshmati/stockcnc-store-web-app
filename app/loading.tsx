import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const Loading = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen",
        className
      )}
    >
      <Loader className="animate-spin" />
    </div>
  );
};

export default Loading;
