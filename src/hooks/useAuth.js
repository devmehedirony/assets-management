import { useContext } from "react";
import { authContext } from "../contexts/Auth";


export const useAuth = () => {
  const context = useContext(authContext)
  return context
};
