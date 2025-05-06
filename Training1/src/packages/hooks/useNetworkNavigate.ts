import { useAuth } from "@packages/contexts/auth";
import { NavigateOptions, useNavigate } from "react-router-dom";
export const useNetworkNavigate = () => {
  const {
    auth: { networkId },
  } = useAuth();
  const rawNavigate = useNavigate();
  return (str: any, options?: NavigateOptions) => {
    rawNavigate(`/${networkId}${str}`, options);
  };
};
