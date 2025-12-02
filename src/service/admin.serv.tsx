import api from "../configs/gateway"
import type { TaskStatusKey } from "../configs/reportStatus"
import { toastConfig } from "../configs/toastConfig"
import type { taskObject } from "../redux/reducer/report"

export class adminService {
    // Staff assignment
    public static async staffAssign(ids: string[], reportId: string, adminId: string) {
        if (ids.length === 0) {
            toastConfig({
                toastType: "error",
                toastMessage: 'Vui lòng chọn nhân viên'
            })

            return false
        }

        if (!reportId || !adminId) {
            toastConfig({
                toastType: "error",
                toastMessage: 'Không thế giao nhiệm vụ'
            })

            return false
        }

        try {
            const { data, status } = await api.put(`/reports/${reportId}/assign`, {
                staff_user_ids: ids,
                assigned_by: adminId,
                task_details: "Nhanh chóng đến nơi xảy ra sự cố. Chúc may mắn"
            })

            if (status === 200) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: "Đã giao việc thành công"
                })
                return data as Omit<taskObject, "assignedBy">
            }

            toastConfig({
                toastType: "error",
                toastMessage: 'Không thể giao nhiệm vụ'
            })

            return false
        } catch (error) {
            toastConfig({
                toastType: "error",
                toastMessage: 'Vui lòng chọn nhân viên'
            })

            console.error(error)
            return false
        }
    }

    // Update task's state
    public static async updateTaskState(state: TaskStatusKey, taskId: string) {
        if (!state) {
            console.error("State is invalid")
            return false
        }

        try {
            const { status } = await api.put(`/tasks/${taskId}/status`, { status: state })

            if (status === 200) return true
            return false
        } catch (error) {
            console.error(error)
            return false
        }
    }
}