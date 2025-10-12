// Import libraries
import type React from "react"
import { useState, useRef, useEffect } from "react";

// Leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


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

type incidentType = {
    name: string,
    func: (text: string) => void,
    filter_func: () => void // Need change output type
}

// Main component
const AssignmentPage: React.FC = () => {
    // State
    const [isStaff, setIsStaff] = useState<boolean>(true)
    const [isMap, setIsMap] = useState<boolean>(false)

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

    // Incident type
    const [isFilterIncidentType, setIsFilterIncidentType] = useState<boolean>(false)
    const [incidentTypeData, setIncidentTypeData] = useState<string>()

    const filterIncidentTypeRef = useRef<HTMLSpanElement>(null);
    const dropdownIncidentTypeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterIncidentTypeRef.current &&
                !filterIncidentTypeRef.current.contains(event.target as Node) &&
                dropdownIncidentTypeRef.current &&
                !dropdownIncidentTypeRef.current.contains(event.target as Node)
            ) {
                setIsFilterIncidentType(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterIncidentType]);

    const incidentType: incidentType[] = [
        { name: "Tuấn tràn RAM", func: (text: string) => { setIncidentTypeData(text) }, filter_func: () => { } },
        { name: "Tuấn cháy CPU", func: (text: string) => { setIncidentTypeData(text) }, filter_func: () => { } },
        { name: "Tuấn 1 màn hình", func: (text: string) => { setIncidentTypeData(text) }, filter_func: () => { } },
    ]

    // Report state
    const [isFilterReportState, setIsFilterReportState] = useState<boolean>(false)
    const [reportStateData, setReportStateData] = useState<string>()

    const filterReportStateRef = useRef<HTMLSpanElement>(null);
    const dropdownReportStateRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterReportStateRef.current &&
                !filterReportStateRef.current.contains(event.target as Node) &&
                dropdownReportStateRef.current &&
                !dropdownReportStateRef.current.contains(event.target as Node)
            ) {
                setIsFilterReportState(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterReportState]);

    const reportState: incidentType[] = [
        { name: "Chờ xử lý", func: (text: string) => { setReportStateData(text) }, filter_func: () => { } },
        { name: "Đang xử lý", func: (text: string) => { setReportStateData(text) }, filter_func: () => { } },
        { name: "Đã xử lý", func: (text: string) => { setReportStateData(text) }, filter_func: () => { } },
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
                            <span className="">

                                <input type="text" placeholder="Tìm tên báo cáo" className="w-[300px] px-2.5 py-1 border-[0.5px] border-lightGray" />
                            </span>
                            <span>
                                <p><b>Số lượng báo cáo:</b> 100</p>
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

                    {/* List */}
                    <div className="flex-1 overflow-auto relative">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3 w-1/6">Tên báo cáo</th>
                                    <th scope="col" className="px-6 py-3">Vị trí</th>
                                    <th scope="col" className="px-6 py-3 flex items-center gap-2.5">
                                        Loại sự cố
                                        <span className="relative" ref={filterIncidentTypeRef}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-4 cursor-pointer ${incidentTypeData ? 'text-mainRed' : 'text-gray-700'}`} onClick={() => { setIsFilterIncidentType(!isFilterIncidentType) }}>
                                                <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                            </svg>

                                            {isFilterIncidentType && (
                                                <span className="mainShadow absolute top-full right-0 mt-2 flex flex-col w-max bg-white rounded-md z-10 overflow-hidden" ref={dropdownIncidentTypeRef}>
                                                    <p className="cursor-pointer select-none text-sm h-fit w-full whitespace-nowrap text-gray-600 font-semibold hover:bg-gray-100 p-2.5" onClick={() => {
                                                        setIncidentTypeData(undefined)
                                                        setIsFilterIncidentType(false)
                                                    }}>Tất cả</p>
                                                    {incidentType.map((snap, index) => {
                                                        return (
                                                            <p key={index} className={`cursor-pointer select-none text-sm h-fit w-full whitespace-nowrap font-semibold hover:bg-gray-100 p-2.5 ${incidentTypeData === snap.name ? 'bg-gray-200 text-mainDark' : 'text-mainDark'}`} onClick={() => {
                                                                snap.func(snap.name)
                                                                setIsFilterIncidentType(false)
                                                            }}>{snap.name}</p>
                                                        )
                                                    })}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">Thời gian</th>
                                    <th scope="col" className="px-6 py-3">Thời gian xử lý</th>
                                    <th scope="col" className="px-6 py-3">Hình ảnh</th>
                                    <th scope="col" className="px-6 py-3 flex items-center gap-2.5">
                                        Trạng thái
                                        <span className="relative" ref={filterReportStateRef}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-4 cursor-pointer ${reportStateData ? 'text-mainRed' : 'text-gray-700'}`} onClick={() => { setIsFilterReportState(!isFilterReportState) }}>
                                                <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                            </svg>

                                            {isFilterReportState && (
                                                <span className="mainShadow absolute top-full right-0 mt-2 flex flex-col w-max bg-white rounded-md z-10 overflow-hidden" ref={dropdownReportStateRef}>
                                                    <p className="cursor-pointer select-none text-sm h-fit w-full whitespace-nowrap text-gray-600 font-semibold hover:bg-gray-100 p-2.5" onClick={() => {
                                                        setReportStateData(undefined)
                                                        setIsFilterReportState(false)
                                                    }}>Tất cả</p>
                                                    {reportState.map((snap, index) => {
                                                        return (
                                                            <p key={index} className={`cursor-pointer select-none text-sm h-fit w-full whitespace-nowrap font-semibold hover:bg-gray-100 p-2.5 ${reportStateData === snap.name ? 'bg-gray-200 text-mainDark' : 'text-mainDark'}`} onClick={() => {
                                                                snap.func(snap.name)
                                                                setIsFilterReportState(false)
                                                            }}>{snap.name}</p>
                                                        )
                                                    })}
                                                </span>
                                            )}
                                        </span>
                                    </th>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                        <td className="px-6 py-4">
                                            Máy tuấn có 1 màn hình
                                        </td>
                                        <td className="px-6 py-4">
                                            10:00 01/10/2025
                                        </td>
                                        <td className="px-6 py-4">
                                            30 phút
                                        </td>
                                        <td className="px-6 py-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                        <td className="px-6 py-4">
                                            Chờ xử lý
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
