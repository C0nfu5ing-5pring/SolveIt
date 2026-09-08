import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast";

export const handleAuthError = (router) => {
  toast(<CustomToast msg="Session expired. Please log in again." />);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setTimeout(() => {
    router.push("/login");
  }, 1000);
};
