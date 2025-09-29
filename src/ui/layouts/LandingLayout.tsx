// Import libraries
import { lazy, useRef } from "react"

// Router DOM
import { Routes, Route, Link, useLocation } from "react-router-dom"

// Images
import AlertMe_Logo from "../../assets/AlertMe.png"

// Pages
const HomePage = lazy(() => import("../pages/HomePage"))
const DownloadPage = lazy(() => import("../pages/DownloadPage"))
const AboutTeam = lazy(() => import("../pages/AboutTeam"))

// Types
type Navigation = {
    path: string,
    name: string
}

const LandingLayout = () => {
    // Navigation
    const pageLocation = useLocation()

    const Navigation = useRef<Navigation[]>([
        { path: "/", name: "Trang chủ" },
        { path: "/download", name: "Tải xuống" },
        { path: "/team", name: "Đội ngũ phát triển" },
        { path: "/contact", name: "Liên hệ" }
    ])
    return (
        <div className="relative min-h-screen w-full flex flex-col px-twoSidePadding max-md:px-4">
            <div className="sticky top-0 bg-white z-50 flex items-center gap-16 flex-nowrap max-lg:flex-wrap max-lg:justify-center max-lg:gap-x-2 max-lg:gap-y-3 py-2.5 group [&>a]:text-csNormal [&>a]:max-lg:text-base [&>a]:max-md:text-[12px] [&>a]:font-semibold [&>a]:text-mainDark [&>a]:hover:text-mainRed [&>a]:p-1.5">
                <Link to="/">
                    <img src={AlertMe_Logo} alt="AlertMe" className="h-[50px] max-md:h-[30px]" />
                </Link>

                {Navigation.current.map((nav, index) => {
                    return (
                        <Link key={index} to={nav.path} className={`${nav.path === pageLocation.pathname ? "!text-mainRed" : ""}`}>{nav.name}</Link>
                    )
                })}
            </div>

            <div className="flex-1 grow w-full py-2.5">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/download" element={<DownloadPage />} />
                    <Route path="/team" element={<AboutTeam />} />
                </Routes>
            </div>

            <div className="flex justify-center border-t border-lightGray py-5">
                <p className="font-semibold text-mainDark text-csNormal text-center max-md:px-4 max-md:text-csSmall">© 2025 Nhóm 6. Làm bằng ♥ cho môn Đồ Án GIS.</p>
            </div>
        </div>
    )
}

export default LandingLayout