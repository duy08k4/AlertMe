// Import libraries
import type React from "react"
import { lazy, useRef, useState, useEffect } from "react"
import { ScreenSizeWarningPopup } from "../../hooks/Popup"

// Router DOM
import { Link, Route, Routes, useLocation } from "react-router-dom"
import { routeConfig } from "../../configs/routeConfig"

// Images
import AlertMe from "../../assets/AlertMe.png"
import Auth from "../components/Auth"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import GetData from "../components/GetData"
import SocketSubcriber from "../components/SocketSubcriber"

// Pages
const AssignmentPage = lazy(() => import("../pages/AssignmentPage"))
// const AnalystPage = lazy(() => import("../pages/AnalystPage"))
const UserManagement = lazy(() => import("../pages/UserManagement"))
const StaffManagement = lazy(() => import("../pages/StaffManagement"))
const NotFound = lazy(() => import("../pages/NotFound"))

// Types
type navigationType = {
    name: string,
    path: string,
    icon_d: string
}

// Main component
const AdminLayout: React.FC = () => {
    // Admin
    const adminData = useSelector((state: RootState) => state.admin.profile)

    // Location path
    const location = useLocation()
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false)

    const userDropdownItems = [
        { name: "Thông tin cá nhân", func: () => { console.log("View Profile") } },
        { name: "Đăng xuất", func: () => { console.log("Logout user") } },
    ];

    // Nav
    const navigation = useRef<navigationType[]>([
        { name: "Điều phối", path: routeConfig.admin.root, icon_d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" },
        // { name: "Thống kê", path: routeConfig.admin.endpoint.analyst, icon_d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" },
        { name: "Quản lý người dùng", path: routeConfig.admin.endpoint.user_management, icon_d: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" },
        { name: "Quản lý nhân viên", path: routeConfig.admin.endpoint.staff_management, icon_d: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" }
    ])

    const userDropdownRef = useRef<HTMLSpanElement>(null);
    const userDropdownContentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target as Node) &&
                userDropdownContentRef.current &&
                !userDropdownContentRef.current.contains(event.target as Node)
            ) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserDropdownOpen]);

    return (
        <div className="h-full w-full bg-white flex flex-col">
            <SocketSubcriber />
            <Auth />
            <GetData />
            <ScreenSizeWarningPopup />
            <div className="flex items-center justify-between gap-20 px-mainTwoSidePadding py-3 border-b border-b-lightGray">
                <span className="flex items-center gap-20">
                    <span className="flex items-center gap-2">
                        <img src={AlertMe} className="h-[40px]" />
                        <h1 className="text-black text-csBig uppercase font-semibold">Admin</h1>
                    </span>

                    <span className="flex gap-10">
                        {navigation.current.map((nav, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={nav.path}
                                    className={`btn rounded-small text-black text-csSmall font-semibold flex items-center gap-2.5 px-5 py-1.5 hover:bg-light-background ${location.pathname === nav.path && "!text-mainRed bg-[rgba(242,82,85,0.2)]"}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={nav.icon_d} />
                                    </svg>

                                    {nav.name}
                                </Link>
                            )
                        })}
                    </span>
                </span>

                <span className="relative" ref={userDropdownRef}>
                    <span className="mainShadow h-fit w-fit flex items-center gap-2.5 px-2.5 py-1 rounded-small border-[0.5px] border-lightGray cursor-pointer" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                        <p>{adminData.email}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </span>

                    {isUserDropdownOpen && (
                        <span className="mainShadow absolute z-[600] top-full right-0 mt-2 flex flex-col w-max bg-white rounded-md overflow-hidden" ref={userDropdownContentRef}>
                            {userDropdownItems.map((item, index) => (
                                <p key={index} className="cursor-pointer select-none text-sm h-fit w-full whitespace-nowrap text-mainDark font-semibold hover:bg-gray-100 p-2.5" onClick={() => {
                                    item.func();
                                    setIsUserDropdownOpen(false);
                                }}>{item.name}</p>
                            ))}
                        </span>
                    )}
                </span>
            </div>

            <div className="flex-1 h-0">
                <Routes>
                    <Route index element={<AssignmentPage />} />
                    {/* <Route path="analyst" element={<AnalystPage />} /> */}
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="staff-management" element={<StaffManagement />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminLayout
