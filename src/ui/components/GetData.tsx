import type React from "react"
import { useEffect } from "react"
import { reportService } from "../../service/report.serv"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

const GetData: React.FC = () => {
    const adminProfile = useSelector((state: RootState) => state.admin.profile)

    // Report data (only page 1) one times
    useEffect(() => {
        if (adminProfile.id) {
            (async () => {
                await reportService.getAllReport(1)
            })()
        }
    }, [adminProfile.id])

    return null
}

export default GetData