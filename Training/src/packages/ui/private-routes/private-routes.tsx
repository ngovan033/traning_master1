import { useAuth } from "@packages/contexts/auth";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

export const PrivateRoutes = () => {
  const { networkId } = useParams();
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (loggedIn && !networkId) {
    return (
      <Navigate to={`/select-network`} state={{ from: location }} replace />
    );
  }

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?returnUrl=${window.location.pathname}`}
      state={{ from: location }}
      replace
    />
  );
};
