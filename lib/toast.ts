import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    rtl: true,
    position: "top-center",
    autoClose: 3000, // 3 seconds
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    rtl: true,
    position: "top-center",
    autoClose: 3000,
  });
};
