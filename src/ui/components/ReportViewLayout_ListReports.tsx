// Import libraries
import type React from "react"

// Import images
import trafficIncidentImg from "../../assets/patterns/trafficIncident_demo.jpg"

// Report card
const ReportCard: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-2.5 border border-lightGray rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-full h-[120px] rounded-md overflow-hidden">
                <img src={trafficIncidentImg} className="w-full h-full object-cover" alt="Sự cố" />
            </div>

            <div className="flex flex-col gap-1.5">
                <h1 className="font-semibold text-csNormal text-black line-clamp-2">Lượng rác khổng lồ ở Chợ sinh Sư phạm. Tuy nhiên, các Chú Bộ Đội đã có mặt để xử lý.</h1>
                <p className="text-csSmall text-darkGray line-clamp-1">Mô tả ngắn</p>
                <p className="text-csSmall font-semibold text-mainRed">Cần hỗ trợ</p>
                <p className="flex items-center gap-1 text-csSmall text-darkGray">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    10.873329, 106.673869
                </p>
            </div>
        </div>
    )
}

// Main component
const ReportViewLayout_ListReports: React.FC = () => {
    // Dummy array for demonstration
    const reports = [1, 2, 3, 4, 5];

    return (
        <div className="absolute z-[900] bg-white flex flex-col gap-2.5 px-mainTwoSidePadding py-2.5 transition-transform duration-300 ease-in-out w-full h-4/5 bottom-0 rounded-t-2xl md:w-[400px] md:h-full md:top-0 md:left-0 md:bottom-auto md:rounded-none md:border-r md:border-lightGray">
            <div className="w-full flex flex-col gap-2.5">
                <h2 className="text-csBig text-black font-semibold">Danh sách báo cáo</h2>

                <div className="h-fit w-full">
                    <div className="flex items-center gap-2 border border-lightGray rounded-small px-2.5 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-darkGray">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <input
                            className="outline-none h-full w-full flex-1 text-black text-csNormal bg-transparent"
                            type="text"
                            placeholder="Tìm kiếm báo cáo..."
                        />
                    </div>
                </div>
            </div>

            {/* List of reports */}
            <div className="w-full flex-1 flex flex-col gap-2.5 overflow-y-auto pr-1.5">
                {reports.map(item => <ReportCard key={item} />)}
            </div>
        </div>
    )
}

export default ReportViewLayout_ListReports