import { toast } from "react-toastify";
import api from "../configs/gateway";
import { toastConfig } from "../configs/toastConfig";
import { removeUser, setAmountUser, setMaxPage_user, setPage_user, setPaginationData_user, type userListPagination } from "../redux/reducer/user";
import { store } from "../redux/store";

export class userService {

    // Get user pagination
    public static async getUser(
        page: number,
        search?: string | undefined,
    ) {
        let pending
        try {
            pending = toastConfig({
                pending: true,
                toastMessage: !search ? `Đang tải dữ liệu trang ${page}` : `Tìm kiếm: ${search}`
            })

            const { data, status } = await api.get("/users", {
                params: {
                    page,
                    limit: 20,
                    search,
                    role: "user"
                }
            })

            toast.dismiss(pending)
            if (status === 200) {
                const staffData = data as userListPagination

                store.dispatch(setPage_user(page))
                store.dispatch(setPaginationData_user(staffData))
                store.dispatch(setMaxPage_user(staffData.pagination.totalPages))
                store.dispatch(setAmountUser(staffData.pagination.total))

                return true
            }

            toastConfig({
                toastType: "error",
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            return false

        } catch (error) {
            toast.dismiss(pending)
            toastConfig({
                toastType: "error",
                toastMessage: 'Không tìm thấy dữ liệu'
            })

            console.error(error)
            return false
        }
    }

    // Delete image
    public static async deleteImage(urls: string[]) {
        if (urls.length === 0) {
            console.error("urls is invalid")
            return false
        }

        try {
            await api.delete('/upload', {
                data: { urls }
            })

        } catch (error) {
            console.error(error)
            return false
        }
    }

    // Remove user
    public static async removeUser(userId: string, userImg: string | null) {
        if (!userId) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy người dùng'
            })
            return false
        }

        try {
            const { status } = await api.delete(`/users/${userId}`)

            if (status === 204) {
                if (userImg) await this.deleteImage([userImg])

                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đã xóa người dùng'
                })

                // Update state
                store.dispatch(removeUser({ userId }))

                return true
            }


            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy người dùng'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy người dùng'
            })
            console.error(error)
            return false
        }
    }
}
