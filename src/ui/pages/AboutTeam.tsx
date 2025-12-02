import type React from "react";
import { motion, type Variants } from "framer-motion";

import AhTun from "../../assets/avt/AnhTuan.jpg"
import TngDy from "../../assets/avt/TuongDuy.jpg"
import PuTog from "../../assets/avt/PhuTrong.jpg"

import QhNhu from "../../assets/avt/QhNhu.png"
import TyAn from "../../assets/avt/TyAn.jpg"
import TrongLien from "../../assets/avt/TrongLien.jpg"
import TramDuong from "../../assets/avt/TramDuong.jpg"
import HuuLy from "../../assets/avt/HuuLy.jpg"

interface Member {
    name: string;
    studentId: string;
    className: string;
    major: string;
    imageUrl: string;
    role: string;
}

const leadershipTeam: Member[] = [
    {
        name: "Nguyễn Anh Tuấn",
        studentId: "22166097",
        className: "DH22HM",
        major: "Hệ thống thông tin",
        imageUrl: AhTun,
        role: "Quản lý dự án",
    },
    {
        name: "Trần Bá Tường Duy",
        studentId: "22166013",
        className: "DH22HM",
        major: "Hệ thống thông tin",
        imageUrl: TngDy,
        role: "Trưởng nhóm Frontend",
    },
    {
        name: "Đỗ Phú Trọng",
        studentId: "22166090",
        className: "DH22HM",
        major: "Hệ thống thông tin",
        imageUrl: PuTog,
        role: "Trưởng nhóm Backend",
    },
];

const memberTeam: Member[] = [
    {
        name: "Lê Quỳnh Như",
        studentId: "22166067",
        className: "DH22HM",
        major: "Hệ thống thông tin",
        imageUrl: QhNhu,
        role: "Thiết kế giao diện",
    },
    {
        name: "Võ Thị Thúy An",
        studentId: "22166001",
        className: "DH22HM",
        major: "Hệ thống thông tin",
        imageUrl: TyAn,
        role: "Thiết kế giao diện",
    },
    {
        name: "Đỗ Trọng Liên",
        studentId: "22166042",
        className: "DH22HM",
        major: "Hệ thống thông tin",
        imageUrl: TrongLien,
        role: "Phát triển hệ thống",
    },
    {
        name: "Dương Bảo Trâm",
        studentId: "21166168",
        className: "DH21HM",
        major: "Hệ thống thông tin",
        imageUrl: TramDuong,
        role: "Thiết kế giao diện",
    },
    {
        name: "Phan Hữu Lý",
        studentId: "21166142",
        className: "DH21HM",
        major: "Hệ thống thông tin",
        imageUrl: HuuLy,
        role: "Phát triển hệ thống",
    },
];

// Define variants outside the component
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
};

// MemberCard is now a simple presentational component
const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
    return (
        <div className="mainShadow bg-white rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border-[0.5px] border-lightGray ease-in-out">
            <img src={member.imageUrl} alt={`Hình ảnh của ${member.name}`} className="w-full h-56 object-contain object-center"/>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-lg font-semibold text-indigo-600 mb-3">{member.role}</p>
                <p className="text-base text-gray-600"><span className="font-semibold">MSSV:</span> {member.studentId}</p>
                <p className="text-base text-gray-600"><span className="font-semibold">Lớp:</span> {member.className}</p>
                <p className="text-base text-gray-600"><span className="font-semibold">Chuyên ngành:</span> {member.major}</p>
            </div>
        </div>
    );
};

const AboutTeam: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-8xl ">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-4"
                >
                    Thành Viên Nhóm AlertMe
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg text-center text-gray-500 mb-12"
                >
                    Những con người tạo nên sự khác biệt.
                </motion.p>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Quản Lý Nhóm</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
                    >
                        {leadershipTeam.map((member) => (
                            <div key={member.studentId}>
                                <MemberCard member={member} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Các Thành Viên</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-4"
                    >
                        {memberTeam.map((member) => (
                            <div key={member.studentId}>
                                <MemberCard member={member} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutTeam;