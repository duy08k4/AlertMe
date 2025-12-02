import { toast } from "react-toastify";
import api from "../configs/gateway";
import { toastConfig } from "../configs/toastConfig";
import authGuard from "./auth.guard";
import { store } from "../redux/store";
import { setAdminProfile, type adminData } from "../redux/reducer/admin";

export default class authService {

    // Admin login
    public static async signin(email: string, password: string) {
        if (!authGuard.signinGuard(email, password)) {
            return false
        }

        try {
            const pending = toastConfig({
                pending: true,
                toastMessage: 'Vui lòng chờ'
            })
            const { data, status } = await api.post("/auth/admin/signin", {
                email,
                password
            })

            const adminData = data as adminData

            if (status === 200) {
                localStorage.setItem("accessToken", adminData.access_token)
                localStorage.setItem("refreshToken", adminData.refresh_token)
                store.dispatch(setAdminProfile(adminData.user))

                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đăng nhập thành công'
                })
                toast.dismiss(pending)
                return true
            }

            toast.dismiss(pending)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Tài khoản không hợp lệ'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            console.error(error)
            return false
        }
    }

    // Auto signin
    public static async autosigin() {
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")

        if (!accessToken || !refreshToken) {
            return false
        }

        try {
            const pending = toastConfig({
                pending: true,
                toastMessage: 'Đang kiểm tra phiên đăng nhập'
            })
            const { data, status } = await api.post("/auth/refresh", {
                refresh_token: refreshToken
            })

            if (status === 200) {
                localStorage.setItem("accessToken", data.access_token)
                localStorage.setItem("refreshToken", data.refresh_token)

                const response = await api.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${data.access_token}`
                    }
                })

                const adminDataProfile = response.data as adminData['user']

                toast.dismiss(pending)
                store.dispatch(setAdminProfile(adminDataProfile))
                toastConfig({
                    toastType: 'success',
                    toastMessage: `Xin chào ${adminDataProfile.email}`
                })
                return true
            }
            
            toast.dismiss(pending)
            if (status === 401 && accessToken && refreshToken) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Phiên đăng nhập hết hạn'
                })
                return false
            }

            return false
        } catch (error) {
            if (accessToken && refreshToken) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Phiên đăng nhập hết hạn'
                })
            }
            console.log(error)
            return false
        }
    }
}