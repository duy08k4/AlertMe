import api from "../configs/gateway";
import { store } from "../redux/store";
import { setUser, clearUser } from "../redux/reducers/user";
import { toastConfig } from "../configs/toastConfig";
import { toast } from "react-toastify";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    supabase_id: string;
    role_id: string;
    created_at: string;
    updated_at: string; // 2025-11-18T23:59:33.379Z
    role: {
      id: string;
      name: string;
    };
    profile: {
      id: string;
      username: string;
      phone_number: string | null;
      address: string | null;
      city: string | null;
      state: string | null;
      postal_code: string | null;
      country: string | null;
      profilepic: string | null;
      created_at: string;
      updated_at: string;
    };
  };
  expires_in: number;
  expires_at: number;
}

export const authService = {
  login: async (email: string, password: string) => {
    const toastId = toastConfig({
      toastMessage: "Đang đăng nhập...",
      pending: true,
    });

    try {
      const response = await api.post<LoginResponse>("/auth/admin/signin", {
        email,
        password,
      });

      // Store tokens in localStorage
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

      // Dispatch user data to Redux store
      store.dispatch(setUser(response.data.user));

      // Show success toast
      toast.update(toastId, {
        render: `Chào mừng, ${response.data.user.profile.username || response.data.user.email}!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return response.data;
    } catch (error: unknown) {
      // Show error toast
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";

      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      throw error;
    }
  },

  logout: () => {
    // Clear tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Clear Redux store
    store.dispatch(clearUser());

    toastConfig({
      toastMessage: "Đã đăng xuất thành công",
      toastType: "info",
    });
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await api.post<{ access_token: string }>(
        "/auth/refresh",
        {
          refresh_token: refreshToken,
        },
      );

      localStorage.setItem("accessToken", response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      // If refresh fails, logout user
      authService.logout();
      throw error;
    }
  },
};
