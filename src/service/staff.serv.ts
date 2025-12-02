import { toast } from "react-toastify"
import api from "../configs/gateway"
import { toastConfig } from "../configs/toastConfig"
import type { roleConfig } from "../configs/roleConfig"
import staffGuard from "./staff.guard"
import { store } from "../redux/store"
import { addNewStaff, removeStaff, setAmountStaff, setMaxPage, setPage, setPaginationData, type staffData, type staffFullData, type staffListPagination } from "../redux/reducer/staff"

export class staffService {

    // Get staff 
    public static async getStaff(
        page: number,
        role: keyof typeof roleConfig | undefined,
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
                    limit: 10,
                    search,
                    role
                }
            })

            toast.dismiss(pending)
            if (status === 200) {
                const staffData = data as staffListPagination

                store.dispatch(setPage(page))
                store.dispatch(setPaginationData(staffData))
                store.dispatch(setMaxPage(staffData.pagination.totalPages))
                store.dispatch(setAmountStaff(staffData.pagination.total))

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

    // Get one staff
    public static async getOneStaff(staffId: string) {
        if (!staffId) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhân viên'
            })

            return false
        }

        try {
            const { data, status } = await api.get("/staff/query", {
                params: {
                    ids: staffId
                }
            })

            if (status === 200) {
                return data as staffFullData[]
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhân viên'
            })

            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhân viên'
            })

            console.error(error)
            return false
        }
    }

    // Upload image for staff
    public static async uploadImage(file: File) {
        try {
            const formData = new FormData()

            formData.append('files', file)
            formData.append('folder', "staff")
            const { data, status } = await api.post("/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (status === 201) {
                return data.files[0].publicUrl as string
            }

            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể tải ảnh lên'
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

    // Sign staff
    public static async signStaff(
        profilepic: string,
        name: string,
        username: string,
        email: string,
        password: string,
        phone_number?: string | undefined,
        address?: string | undefined,
        city?: string | undefined,
        state?: string | undefined,
        postal_code?: string | undefined,
        country?: string | undefined,
    ) {
        try {
            const guard = staffGuard.signStaffGuard(profilepic, name, username, email, password)

            if (guard) {
                const { data, status } = await api.post("/auth/staff/sign-up", {
                    profilepic,
                    name,
                    username,
                    email,
                    password,
                    phone_number,
                    address,
                    city,
                    state,
                    postal_code,
                    country
                })

                if (status === 201) {
                    toastConfig({
                        toastType: 'success',
                        toastMessage: `Đã thêm ${name}`
                    })

                    const staffData = data.staff as staffData
                    store.dispatch(addNewStaff(staffData))
                    // dispatch
                    return true
                }

                if (status === 400) {
                    toastConfig({
                        toastType: 'error',
                        toastMessage: 'Không thể thêm nhân viên mới'
                    })
                }

                if (status === 403) {
                    toastConfig({
                        toastType: 'error',
                        toastMessage: 'Quyền hạn của bạn không đủ'
                    })
                }

                if (status === 409) {
                    toastConfig({
                        toastType: 'warn',
                        toastMessage: 'Nhân viên đã tồn tại'
                    })
                }

                return false
            }
        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể thêm nhân viên mới'
            })
            console.error(error)
            return false
        }
    }

    // Delete staff 
    public static async deleteStaff(staffId: string, staffImg: string) {
        if (!staffId) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhân viên'
            })
            return false
        }

        try {
            const { status } = await api.delete(`/staff/${staffId}`)

            if (status === 200) {
                await this.deleteImage([staffImg])

                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đã xóa nhân viên'
                })

                // Update state
                store.dispatch(removeStaff({staffId}))

                return true
            }


            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhân viên'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhân viên'
            })
            console.error(error)
            return false
        }
    }
}