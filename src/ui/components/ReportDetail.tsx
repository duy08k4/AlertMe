// src/ui/components/ReportDetail.tsx

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { updateReportStatus, type reportPagination } from "../../redux/reducer/report";
import { toastConfig } from "../../configs/toastConfig";
import { reportStatus, reportStatusColor } from "../../configs/reportStatus";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setStaffStatus } from "../../redux/reducer/staff";
import HarversineFormula from "../../modules/HarversineFormula";
import { adminService } from "../../service/admin.serv";
import { reportService } from "../../service/report.serv";

// Define a type for the report data
export type Report = {
    id: number;
    name: string;
    description: string;
    status: string;
    reporter: string; // email
    createdAt: string;
    imageUrl: string;
};

interface ReportDetailProps {
    onClose: () => void;
    reportId: string | undefined
}

const ReportDetail: React.FC<ReportDetailProps> = ({ onClose, reportId }) => {
    // Redux
    const staffLocation = useSelector((state: RootState) => state.staff.staffLocation)
    const adminData = useSelector((state: RootState) => state.admin.profile)
    const report = useSelector((state: RootState) =>
        state.report.paginationData.data.find(r => r.id === reportId)
    );
    const dispatch = useDispatch()

    // State
    const [showImage, setShowImage] = useState(false);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


    const [reportDetail, setReportDetail] = useState<null | reportPagination>(null)

    useEffect(() => {
        (async () => {
            if (report) {
                const reportDetail = await reportService.getAReport(report.id)
                if (reportDetail) setReportDetail(reportDetail)
            }
        })()
    }, [report, dispatch])

    if (!report) {
        toastConfig({
            toastType: "error",
            toastMessage: "Không nhận được dữ liệu"
        })
        return null
    }

    // Distance selection
    const [distanceSelection, setDistanceSelection] = useState<keyof typeof distance.current>("kc2")

    const distance = useRef<Record<string, number | null>>({
        kc1: 1000,
        kc2: 3000,
        kc3: 5000,
        kc4: null,
    })

    const [availableStaff, setAvailableStaff] = useState<typeof staffLocation>([])

    useEffect(() => {
        const maxDistance = distance.current[distanceSelection];

        const filtered = staffLocation.filter((staff) => {
            const d = HarversineFormula(
                report.lat,
                report.lng,
                staff.lat,
                staff.lng
            );

            // kc4 = null -> nghĩa là không giới hạn
            return maxDistance === null || d <= maxDistance;
        });

        setAvailableStaff(filtered);
    }, [staffLocation, distanceSelection]);

    // Assign task
    const [chooseStaffState, setChooseStaffState] = useState<Record<string, boolean>>({});

    const handleAssign = async () => {
        const ids = Object.keys(chooseStaffState).filter(key => chooseStaffState[key]);

        const task = await adminService.staffAssign(ids, report.id, adminData.id)
        if (task) {
            await adminService.updateTaskState("in_progress", task.id)
            dispatch(setStaffStatus({ staffId: ids, status: true }))
            dispatch(updateReportStatus({ reportId: report.id, status: "in_progress" }))
            if (reportDetail)
                setReportDetail({
                    ...reportDetail,
                    status: "in_progress"
                })
        }
    }

    if (reportDetail)
        return (
            <div ref={overlayRef} className="fixed z-2000 inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center p-4">
                <div ref={modalContentRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col md:flex-row overflow-hidden">
                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src={report.attachment_paths[0]} // Placeholder image
                            alt={report.name}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setShowImage(true)}
                        />
                    </div>

                    {/* Right Side: Report Details & Staff */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                        {/* Report Info */}
                        <div className="h-fit">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold`}>
                                <h2 className="text-3xl font-bold text-gray-800">{reportDetail.name}</h2>
                                <p className={`${reportStatusColor[reportDetail.status].bgColor} ${reportStatusColor[reportDetail.status].textColor} h-fit w-fit px-2.5 py-1.5 text-center rounded-main`}>
                                    {reportStatus[reportDetail.status]}
                                </p>
                            </span>

                            <div className="flex flex-col items-start mb-4 gap-3.5">
                                <span className="flex flex-col">
                                    <p className="text-gray-600 font-bold">Mô tả:</p>
                                    <p className="text-gray ml-2.5">{reportDetail.details}</p>
                                </span>

                                <span className="flex flex-col">
                                    <p className="text-gray-600 font-bold">Người báo cáo:</p>
                                    <p className="text-gray ml-2.5">{reportDetail.user.username}</p>
                                </span>

                                <span className="flex flex-col">
                                    <p className="text-gray-600 font-bold">Thời gian gửi:</p>
                                    <p className="text-gray ml-2.5">{new Date(reportDetail?.created_at).toLocaleString("vi-VN")}</p>
                                </span>
                            </div>
                        </div>

                        {/* Assigned Staff */}
                        <div className="relative flex-1 h-0 overflow-auto">
                            <div className="sticky top-0 left-0 bg-white flex items-center-safe justify-between border-t py-5">
                                <h3 className="text-xl font-bold text-gray-800">Nhân viên đang ở gần</h3>

                                <span className="flex items-center-safe gap-2.5">
                                    <p className="text-csSmall font-medium">Khoảng cách:</p>
                                    <select value={distanceSelection} onChange={(e) => { setDistanceSelection(e.target.value) }} className="mainshadow border-[0.5px] border-gray">
                                        <option value="kc1">1000m</option>
                                        <option value="kc2">3000m</option>
                                        <option value="kc3">5000m</option>
                                        <option value="kc4">Không giới hạn</option>
                                    </select>
                                </span>
                            </div>

                            <div className="space-y-3 pr-2 flex-1">
                                {reportDetail.status === "pending" && availableStaff.map((staff, index) => {
                                    if (!staff.haveTask)
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setChooseStaffState(prev => ({
                                                        ...prev,
                                                        [staff.id]: !prev[staff.id]
                                                    }));
                                                }}
                                                className="mainShadow flex gap-5 items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors border-[0.5px] border-lightGray"
                                            >
                                                <span className="w-fit">
                                                    <input type="checkbox" checked={!!chooseStaffState[staff.id]} readOnly />
                                                </span>

                                                <div className="flex-1 flex items-center-safe justify-between">
                                                    <span className="">
                                                        <p className="font-semibold text-gray-700">{staff.name}</p>
                                                        <p className="text-sm text-gray-500">{staff.email}</p>
                                                    </span>

                                                    <span className="">
                                                        <p className="text-csSmall font-medium text-mainRed">{Math.floor(HarversineFormula(report.lat, report.lng, staff.lat, staff.lng))} m</p>
                                                    </span>
                                                </div>

                                            </div>
                                        )
                                })}

                                {reportDetail.status !== "pending" && reportDetail.tasks.map((staff, index) => (
                                    <div
                                        key={index}
                                        className="mainShadow flex gap-5 items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors border-[0.5px] border-lightGray"
                                    >
                                        <div className="flex-1 flex items-center-safe justify-between">
                                            <span className="">
                                                <p className="font-semibold text-gray-700">{staff.assignedStaff[0].name}</p>
                                                <p className="text-sm text-gray-500">{staff.assignedStaff[0].email}</p>
                                            </span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {reportDetail.status === "pending" && (
                            <div className="flex gap-3.5">
                                <button className="flex-1 text-csSmall font-medium bg-lighterGray py-2.5">Làm mới</button>
                                <button
                                    onClick={handleAssign}
                                    className="flex-1 text-csSmall font-medium bg-mainRed text-white py-2.5"
                                >Giao việc ({Object.values(chooseStaffState).filter(state => state).length})</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Full-screen image viewer */}
                {showImage && (
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] z-[60] flex items-center justify-center p-4" onClick={() => setShowImage(false)}>
                        <img
                            src={report.attachment_paths[0]}
                            alt="Full screen view"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        />
                    </div>
                )}
            </div>
        );
};

export default ReportDetail;
