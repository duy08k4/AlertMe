// Import libraries
import type React from "react";

// Router DOM
import { Link } from "react-router-dom";

// Images
import AlertMe_Text from "../../assets/AlertMe_Text.png"
import AlertMe_Mobile_Mockup from "../../assets/patterns/AlertMe_Mobile_Mockup.png"

// Main component
const DownloadPage: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 p-6 md:p-12 lg:px-36 lg:pt-20">
                <div className="flex justify-center">
                    <img src={AlertMe_Mobile_Mockup} className="h-[400px] md:h-[500px] lg:h-[600px]" />
                </div>

                <div className="flex-1 flex flex-col gap-6">
                    <span className="flex flex-col items-center gap-3 md:flex-row md:items-end md:gap-5">
                        <img src={AlertMe_Text} className="h-[40px] md:h-[60px]" />
                        <p className="text-gray text-lg md:text-xl font-semibold">v1.0.0</p>
                    </span>

                    <p className="text-base md:text-lg text-gray text-justify">
                        AlertMe là ứng dụng di động cho phép người dân dễ dàng báo cáo các sự cố giao thông trực tiếp đến đơn vị xử lý. Với giao diện thân thiện, bạn có thể gửi báo cáo kèm hình ảnh, vị trí chính xác và theo dõi tiến độ xử lý. Ngoài ra, tính năng SOS khẩn cấp giúp bạn gửi tín hiệu cầu cứu nhanh chóng khi gặp nguy hiểm. Hãy cùng AlertMe chung tay xây dựng một thành phố thông minh, an toàn và hiện đại hơn.
                    </p>

                    <span className="flex flex-col gap-2.5 text-base md:text-lg text-black">
                        <p><b>Đối tượng phục vụ:</b> Người dân và Nhân viên kỹ thuật</p>
                        <p><b>Hệ điều hành:</b> Android</p>
                        <p><b>Ngày phát hành:</b> 00/00/0000</p>
                        <span>
                            <p className="text-base md:text-lg text-black"><b>Chức năng chung:</b></p>
                            <ul className="list-disc px-10 text-base md:text-lg leading-[2] font-semibold text-gray">
                                <li>Gửi báo cáo sự cố</li>
                                <li>Gửi tín hiệu SOS</li>
                                <li>Xem các vị trí xảy ra sự cố</li>
                            </ul>
                        </span>
                    </span>

                    <span className="flex flex-col sm:flex-row items-center gap-2.5 group [&>a]:text-white [&>a]:text-sm [&>a]:md:text-base [&>a]:font-semibold [&>a]:px-5 [&>a]:py-2.5 [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:gap-2.5 [&>a]:rounded-small w-full">
                        <Link to="/" className="bg-mainRed w-full sm:w-auto">
                            <i className="fa-solid fa-download"></i>
                            Tải ứng dụng
                        </Link>
                        <Link to="/" className="bg-mainDark w-full sm:w-auto">
                            <i className="fas fa-globe"></i>
                            Truy cập AlertMe Web (Người dân)
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DownloadPage