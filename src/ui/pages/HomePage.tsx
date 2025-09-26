// Import libraries
import type React from "react";

// Router DOM
import { Link } from "react-router-dom";

// Image
import AlertMe_Text from "../../assets/AlertMe_Text.png"
import Towing from "../../assets/patterns/Towing.png"

// Main component
const HomePage: React.FC = () => {
    return (
        <div className="h-full w-full flex">
            <div className="flex-2/5 flex flex-col justify-between pt-40 pb-bottomPadding">

                <div className="flex flex-col gap-10">
                    <span className="flex flex-col gap-5 items-start">
                        <img src={AlertMe_Text} />
                        <h1 className="text-black font-semibold text-5xl tracking-wider capitalize">Hệ thống báo cáo sự cố</h1>
                    </span>

                    <span className="text-csNormal font-semibold text-gray leading-[2] text-justify">
                        AlertMe là một hệ thống báo cáo sự cố theo thời gian thực.
                        Hệ thống được phát triển để nhận các báo cáo sự cố với tọa độ cụ thể.
                        Khi hệ thống nhận được một báo cáo, quản trị viên sẽ điều phối các nhân viên kỹ thuật đến để khắc phục sự cố.
                    </span>

                    <span>
                        <Link to="" className="btn text-csNormal text-white font-semibold flex gap-10 bg-mainRed w-fit px-5 py-2.5 rounded-small">
                            Dùng thử miễn phí
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>

                        </Link>
                    </span>
                </div>

                <div>
                    <p className="font-semibold text-mainDark">© 2025 Nhóm 6. Làm bằng ♥ cho môn Đồ Án GIS.</p>
                </div>
            </div>

            <div className="flex-3/5 h-full flex items-end-safe">
                <img src={Towing} className="w-full" />
            </div>
        </div>
    )
}

export default HomePage