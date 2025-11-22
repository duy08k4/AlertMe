import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import type { userData } from "../redux/reducers/admin";
import { authService } from "../services/authService";
import { routeConfig } from "../configs/routeConfig";

export const useAuth = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const isAuthenticated = (): boolean => {
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken && Object.keys(user).length > 0;
  };

  const isAdmin = (): boolean => {
    if (!isAuthenticated()) return false;
    if ("role" in user) {
      const userData = user as userData["user"];
      return userData.role.name.toLowerCase() === "admin";
    }
    return false;
  };

  const logout = () => {
    authService.logout();
    navigate(routeConfig.landing.root);
  };

  const getUserData = (): userData["user"] | null => {
    if (Object.keys(user).length > 0 && "id" in user) {
      return user as userData["user"];
    }
    return null;
  };

  const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = (): string | null => {
    return localStorage.getItem("refreshToken");
  };

  return {
    user: getUserData(),
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    logout,
    getAccessToken,
    getRefreshToken,
  };
};
