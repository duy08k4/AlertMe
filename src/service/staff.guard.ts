import { toastConfig } from "../configs/toastConfig";

export default class staffGuard {

    // signint
    public static signStaffGuard(
        profilepic: string,
        name: string,
        username: string,
        email: string,
        password: string,
    ) {

        if (!profilepic) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng cung cấp hình ảnh'
            })
            return false
        }

        if (!name) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng cung cấp Họ và tên'
            })
            return false
        }

        if (!username) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng cung cấp tên đăng nhập'
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

        if (!password) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng cung cấp mật khẩu lần đầu'
            })
            return false
        }

        return true
    }
}