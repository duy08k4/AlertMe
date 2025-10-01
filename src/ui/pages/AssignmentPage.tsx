// Import libraries
import type React from "react"
import { useRef, useState } from "react";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Config
import { reportConfig } from "../../configs/reportConfig";

// Default icon for React
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Types
type tableType = {
    name: string,
    icon_d: string,
    state: boolean,
    func: () => void
}

type funnelType = {
    label: string,
    color: string
}

// Main component
const AssignmentPage: React.FC = () => {
    // State
    const [isStaff, setIsStaff] = useState<boolean>(false)
    const [isMap, setIsMap] = useState<boolean>(false)
    const [isFunnel, setIsFunnel] = useState<boolean>(false)

    // Table
    const table: tableType[] = [
        {
            name: "Bản đồ", state: isMap, func: () => { setIsMap(!isMap) },
            icon_d: "M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z"
        },
        {
            name: "Nhân viên", state: isStaff, func: () => { setIsStaff(!isStaff) },
            icon_d: "M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
        }
    ]

    // Funnel
    const funnelLevel: funnelType[] = [
        { label: reportConfig.level.low.label, color: reportConfig.level.low.color },
        { label: reportConfig.level.medium.label, color: reportConfig.level.medium.color },
        { label: reportConfig.level.high.label, color: reportConfig.level.high.color },
        { label: reportConfig.level.emergency.label, color: reportConfig.level.emergency.color },
    ]

    const funnelState: funnelType[] = [
        { label: reportConfig.state.waiting.label, color: reportConfig.state.waiting.color },
        { label: reportConfig.state.pending.label, color: reportConfig.state.pending.color },
        { label: reportConfig.state.successful.label, color: reportConfig.state.successful.color },
    ]

    return (
        <div className="h-full w-full flex">
            {/* Online staff list */}
            {isStaff && (
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
            )}

            <div className="h-full flex-1 flex flex-col">
                {/* Map */}
                {isMap && (
                    <div className="h-2/3 w-full">
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
                        </MapContainer>
                    </div>
                )}

                {/* Report list */}
                <div className="flex-1 h-0 w-full border-t border-t-lightGray px-mainTwoSidePadding flex flex-col">
                    <div className="flex justify-between items-center py-2 border-b border-b-lightGray">
                        <span className="flex items-center gap-1.5">
                            {table.map((snap, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`btn mainShadow font-semibold ${snap.state ? "bg-mainRed text-white" : "bg-white text-mainDark"} flex items-center gap-1.5 px-2.5 py-1 border-[0.5px] border-lightGray rounded-small`}
                                        onClick={snap.func}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d={snap.icon_d} clipRule="evenodd" />
                                        </svg>

                                        {snap.name}
                                    </button>
                                )
                            })}

                        </span>

                        <span className="flex items-center gap-5">
                            <span>
                                <p><b>Số lượng báo cáo:</b> 100</p>
                            </span>
                            <span>
                                <button
                                    className="btn mainShadow text-mainDark font-semibold flex items-center gap-1.5 px-2.5 py-1 border-[0.5px] border-lightGray rounded-small"
                                    onClick={() => { setIsFunnel(!isFunnel) }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                    </svg>

                                    Bộ lọc
                                </button>
                            </span>

                            <span className="flex items-center gap-1.5">
                                <button className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                                <p>Trang 1</p>
                                <button className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </span>
                        </span>
                    </div>

                    {isFunnel && (
                        <div className="flex items-center gap-7.5 py-2 border-b border-b-lightGray">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                            </svg>

                            <span className="flex items-center gap-2.5">
                                <p className="text-black text-csSmall font-semibold">Độ nghiêm trọng:</p>
                                <span className="flex items-center gap-1">
                                    {funnelLevel.map((snap, index) => {
                                        return (
                                            <button key={index} className="btn text-white text-csSmall px-1.5" style={{ backgroundColor: snap.color }}>{snap.label}</button>
                                        )
                                    })}
                                </span>
                            </span>

                            <span className="flex items-center gap-2.5">
                                <p className="text-black text-csSmall font-semibold">Trạng thái:</p>
                                <span className="flex items-center gap-1">
                                    {funnelState.map((snap, index) => {
                                        return (
                                            <button key={index} className="btn text-white text-csSmall px-1.5" style={{ backgroundColor: snap.color }}>{snap.label}</button>
                                        )
                                    })}
                                </span>
                            </span>
                        </div>

                    )}

                    {/* List */}
                    <div className="flex-1 overflow-auto relative">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3 w-1/6">Tên báo cáo</th>
                                    <th scope="col" className="px-6 py-3">Mức độ nghiêm trọng</th>
                                    <th scope="col" className="px-6 py-3">Người báo cáo</th>
                                    <th scope="col" className="px-6 py-3">Hình ảnh</th>
                                    <th scope="col" className="px-6 py-3">Vị trí</th>
                                    <th scope="col" className="px-6 py-3">Thời gian</th>
                                    <th scope="col" className="px-6 py-3">Trạng thái</th>
                                    <th scope="col" className="px-6 py-3">Chi tiết</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array(20).fill(0).map((_, index) => (
                                    <tr className="bg-white border-b" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index}
                                        </th>
                                        <td className="px-6 py-4">
                                            Báo cáo {index}
                                        </td>
                                        <td className="px-6 py-4">
                                            Nặng
                                        </td>
                                        <td className="px-6 py-4">
                                            Người báo cáo {index}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="font-medium text-blue-600 hover:underline">Xem</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="font-medium text-blue-600 hover:underline">Xem</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            10:00 01/10/2025
                                        </td>
                                        <td className="px-6 py-4">
                                            Chờ xử lý
                                        </td>
                                        <td className="px-6 py-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentPage
