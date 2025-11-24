// src/ui/components/ReportDetail.tsx

import type React from "react";
import { useState, useRef, useEffect } from "react";
import type { reportPagination } from "../../redux/reducer/report";
import { toastConfig } from "../../configs/toastConfig";
import { reportStatus, reportStatusColor } from "../../configs/reportStatus";

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
    report: reportPagination | undefined
}

const ReportDetail: React.FC<ReportDetailProps> = ({ onClose, report }) => {
    const [showImage, setShowImage] = useState(false);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && event.target === overlayRef.current) {
                onClose();
            }
        };

        const currentOverlayRef = overlayRef.current;
        if (currentOverlayRef) {
            currentOverlayRef.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            if (currentOverlayRef) {
                currentOverlayRef.removeEventListener("mousedown", handleClickOutside);
            }
        };
    }, [onClose]);

    const getStatusClass = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-200 text-yellow-800";
            case "approved":
                return "bg-green-200 text-green-800";
            case "rejected":
                return "bg-red-200 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    if (!report) {
        toastConfig({
            toastType: "error",
            toastMessage: "Không nhận được dữ liệu"
        })
        return null
    }

    return (
        <div ref={overlayRef} className="fixed z-2000 inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center p-4">
            <div ref={modalContentRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-auto max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
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
                            <h2 className="text-3xl font-bold text-gray-800">Tên báo cáo</h2>
                            <p className={`${reportStatusColor[report.status].bgColor} ${reportStatusColor[report.status].textColor} h-fit w-fit px-2.5 py-1.5 text-center rounded-main`}>
                                {reportStatus[report.status]}
                            </p>
                        </span>

                        <div className="flex flex-col items-start mb-4 gap-3.5">
                            <span className="flex flex-col">
                                <p className="text-gray-600 font-bold">Mô tả:</p>
                                <p className="text-gray ml-2.5">{report.details}</p>
                            </span>

                            <span className="flex flex-col">
                                <p className="text-gray-600 font-bold">Người báo cáo:</p>
                                <p className="text-gray ml-2.5">{report.user.username}</p>
                            </span>

                            <span className="flex flex-col">
                                <p className="text-gray-600 font-bold">Thời gian gửi:</p>
                                <p className="text-gray ml-2.5">{new Date(report.created_at).toLocaleString("vi-VN")}</p>
                            </span>
                        </div>
                    </div>

                    {/* Assigned Staff */}
                    <div className="flex-shrink-0">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 border-t pt-4">Nhân viên đang ở gần</h3>
                        <div className="space-y-3 pr-2">
                            {Array(5).fill(0).map((_, index) => (
                                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-700">Nhân viên {index + 1}</p>
                                        <p className="text-sm text-gray-500">staff_id_{index + 1}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
