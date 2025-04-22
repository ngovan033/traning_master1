import { useNavigate } from "react-router-dom";
import { useAuth } from "@packages/contexts/auth";
export const useNewTabNavigate = () => {
  const {
    auth: { networkId },
  } = useAuth();
  const rawNavigate = useNavigate();

  return (path: string) => {
    const link =
      window.location.protocol +
      "//" +
      window.location.host +
      "/" +
      networkId +
      path;
    window.open(link, "_blank");
  };
};
