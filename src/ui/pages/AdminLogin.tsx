// Import libraries
import type React from "react";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ScreenSizeWarningPopup } from "../../hooks/Popup";

// Router DOM
import { Link, useNavigate } from "react-router-dom";
import { routeConfig } from "../../configs/routeConfig";

// Services
import { authService } from "../../services/authService";

// Images
import Patern1 from "../../assets/patterns/Pattern1.png"
import AlertMe from "../../assets/AlertMe.png"

// Main component
const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const data = await authService.login(email, password);
            
            // Store tokens
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("refreshToken", data.refresh_token);
            
            // Redirect to admin dashboard
            navigate(routeConfig.admin.root);
        } catch (err: any) {
            console.error("Login failed:", err);
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative h-full w-full bg-white p-4 sm:p-6 lg:p-8 overflow-hidden">
            <ScreenSizeWarningPopup />
            <motion.img
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={Patern1} className="absolute top-0 right-0 h-full"
            />
            <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute z-30 top-twoSidePadding left-twoSidePadding">
                <Link to={routeConfig.landing.root} className="btn mainShadow text-black text-csNormal flex items-center gap-2.5 px-7.5 py-2.5 rounded-main">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>

                    Quay lại
                </Link>
            </motion.span>

            <div className="absolute z-10 top-0 left-0 h-full w-full flex items-center justify-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mainShadow w-full max-w-md p-8 space-y-8 bg-white rounded-2xl">
                    <motion.div variants={itemVariants} className="flex flex-col items-center">
                        <img src={AlertMe} className="mt-6 h-[60px]" />
                        <h2 className="text-4xl font-extrabold text-gray-900">Admin</h2>
                        <p className="mt-2 text-center text-lg text-gray-600">Vui lòng đăng nhập để tiếp tục.</p>
                    </motion.div>

                    <motion.form variants={containerVariants} className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                                {error}
                            </div>
                        )}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mainRed focus:border-mainRed sm:text-base transition duration-200 ease-in-out"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mainRed focus:border-mainRed sm:text-base transition duration-200 ease-in-out"
                                />
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn w-full flex items-center gap-2.5 justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-mainRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainRed transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                )}
                                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                            </button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>

            <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className=" absolute bottom-5 left-twoSidePadding flex justify-center py-5">
                <p className="font-semibold text-mainDark text-csNormal text-center">© 2025 Nhóm 6. Làm bằng ♥ cho môn Đồ Án GIS.</p>
            </motion.span>
        </div>
    );
};

export default AdminLogin;