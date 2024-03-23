import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

interface ProtectRouteProps {
  children: ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const cookieValue = Cookie.get("token");
  if (!cookieValue) {
    return <Navigate to={"/signin"} replace />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
