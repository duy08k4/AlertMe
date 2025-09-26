// Import libraries
import { lazy, useRef } from "react"

// Router DOM
import { Routes, Route, Link, useLocation } from "react-router-dom"

// Images
import AlertMe_Logo from "./assets/AlertMe.png"
import Pattern1 from "./assets/patterns/Pattern1.png"

// Pages
const HomePage = lazy(() => import("./ui/pages/homePage"))

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
    { path: "/about", name: "Về hệ thống" },
    { path: "/team", name: "Đội ngũ phát triển" },
    { path: "/contact", name: "Liên hệ" }
  ])

  return (
    <div className="relative h-full w-full bg-light-background">
      <img src={Pattern1} className="absolute z-0 top-0 right-0 h-full" />
      {/* Main */}

      <div className="absolute z-50 top-0 left-0 h-full w-full bg-transparent flex flex-col px-twoSidePadding">
        {/* Nav */}
        <div className="flex items-center gap-20 py-2.5 group [&>a]:text-csNormal [&>a]:font-semibold [&>a]:text-mainDark [&>a]:hover:text-mainRed [&>a]:p-1.5">
          <Link to="/">
            <img src={AlertMe_Logo} alt="AlertMe" className="h-[60px]" />
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
    </div>
  )
}

export default App
