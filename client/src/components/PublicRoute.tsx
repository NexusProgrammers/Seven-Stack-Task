import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const cookieValue = Cookie.get("token");
  if (cookieValue) {
    return <Navigate to={"/"} replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
