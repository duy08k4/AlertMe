// Import libraries
import type React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { routeConfig } from "../../configs/routeConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={routeConfig.admin.login}
        state={{ from: location }}
        replace
      />
    );
  }

  // If admin access is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <Navigate
        to={routeConfig.landing.root}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
