// Import libraries
import type React from "react"
import { lazy, useState } from "react"

// Leaflet
import { MapContainer, TileLayer } from "react-leaflet"
import { Link } from "react-router-dom"

// Route Config
import { routeConfig } from "../../configs/routeConfig"

// Import component
const ReportViewLayout_ListReports = lazy(() => import("../components/ReportViewLayout_ListReports"))
const ReportViewLayout_ListSupportTeams = lazy(() => import("../components/ReportViewLayout_ListSupportTeams"))

// Import images
import AlertMe_Logo from "../../assets/AlertMe.png"
import AlertMe_TextLogo from "../../assets/AlertMe_Text.png"

// Types
type funcButton_type = {
    title: string,
    variableState: boolean
    func: () => void
}

// Main component
const ReportViewLayout: React.FC = () => {
    // Func button state
    const [isReportList, setIsReportList] = useState<boolean>(false)
    const [isSupportTeams, setIsSupportTeams] = useState<boolean>(false)

    const listFuncButton: funcButton_type[] = [
        { title: "Danh sách báo cáo", variableState: isReportList, func: () => { setIsReportList(!isReportList) } },
        { title: "Danh sách đội cứu hộ", variableState: isSupportTeams, func: () => { setIsSupportTeams(!isSupportTeams) } }
    ]


    return (
        <div className="relative h-full w-full flex flex-col">
            <div className="flex items-center justify-between gap-20 px-mainTwoSidePadding py-3 border-b border-b-lightGray">
                <span className="flex items-center gap-10">
                    <Link to={routeConfig.landing.root} className="mainShadow flex items-center gap-2.5 text-black text-csSmall font-semibold px-2.5 py-2.5 rounded-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                        Quay lại
                    </Link>

                    <div className="flex items-center gap-5">
                        <span className="flex items-center gap-1.5">
                            <img className="h-[40px]" src={AlertMe_Logo} />
                            <img className="h-[20px]" src={AlertMe_TextLogo} />
                        </span>

                        {listFuncButton.map((btn, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={btn.func}
                                    className={`btn rounded-small text-black text-csSmall font-semibold flex items-center gap-2.5 px-5 py-1.5 hover:bg-light-background ${btn.variableState && "!text-mainRed bg-[rgba(242,82,85,0.2)]"}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                    </svg>

                                    {btn.title}
                                </button>
                            )
                        })}
                    </div>
                </span>

                <span className="flex items-center gap-2.5">
                    <button className="flex items-center gap-1.5 text-csSmall text-white font-semibold bg-mainDark px-5 py-2 rounded-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Tải dữ liệu sự cố
                    </button>

                    <Link to={routeConfig.landing.endpoint.download} className="flex items-center gap-1.5 text-csSmall text-mainDark font-semibold bg-white px-5 py-2 rounded-small border border-mainDark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>

                        Tải AlertMe
                    </Link>
                </span>
            </div>

            <div className="relative w-full flex-1 flex">
                {isReportList && (<ReportViewLayout_ListReports />)}

                <MapContainer
                    center={[10.762622, 106.660172]} // HCM Position
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                </MapContainer>

                {isSupportTeams && (<ReportViewLayout_ListSupportTeams />)}
            </div>


        </div>
    )
}

export default ReportViewLayout