// Import libraries
import type React from "react";
import { useRef } from "react";

// Famer motion
import { motion, type Variants } from "framer-motion";

// Router DOM
import { Link } from "react-router-dom";
import { routeConfig } from "../../routes/routeConfig";

// Images
import AlertMe_Text from "../../assets/AlertMe_Text.png";
import Repoter_img from "../../assets/patterns/reporter.png";
import Admin_img from "../../assets/patterns/admin.png";
import Staff_img from "../../assets/patterns/staff.png";
import Towing from "../../assets/patterns/Towing.png";

// Types
type feat = {
    name: string,
    short_des: string,
    class_icon: string, // Fontawesome
    color: string,
    rgb_color: string
}

type information = {
    target: string,
    des: string,
    btn_content: string,
    btn_icon_class: string, // Fontawesome
    img: string,
    path: string
}

// Define variants outside the component for performance and to avoid re-creation on renders.
const listContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
};

const listItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const HomePage: React.FC = () => {
    const informationOfSystem = useRef<information[]>([
        {
            target: "Người Dân",
            des: "Khi có sự cố giao thông xảy ra, người dân có thể thực hiện gửi một báo cáo sự cố đến quản trị viên hệ thống thông qua ứng dụng điện thoại.",
            img: Repoter_img,
            btn_content: "Tải ứng dụng", btn_icon_class: "fa-solid fa-download", path: routeConfig.landing.endpoint.download
        },
        {
            target: "Quản Trị Viên",
            des: `
                Khi người dân thực hiện gửi một báo cáo sự cố, hệ thống AlertMe sẽ nhận được báo cáo của người dân theo thời gian thực. 
                Quản trị viên sẽ điều phối các nhân viên kỹ thuật đến khắc phục sự cố dựa trên tọa độ được cung cấp trong báo cáo.
            `,
            img: Admin_img,
            btn_content: "Trang quản lý", btn_icon_class: "far fa-window-restore", path: routeConfig.admin.endpoint.assignment
        },
        {
            target: "Nhân Viên Kỹ Thuật",
            des: `
                Nhân viên kỹ thuật sẽ nhận sự điều phối từ quản trị viên và đến hiện trường để xử lý sự cố trực tiếp dựa trên tọa độ được cung cấp trong báo cáo.
                Sau khi sự cố đã được khắc phục, nhân viên kỹ thuật sẽ phản hồi kết quả về hệ thống.
            `,
            img: Staff_img,
            btn_content: "Tải ứng dụng", btn_icon_class: "fa-solid fa-download", path: routeConfig.landing.endpoint.download
        },
    ])

    const mainFeats = useRef<feat[]>([
        {
            name: "Gửi báo cáo thời gian thực",
            short_des: "Thực hiện gửi báo cáo sự cố với tọa độ và hình ảnh sự cố giao thông",
            class_icon: "fa-solid fa-map-pin", color: "text-[#f25255]", rgb_color: "bg-[rgba(242,82,85,0.2)]"
        },
        {
            name: "Quản lý báo cáo hiệu quả",
            short_des: "Tiếp nhận báo cáo và điều phối nhân viên khắc phục sự cố một cách nhanh chóng",
            class_icon: "fa-solid fa-gear", color: "text-[#f25255]", rgb_color: "bg-[rgba(242,82,85,0.2)]"
        },
        {
            name: "Bản đồ trực quan",
            short_des: "Hiển thị sự cố trên bản đồ với màu sắc, biểu tượng phân loại, dễ quan sát và tìm kiếm",
            class_icon: "fa-solid fa-map", color: "text-[#f25255]", rgb_color: "bg-[rgba(242,82,85,0.2)]"
        }
    ])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full w-full"
        >
            <div className="h-fit w-full flex flex-col items-center justify-center gap-5 py-28 max-md:py-16 text-center">
                <img src={AlertMe_Text} className="h-[60px] max-md:h-[40px]" />
                <h1 className="text-black font-semibold text-5xl tracking-wider max-md:text-3xl max-md:px-4">Hệ thống báo cáo sự cố giao thông</h1>
                <p className="text-gray text-csBig max-md:text-base max-md:px-4">Nền tảng giúp người dân báo cáo sự cố giao thông và theo dõi tình hình trực tiếp trên bản đồ.</p>
                <span className="flex gap-5 items-center mt-10 group [&>a]:text-csNormal [&>a]:font-semibold [&>a]:h-[50px] [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:px-10 [&>a]:rounded-main max-sm:flex-col max-sm:px-4 max-sm:w-full">
                    <Link to="/" className="bg-mainRed text-white max-sm:w-full">Xem bản đồ sự cố</Link>
                    <Link to={routeConfig.admin.root} className="mainShadow gap-2.5 bg-white max-sm:w-full">
                        <i className="far fa-window-restore"></i>
                        Quản lý hệ thống
                    </Link>
                </span>
                <span className="mt-10">
                    <img src={Towing} className="h-[300px] max-md:h-[200px]" />
                </span>
            </div>

            <div className="h-fit w-full flex flex-col gap-10 py-25 max-md:py-16 max-md:px-4">
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-black font-semibold text-4xl tracking-wider capitalize flex items-center gap-5 max-md:text-2xl max-md:justify-center max-md:flex-wrap">
                        <i className="fa-solid fa-book"></i>
                        Giới thiệu hệ thống
                    </h1>
                    <p className="w-[80%] text-csBig text-gray max-lg:w-full max-md:text-csSmall text-justify">
                        AlertMe là một hệ thống báo cáo sự cố giao thông theo thời gian thực. Hệ thống được phát triển để tiếp nhận các báo cáo sự cố liên quan đến giao thông với tọa độ và hình ảnh cụ thể.
                        Quản trị viên sẽ điều phối các nhân viên kỹ thuật đến để khắc phục sự cố và phản hồi kết quả về cho quản trị viên.
                    </p>
                </div>
                <motion.div
                    variants={listContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-10"
                >
                    {informationOfSystem.current.map((info, index) => (
                        <motion.div key={index} variants={listItemVariants} className={`w-[55%] flex items-center gap-2.5 max-xl:w-[100%] max-lg:flex-col max-lg:gap-8 ${index % 2 === 1 && "flex-row-reverse"}`}>
                            <span className="flex-1/3 max-lg:w-full">
                                <img src={info.img} className="w-full rounded-main" />
                            </span>
                            <span className=" flex-2/3 flex flex-col gap-2.5 mainShadow h-fit px-10 py-5 rounded-main max-lg:w-full max-lg:px-6">
                                <h3 className="text-black font-semibold text-csLarge max-md:text-2xl">{info.target}</h3>
                                <p className="text-gray text-justify max-lg:text-base max-sm:text-csSmall">{info.des}</p>
                                <Link to={info.path} className="bg-mainRed text-white text-csNormal font-semibold h-[50px] max-md:h-[40px] flex gap-2.5 items-center justify-center px-10 rounded-main max-md:rounded-small mt-5 max-lg:self-center">
                                    <i className={info.btn_icon_class}></i>
                                    {info.btn_content}
                                </Link>
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="h-fit w-full flex flex-col gap-10 py-25 max-md:py-16 max-md:px-4">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="text-black font-semibold text-4xl tracking-wider capitalize flex items-center gap-5 max-md:text-2xl max-md:justify-center">
                        <i className="fa-solid fa-boxes-stacked"></i>
                        Tính năng nổi bật
                    </h1>
                    <p className="text-csNormal text-gray font-semibold text-center max-md:text-csSmall">Giúp cho việc báo cáo và xử lý sự cố giao thông trở nên dễ dàng hơn</p>
                </div>
                <motion.div
                    variants={listContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-10 max-md:gap-8"
                >
                    {mainFeats.current.map((feat, index) => (
                        <motion.span key={index} variants={listItemVariants} className="mainShadow w-[30%] flex-grow flex flex-col gap-1 px-5 py-5 max-lg:w-[45%] max-sm:w-full rounded-lg">
                            <span className="flex items-center gap-2.5">
                                <span className={`h-[40px] max-md:h-[32px] aspect-square flex items-center justify-center ${feat.rgb_color} rounded-full flex-shrink-0`}>
                                    <i className={`${feat.class_icon} ${feat.color}`}></i>
                                </span>
                                <p className="text-black font-semibold text-csBig max-md:text-base">{feat.name}</p>
                            </span>
                            <span className="px-5">
                                <p className="text-gray font-semibold max-md:text-sm">{feat.short_des}</p>
                            </span>
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default HomePage;