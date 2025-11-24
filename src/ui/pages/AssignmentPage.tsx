// Import libraries
import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react";
import ReportDetail from "../components/ReportDetail";

// Leaflet
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


// Default icon for React
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { reportService } from "../../service/report.serv";
import { reportStatus } from "../../configs/reportStatus";
import type { reportPagination } from "../../redux/reducer/report";
import useDebounce from "../../hooks/Debounce";
import MapControlPannel from "../components/MapControlPannel";
import uniqolor from "uniqolor";

import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Custom icon
interface PinMarkerProps {
    position: [number, number];
    color: string;
    size?: number;
}
const PinMarker: React.FC<PinMarkerProps> = ({
    position,
    color,
    size = 32,
}) => {
    const icon = L.divIcon({
        className: "custom-pin-marker",
        html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
      </svg>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
    });

    return <Marker position={position} icon={icon} />;
};

const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Main component
const AssignmentPage: React.FC = () => {
    // State
    const [showReportDetail, setShowReportDetail] = useState<boolean>(false);
    const [listHeight, setListHeight] = useState<number>(50); // Initial height in percentage
    const [selectedReport, setSelectedReport] = useState<reportPagination>()

    const handleRowClick = (reportInput: reportPagination) => {
        setShowReportDetail(true);
        setSelectedReport(reportInput)
    };

    const handleCloseReportDetail = () => {
        setShowReportDetail(false);
    };

    const listRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);
    const startY = useRef(0);
    const initialListHeight = useRef(0); // Store initial height in pixels

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isResizing.current = true;
        startY.current = e.clientY;
        if (listRef.current) {
            initialListHeight.current = listRef.current.offsetHeight; // Store initial height in pixels
        }
        e.preventDefault();
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing.current || !listRef.current) return;

        const deltaY = startY.current - e.clientY; // How much the mouse has moved vertically
        const parentHeight = listRef.current.parentElement?.clientHeight || 0;
        if (parentHeight === 0) return;

        // Calculate new height in pixels
        const newHeightPx = initialListHeight.current + deltaY;

        // Convert to percentage and constrain
        const newHeightPercent = (newHeightPx / parentHeight) * 100;

        if (newHeightPercent > 10 && newHeightPercent < 90) {
            setListHeight(newHeightPercent);
        }
    }, []); // No dependencies needed here as it uses refs and setListHeight (functional update)

    const handleMouseUp = useCallback(() => {
        isResizing.current = false;
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    // Search
    const [searchContent, setSearchContent] = useState<string>("")
    const debounceSearch = useDebounce(searchContent, 500)

    useEffect(() => {
        console.log(debounceSearch)
        reportService.getAllReport(page, undefined, undefined, undefined, undefined, undefined, debounceSearch)
    }, [debounceSearch])

    // Pagination
    const page = useSelector((state: RootState) => state.report.page)
    const maxPage = useSelector((state: RootState) => state.report.maxPage)
    const totalReport = useSelector((state: RootState) => state.report.amountReports)
    const paginationData = useSelector((state: RootState) => state.report.paginationData.data)

    const nextPage = async () => {
        await reportService.getAllReport(page + 1, undefined, undefined, undefined, undefined, undefined, searchContent)
    }

    const prevPage = async () => {
        await reportService.getAllReport(page - 1, undefined, undefined, undefined, undefined, undefined, searchContent)
    }

    return (
        <div className="h-full w-full flex">
            {/* Online staff list */}
            <div className="csScroll relative w-[350px] h-full flex flex-col gap-2.5 border-r border-r-lightGray">
                <div className="sticky top-0 left-0 w-full bg-white px-mainTwoSidePadding py-5 border-b border-b-lightGray">
                    <h1 className="text-black text-csBig font-bold flex items-center gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                        </svg>
                        Nhân viên kỹ thuật
                    </h1>
                    <span className="text-gray text-csSmall font-semibold flex items-center gap-1.5">
                        <i className="fas fa-circle text-lime"></i>
                        10 nhân viên đang hoạt động
                    </span>
                </div>

                <div className="h-0 flex-1 overflow-auto px-mainTwoSidePadding flex flex-col gap-5">
                    {Array(10).fill(0).map((val, index) => {
                        return (
                            <span key={index} className="flex items-center justify-between border border-lightGray px-2.5 py-5 rounded-main">
                                <span className="">
                                    <h3 className="text-csNormal text-black font-bold">Nhân viên {index}</h3>
                                    <p className="text-csSmall font-semibold text-gray">staff_id {val + index}</p>
                                </span>

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </span>
                        )
                    })}
                </div>
            </div>


            <div className="relative h-full flex-1 flex flex-col">
                {/* Map */}
                <div className="h-full w-full">
                    <MapContainer
                        center={[10.762622, 106.660172]} // HCM Position
                        zoom={13}
                        scrollWheelZoom={true}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup>
                            {paginationData && paginationData.map((data) => {
                                return <PinMarker key={data.id} color={uniqolor(data.id).color} position={[data.lat, data.lng]} />
                            })}
                        </MarkerClusterGroup>
                    </MapContainer>
                </div>

                {/* Report list */}
                <div
                    ref={listRef}
                    className="absolute bottom-0 left-0 z-1500 w-full bg-white border-t border-t-lightGray px-mainTwoSidePadding flex flex-col"
                    style={{ height: `${listHeight}%` }}
                >
                    {/* Draggable handle */}
                    <div
                        className="w-full h-fit flex items-center justify-center cursor-ns-resize py-1.5"
                        onMouseDown={handleMouseDown}
                    >
                        <div className="w-20 h-1.5 bg-gray-300 rounded-full"></div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-b-lightGray">
                        <span className="flex items-center gap-1.5">
                            <input type="text" placeholder="Tìm theo tên báo cáo, người gửi" className="w-[300px] px-2.5 py-1 border-[0.5px] border-lightGray" value={searchContent} onChange={(e) => setSearchContent(e.target.value)}/>
                        </span>

                        <span className="flex items-center gap-5">
                            <span>
                                <p><b>Tổng lượng báo cáo:</b> {totalReport}</p>
                            </span>

                            <span className="flex items-center gap-1.5">
                                <button className="btn px-2.5" onClick={prevPage} disabled={page === 1}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>

                                <p>Trang {page}/{maxPage}</p>

                                <button className="btn px-2.5" onClick={nextPage} disabled={page === maxPage}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </span>
                        </span>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-auto relative">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-mainDark sticky z-100 top-0 left-0">
                                <tr className="bg-inherit">
                                    <th scope="col" className="text-white px-6 py-3 min-w-3/8 sticky z-10 left-0">Tên báo cáo</th>
                                    <th scope="col" className="text-white px-6 py-3 min-w-1/8 max-w-[350px] truncate">Trạng thái</th>
                                    <th scope="col" className="text-white px-6 py-3 min-w-1/8 max-w-[350px] truncate">Người gửi</th>
                                    <th scope="col" className="text-white px-6 py-3 min-w-1/8 max-w-[350px] truncate">Thời gian gửi</th>
                                    <th scope="col" className="text-white px-6 py-3 min-w-1/8 max-w-[350px] truncate text-center">Thời gian xử lý (giờ)</th>
                                    <th scope="col" className="text-white px-6 py-3 min-w-1/8 max-w-[350px] truncate">Vị trí</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginationData && paginationData.map((data, index) => (
                                    <tr className="cursor-pointer odd:bg-lighterGray even:bg-white last:border-b-[0.5px] last:border-lightGray" key={index} onClick={() => { handleRowClick(data) }}>
                                        <td className="text-black px-6 py-4 min-w-3/8 max-w-[350px] truncate sticky bg-inherit z-10 top-0 left-0">
                                            {data.name}
                                        </td>

                                        <td className="text-black px-6 py-4 min-w-1/8 max-w-[350px] truncate">
                                            {reportStatus[data.status]}
                                        </td>

                                        <td className="text-black px-6 py-4 min-w-1/8 max-w-[350px] truncate">
                                            {data.user.username}
                                        </td>

                                        <td className="text-black px-6 py-4 min-w-1/8 max-w-[350px] truncate">
                                            {new Date(data.created_at).toLocaleString("vi-VN")}
                                        </td>

                                        <td className="text-black px-6 py-4 min-w-1/8 max-w-[350px] truncate text-center">
                                            {(new Date(data.updated_at).getTime() - new Date(data.created_at).getTime()) / 1000 / 60 / 60}
                                        </td>

                                        <td className="text-black px-6 py-4 min-w-1/8 max-w-[350px] truncate">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={uniqolor(data.id).color} className="size-5">
                                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <MapControlPannel />
            </div>

            {showReportDetail && <ReportDetail onClose={handleCloseReportDetail} report={selectedReport} />}
        </div>
    )
}

export default AssignmentPage
