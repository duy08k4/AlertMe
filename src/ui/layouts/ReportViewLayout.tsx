// Import libraries
import type React from "react"
import { lazy, useState, Suspense, useRef } from "react"

// Leaflet
import { MapContainer, TileLayer } from "react-leaflet"
import { Link } from "react-router-dom"

// Route Config
import { routeConfig } from "../../configs/routeConfig"

// Import component
const ReportViewLayout_ListReports = lazy(() => import("../components/ReportViewLayout_ListReports"))
const ReportViewLayout_ListSupportTeams = lazy(() => import("../components/ReportViewLayout_ListSupportTeams"))
import DownloadDataForm from "../components/DownloadDataForm"

// Import images
import AlertMe_Logo from "../../assets/AlertMe.png"
import AlertMe_TextLogo from "../../assets/AlertMe_Text.png"

// Types
type funcButton_type = {
    title: string,
    variableState: boolean
    func: () => void
}

// Quick Report Form Component
const QuickReportForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="absolute inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col animate-fade-in-down">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-lightGray">
                    <h2 className="text-csBig font-semibold text-black">Báo cáo nhanh sự cố</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-light-background">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-darkGray">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                    {/* Image Section */}
                    <div className="flex flex-col gap-2.5">
                        <div className="w-full h-48 bg-light-background rounded-md flex items-center justify-center border-2 border-dashed border-lightGray overflow-hidden">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Xem trước" className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-darkGray">Xem trước ảnh</span>
                            )}
                        </div>
                        <div className="flex gap-2.5">
                            <button className="w-1/3 flex items-center justify-center gap-2 text-csSmall font-semibold bg-gray-200 text-black px-4 py-2 rounded-small hover:bg-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                            </button>
                            <button onClick={triggerFileUpload} className="w-2/3 flex items-center justify-center gap-2 text-csSmall font-semibold bg-gray-200 text-black px-4 py-2 rounded-small hover:bg-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Tải ảnh lên
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="reportName" className="font-semibold text-csNormal text-black">Tên báo cáo</label>
                        <input id="reportName" type="text" placeholder="VD: Kẹt xe tại ngã tư Hàng Xanh" className="outline-none w-full border border-lightGray rounded-small px-2.5 py-2 text-csNormal" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="reportDescription" className="font-semibold text-csNormal text-black">Mô tả</label>
                        <textarea id="reportDescription" placeholder="Mô tả chi tiết về sự cố..." rows={4} className="outline-none w-full border border-lightGray rounded-small px-2.5 py-2 text-csNormal resize-none"></textarea>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end items-center p-4 border-t border-lightGray">
                    <button className="bg-mainRed text-white font-semibold px-6 py-2 rounded-small hover:opacity-90">
                        Gửi báo cáo
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main component
const ReportViewLayout: React.FC = () => {
    // State
    const [isReportList, setIsReportList] = useState<boolean>(false)
    const [isSupportTeams, setIsSupportTeams] = useState<boolean>(false)
    const [isQuickReportFormVisible, setIsQuickReportFormVisible] = useState<boolean>(false)
    const [isDownloadFormVisible, setIsDownloadFormVisible] = useState<boolean>(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

    // Handlers
    const handleReportClick = () => {
        setIsReportList(!isReportList)
        setIsMobileMenuOpen(false)
    }

    const handleSupportClick = () => {
        setIsSupportTeams(!isSupportTeams)
        setIsMobileMenuOpen(false)
    }

    const openQuickReport = () => {
        setIsQuickReportFormVisible(true);
        setIsMobileMenuOpen(false);
    }

    const openDownloadForm = () => {
        setIsDownloadFormVisible(true);
        setIsMobileMenuOpen(false);
    }

    const desktopFuncButtons: funcButton_type[] = [
        { title: "Danh sách báo cáo", variableState: isReportList, func: handleReportClick },
        { title: "Danh sách đội cứu hộ", variableState: isSupportTeams, func: handleSupportClick }
    ]

    return (
        <div className="relative h-full w-full flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between gap-4 px-4 md:px-mainTwoSidePadding py-3 border-b border-b-lightGray flex-shrink-0">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <Link to={routeConfig.landing.root} className="mainShadow flex items-center gap-2.5 text-black text-csSmall font-semibold px-2.5 py-2.5 rounded-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <span className="hidden md:inline">Quay lại</span>
                    </Link>
                    <span className="flex items-center gap-1.5">
                        <img className="h-[30px] md:h-[40px]" src={AlertMe_Logo} />
                        <img className="h-[15px] md:h-[20px]" src={AlertMe_TextLogo} />
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2.5">
                    {desktopFuncButtons.map((btn, index) => (
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
                    ))}
                    <button onClick={openQuickReport} className="btn rounded-small text-white text-csSmall font-semibold flex items-center gap-2.5 px-5 py-1.5 bg-mainRed hover:opacity-90">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                        Báo cáo nhanh
                    </button>
                    <button onClick={openDownloadForm} className="flex items-center gap-1.5 text-csSmall text-white font-semibold bg-mainDark px-5 py-2 rounded-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Tải dữ liệu
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </header>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[1100]" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-lg p-5 animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex flex-col gap-3">
                            <button onClick={handleReportClick} className={`w-full text-left p-3 rounded-md font-semibold ${isReportList ? 'bg-red-100 text-mainRed' : 'hover:bg-light-background'}`}>Danh sách báo cáo</button>
                            <button onClick={handleSupportClick} className={`w-full text-left p-3 rounded-md font-semibold ${isSupportTeams ? 'bg-red-100 text-mainRed' : 'hover:bg-light-background'}`}>Danh sách đội cứu hộ</button>
                            <button onClick={openQuickReport} className="w-full text-left p-3 rounded-md font-semibold hover:bg-light-background">Báo cáo nhanh</button>
                            <button onClick={openDownloadForm} className="w-full text-left p-3 rounded-md font-semibold hover:bg-light-background">Tải dữ liệu sự cố</button>
                            <Link to={routeConfig.landing.endpoint.download} className="w-full text-left p-3 rounded-md font-semibold hover:bg-light-background block">Tải AlertMe</Link>
                        </nav>
                    </div>
                </div>
            )}

            <div className="relative w-full flex-1 flex overflow-hidden">
                <Suspense fallback={<div className="w-full md:w-[400px] bg-white p-5 border-r border-lightGray">Đang tải...</div>}>
                    {isReportList && (<ReportViewLayout_ListReports />)}
                </Suspense>

                <MapContainer
                    center={[10.762622, 106.660172]} // HCM Position
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full z-0"
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                </MapContainer>

                <Suspense fallback={<div className="w-full md:w-[350px] bg-white p-5 border-l border-lightGray">Đang tải...</div>}>
                    {isSupportTeams && (<ReportViewLayout_ListSupportTeams />)}
                </Suspense>
            </div>

            {isQuickReportFormVisible && <QuickReportForm onClose={() => setIsQuickReportFormVisible(false)} />}
            {isDownloadFormVisible && <DownloadDataForm onClose={() => setIsDownloadFormVisible(false)} />}
        </div>
    )
}

export default ReportViewLayout