import { useMutation } from "react-query";
import { logout } from "../services/AuthService";

export const useLogout = () => {
    return useMutation(logout, {
      onSuccess: () => {}
    });
  };