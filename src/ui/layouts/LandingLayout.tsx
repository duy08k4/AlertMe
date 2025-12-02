// Import libraries
import { lazy, useRef, Suspense } from "react"
import { AnimatePresence } from "framer-motion"

// Router DOM
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom"
import { routeConfig } from "../../configs/routeConfig"

// Images
import AlertMe_Logo from "../../assets/AlertMe.png"

// Pages
const HomePage = lazy(() => import("../pages/HomePage"))
const DownloadPage = lazy(() => import("../pages/DownloadPage"))
const AboutTeam = lazy(() => import("../pages/AboutTeam"))
const ContactPage = lazy(() => import("../pages/ContactPage"))

// Types
type Navigation = {
    path: string,
    name: string
}

const LoadingIndicator = () => (
    <div className="w-full h-full flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">Đang tải trang...</p>
    </div>
);

const LandingLayout = () => {
    // Navigation
    const pageLocation = useLocation()

    const Navigation = useRef<Navigation[]>([
        { path: routeConfig.landing.root, name: "Trang chủ" },
        { path: routeConfig.landing.endpoint.download, name: "Tải xuống" },
        { path: routeConfig.landing.endpoint.team, name: "Đội ngũ phát triển" },
        // { path: routeConfig.landing.endpoint.contact, name: "Liên hệ" }
    ])
    return (
        <div className="relative min-h-screen w-full flex flex-col px-twoSidePadding max-md:px-2.5">
            <div className="sticky top-0 bg-white z-50 flex items-center gap-16 flex-nowrap max-lg:flex-wrap max-lg:justify-center max-lg:gap-x-2 max-lg:gap-y-3 py-2.5 group [&>a]:text-csNormal [&>a]:max-lg:text-base [&>a]:max-md:text-[12px] [&>a]:font-semibold [&>a]:text-mainDark [&>a]:hover:text-mainRed [&>a]:p-1.5 max-md:[&>a]:py-0">
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
                <Suspense fallback={<LoadingIndicator />}>
                    <AnimatePresence mode="wait">
                        <Routes location={pageLocation} key={pageLocation.pathname}>
                            <Route index element={<HomePage />} />
                            <Route path="download" element={<DownloadPage />} />
                            <Route path="team" element={<AboutTeam />} />
                            <Route path="contact" element={<ContactPage />} />
                            <Route path="*" element={<Navigate to={routeConfig.auth.endpoint.not_found} />} />
                        </Routes>
                    </AnimatePresence>
                </Suspense>
            </div>

            <div className="flex justify-center border-t border-lightGray py-5">
                <p className="font-semibold text-mainDark text-csNormal text-center max-md:px-4 max-md:text-csSmall">© 2025 Nhóm 6. Làm bằng ♥ cho môn Đồ Án GIS. Trường Đại Học Nông Lâm Thành Phố Hồ Chí Minh</p>
            </div>
        </div>
    )
}

export default LandingLayout