// Import libraries
import type React from "react"

// Report card

// Main component
const ReportViewLayout_ListReports: React.FC = () => {
    return (
        <div className="w-[350px] flex flex-col gap-2.5 px-mainTwoSidePadding">
            <span className="w-full flex flex-col gap-2.5 pt-2.5">
                <h2 className="text-csBig text-black font-semibold">Danh sách báo cáo</h2>

                <span className="h-fit w-full">

                    <span className="flex items-center gap-1 border-[0.5px] border-lightGray rounded-small px-2.5 py-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <input
                            className="outline-none h-full flex-1 text-black text-csNormal"
                            type="text"
                            placeholder="Tìm kiếm báo cáo..."
                        />
                    </span>

                </span>
            </span>

            <span className="">

            </span>
        </div>
    )
}

export default ReportViewLayout_ListReports