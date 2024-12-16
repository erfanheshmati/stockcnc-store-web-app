import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Loading;
