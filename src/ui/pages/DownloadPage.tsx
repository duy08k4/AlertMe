import type React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AlertMe_Text from "../../assets/AlertMe_Text.png";
import AlertMe_Mobile_Mockup from "../../assets/patterns/AlertMe_Mobile_Mockup.png";

const DownloadPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full w-full flex flex-col"
        >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 p-6 md:p-12 lg:px-36 lg:pt-20">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center"
                >
                    <img src={AlertMe_Mobile_Mockup} className="h-[400px] md:h-[500px] lg:h-[600px]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    <span className="flex flex-col items-center gap-3 md:flex-row md:items-end md:gap-5">
                        <img src={AlertMe_Text} className="h-[40px] md:h-[60px]" />
                        <p className="text-gray text-lg md:text-xl font-semibold">v1.0.0</p>
                    </span>

                    <p className="w-fit flex gap-2 bg-mainRedRGB text-mainRed font-medium px-3.5 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 stroke-mainRed">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>

                        Sản phẩm này chỉ phục vụ cho môn học
                    </p>

                    <p className="text-base md:text-lg text-gray text-justify">
                        AlertMe là ứng dụng di động cho phép người dân dễ dàng báo cáo các sự cố giao thông trực tiếp đến đơn vị xử lý. Với giao diện thân thiện, bạn có thể gửi báo cáo kèm hình ảnh, vị trí chính xác và theo dõi tiến độ xử lý. Ngoài ra, tính năng SOS khẩn cấp giúp bạn gửi tín hiệu cầu cứu nhanh chóng khi gặp nguy hiểm. Hãy cùng AlertMe chung tay xây dựng một thành phố thông minh, an toàn và hiện đại hơn.
                    </p>

                    <span className="flex flex-col gap-2.5 text-base md:text-lg text-black">
                        <p><b>Đối tượng phục vụ:</b> Người dân và Nhân viên kỹ thuật</p>
                        <p><b>Hệ điều hành:</b> Android</p>
                        <p><b>Ngày phát hành:</b> 05/12/2025</p>
                        <span>
                            <p className="text-base md:text-lg text-black"><b>Chức năng chung:</b></p>
                            <ul className="list-disc px-10 text-base md:text-lg leading-[2] font-semibold text-gray">
                                <li>Gửi báo cáo sự cố</li>
                                <li>Gửi tín hiệu SOS</li>
                                <li>Xem các báo sự cố</li>
                            </ul>
                        </span>
                    </span>

                    <span className="flex flex-col sm:flex-row items-center gap-2.5 group [&>a]:text-white [&>a]:text-sm [&>a]:md:text-base [&>a]:font-semibold [&>a]:px-5 [&>a]:py-2.5 [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:gap-2.5 [&>a]:rounded-small w-full">
                        <Link to="/" className="bg-mainRed w-full sm:w-auto">
                            <i className="fa-solid fa-download"></i>
                            Tải ứng dụng
                        </Link>
                        <Link to="https://alert-me-mobile.vercel.app" className="bg-mainDark w-full sm:w-auto">
                            <i className="fas fa-globe"></i>
                            Truy cập AlertMe Web (Người dân)
                        </Link>
                    </span>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default DownloadPage;