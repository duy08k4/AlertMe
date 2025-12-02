import { useEffect } from "react"
import { webSocketManagerAlert } from "../../websocket/socketToAlert"
import { webSocketManagerTracking } from "../../websocket/socketToTracking"
import { toastConfig } from "../../configs/toastConfig"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { reportService } from "../../service/report.serv"
import { addNewReport, updateReportStatus } from "../../redux/reducer/report"
import { addStaffLoc, removeStaffLoc, setStaffStatus, type staffShortData } from "../../redux/reducer/staff"
import { staffService } from "../../service/staff.serv"
import type { ReportStatusKey } from "../../configs/reportStatus"

webSocketManagerAlert.connect()
webSocketManagerTracking.connect()

const SocketSubcriber = () => {

    // Subscribe new report - sos report
    const reportPage = useSelector((state: RootState) => state.report.page)

    const dispatch = useDispatch()

    useEffect(() => { // Normal report
        if (webSocketManagerAlert.isConnected()) {
            webSocketManagerAlert.on("newReport", async (data: { reportId: string }) => {
                toastConfig({
                    toastType: 'info',
                    toastMessage: 'Có báo cáo mới'
                })

                if (reportPage === 1) {
                    const newReport = await reportService.getAReport(data.reportId)

                    if (newReport) {
                        dispatch(addNewReport(newReport))
                    }
                }
            })
        }

        return webSocketManagerAlert.off("newReport", () => { })
    }, [webSocketManagerAlert.isConnected()])

    useEffect(() => { // Sos report
        if (webSocketManagerAlert.isConnected()) {
            webSocketManagerAlert.on("sosAlert", () => {
                toastConfig({
                    toastType: 'info',
                    toastMessage: 'Có báo cáo SOS mới'
                })
            })
        }

        return webSocketManagerAlert.off("sosAlert", () => { })
    }, [webSocketManagerAlert.isConnected()])

    // Staff position
    useEffect(() => {
        if (webSocketManagerTracking.isConnected()) {
            webSocketManagerTracking.on("coordinateUpdate", (data: { staffId: string, lat: number, lng: number, }) => {
                (async () => {
                    const staffData = await staffService.getOneStaff(data.staffId)
                    console.log(staffData)
                    console.log(data.staffId)
                    if (staffData) {
                        const shortData: staffShortData = {
                            id: staffData[0].id,
                            name: staffData[0].name,
                            email: staffData[0].email,
                            haveTask: staffData[0].assigned_tasks[0].status !== 'completed' ? true : false,
                            lat: data.lat,
                            lng: data.lng
                        }
                        dispatch(addStaffLoc(shortData))
                    }
                })()
            })
        }

        return webSocketManagerTracking.off("coordinateUpdate", () => {  })
    }, [webSocketManagerTracking.isConnected()])

    // Staff disconnect
    useEffect(() => {
        if (webSocketManagerTracking.isConnected()) {
            webSocketManagerTracking.on("staffDisconnected", (data: { staffId: string }) => {
                console.log(data.staffId)
                dispatch(removeStaffLoc({ staffId: data.staffId }))
            })
        }

        return webSocketManagerTracking.off("staffDisconnected", () => {  })
    }, [webSocketManagerTracking.isConnected()])

    // Broadcast task completion to everyone
    useEffect(() => {
        if (webSocketManagerAlert.isConnected()) {
            webSocketManagerAlert.on("taskCompleted", (data: { staffId: string; reportId: string; reportStatus: ReportStatusKey }) => {
                console.log(data)
                dispatch(setStaffStatus({ staffId: [data.staffId], status: false }))
                dispatch(updateReportStatus({ reportId: data.reportId, status: data.reportStatus }))
            })
        }
    }, [webSocketManagerAlert.isConnected()])

    return null
}

export default SocketSubcriber