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
import Patern1 from "../../assets/patterns/Pattern1.png";
import AlertMe from "../../assets/AlertMe.png";

// Main component
const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Controlled inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không đúng định dạng.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
      isValid = false;
    }

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.login(email, password);

      // Redirect to admin dashboard
      navigate(routeConfig.admin.root);
    } catch (err) {
      console.error("Login failed:", err);
      // Error is handled by authService with toast notification
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
        src={Patern1}
        className="absolute top-0 right-0 h-full"
      />
      <motion.span
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute z-30 top-twoSidePadding left-twoSidePadding"
      >
        <Link
          to={routeConfig.landing.root}
          className="btn mainShadow text-black text-csNormal flex items-center gap-2.5 px-7.5 py-2.5 rounded-main"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          Quay lại
        </Link>
      </motion.span>

      <div className="absolute z-10 top-0 left-0 h-full w-full flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mainShadow w-full max-w-md p-8 space-y-8 bg-white rounded-2xl"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <img src={AlertMe} className="mt-6 h-[60px]" />
            <h2 className="text-4xl font-extrabold text-gray-900">Admin</h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              Vui lòng đăng nhập để tiếp tục.
            </p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email)
                      setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  className={`appearance-none block w-full px-4 py-3 border ${fieldErrors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-mainRed focus:border-mainRed"} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-base transition duration-200 ease-in-out`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password)
                      setFieldErrors({ ...fieldErrors, password: undefined });
                  }}
                  className={`appearance-none block w-full px-4 py-3 border ${fieldErrors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-mainRed focus:border-mainRed"} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-base transition duration-200 ease-in-out pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className="btn w-full flex items-center gap-2.5 justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-mainRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainRed transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
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
        className=" absolute bottom-5 left-twoSidePadding flex justify-center py-5"
      >
        <p className="font-semibold text-mainDark text-csNormal text-center">
          © 2025 Nhóm 6. Làm bằng ♥ cho môn Đồ Án GIS.
        </p>
      </motion.span>
    </div>
  );
};

export default AdminLogin;
