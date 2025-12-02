import { toastConfig } from "../configs/toastConfig";

export default class authGuard {

    // Admin login
    public static signinGuard(email: string, password: string) {
        if (!email && !password) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng điền đẩy đủ thông tin'
            })
            return false
        }
        
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Gmail không hợp lệ'
            })
            return false
        }

        if (!password || password.length === 0) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng nhập mật khẩu'
            })
            return false
        }

        return true
    }
}