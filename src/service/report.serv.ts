import { toast } from "react-toastify"
import api from "../configs/gateway"
import type { ReportStatusKey } from "../configs/reportStatus"
import { toastConfig } from "../configs/toastConfig"
import { setAmountReports, setMaxPage, setPage, setPaginationData, type reportListPagination, type reportPagination } from "../redux/reducer/report"
import { store } from "../redux/store"

export class reportService {

    // Get report data based on panigation
    public static async getAllReport(
        page: number,
        reportStatus?: ReportStatusKey,
        date_from?: string,
        date_to?: string,
        user_id?: string,
        sort_by?: 'DESC' | 'ASC',
        search?: string
    ) {
        if (!page || page < 1) {
            toastConfig({
                toastType: "error",
                toastMessage: 'Không tìm thấy dữ liệu'
            })

            console.log("Page is invalid")
            return false
        }

        try {
            const pending = toastConfig({
                pending: true,
                toastMessage: `Đang tải dữ liệu trang ${page}`
            })
            const params: any = {
                page: page ?? 1,
                limit: 10,
                sort_by: sort_by ?? "DESC",
            };

            if (reportStatus) {
                params.status = reportStatus;
            }

            if (date_from) params.date_from = date_from;
            if (date_to) params.date_to = date_to;
            else params.date_to = new Date().toISOString();
            if (search) {
                params.search = search
            }

            if (user_id) params.user_id = user_id;
            const { data, status } = await api.get("/reports", { params })

            toast.dismiss(pending)
            if (status === 200) {
                const reports = data as reportListPagination

                store.dispatch(setPage(page))
                store.dispatch(setMaxPage(reports.pagination.totalPages))
                store.dispatch(setAmountReports(reports.pagination.total))
                store.dispatch(setPaginationData(reports))

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

    // Get a report based on ID
    public static async getAReport(reportId: string) {
        if (!reportId) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu báo cáo'
            })
            console.error("ID is invalid!")
            return false
        }

        try {
            const { data, status } = await api.get(`/reports/${reportId}`)

            if (status === 200) {
                return data as reportPagination
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu báo cáo'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu báo cáo'
            })
            console.error(error)
            return false
        }
    }


}