// Import libraries
import { lazy, useRef } from "react"

// Router DOM
import { Routes, Route, Link, useLocation } from "react-router-dom"

// Images
import AlertMe_Logo from "./assets/AlertMe.png"
import Pattern1 from "./assets/patterns/Pattern1.png"

// Pages
const HomePage = lazy(() => import("./ui/pages/HomePage"))

// Types
type Navigation = {
  path: string,
  name: string
}

// Main component
function App() {
  // Navigation
  const pageLocation = useLocation()

  const Navigation = useRef<Navigation[]>([
    { path: "/", name: "Trang chủ" },
    { path: "/download", name: "Tải xuống" },
    { path: "/team", name: "Đội ngũ phát triển" },
    { path: "/contact", name: "Liên hệ" }
  ])

  return (
    <div className="relative w-full bg-white flex flex-col px-twoSidePadding max-md:px-4">
      <div className="sticky top-0 bg-white flex items-center gap-16 flex-nowrap max-lg:flex-wrap max-lg:justify-center max-lg:gap-x-2 max-lg:gap-y-3 py-2.5 group [&>a]:text-csNormal [&>a]:max-lg:text-base [&>a]:max-md:text-[12px] [&>a]:font-semibold [&>a]:text-mainDark [&>a]:hover:text-mainRed [&>a]:p-1.5">
        <Link to="/">
          <img src={AlertMe_Logo} alt="AlertMe" className="h-[50px] max-md:h-[30px]" />
        </Link>

        {Navigation.current.map((nav, index) => {
          return (
            <Link key={index} to={nav.path} className={`${nav.path === pageLocation.pathname ? "!text-mainRed" : ""}`}>{nav.name}</Link>
          )
        })}
      </div>

      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App