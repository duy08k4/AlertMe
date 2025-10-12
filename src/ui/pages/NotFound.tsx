// Import libraries
import type React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { routeConfig } from "../../configs/routeConfig";

// Main component
const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-6">
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                className="text-9xl font-extrabold text-mainRed tracking-wider"
            >
                404
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4"
            >
                <h2 className="text-4xl font-bold text-gray-800">Oops! Trang không tồn tại</h2>
                <p className="mt-3 text-lg text-gray-600">
                    Rất tiếc, chúng tôi không thể tìm thấy trang bạn yêu cầu.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10"
            >
                <Link
                    to={routeConfig.landing.root}
                    className="px-8 py-4 bg-mainRed text-white font-bold rounded-lg shadow-lg hover:bg-red-700 hover:-translate-y-1 transition-all duration-300"
                >
                    Quay về Trang Chủ
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
