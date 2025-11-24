import { toast } from "react-toastify"
import api from "../configs/gateway"
import { toastConfig } from "../configs/toastConfig"

export class staffService {

    // Get staff 
    public static async getStaff(
        page: number = 1,
        limit: number = 10
    ) {
        try {
            const pending = toastConfig({
                pending: true,
                toastMessage: 'Đang tải dữ liệu trang 1'
            })
            
            const { data, status } = await api.get("/staff", {
                params: {
                    page,
                    limit
                }
            })

            toast.dismiss(pending)
            if (status === 200) {
                // const paginationStaffData = data as 

                return true
            }

            toastConfig({
                toastType: "error",
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: "error",
                toastMessage: 'Không tìm thấy dữ liệu'
            })

            console.error(error)
            return false
        }
    }
}