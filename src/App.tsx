// Import libraries
import { lazy } from "react"

// Router DOM
import { Routes, Route } from "react-router-dom"
import { routeConfig } from "./configs/routeConfig"
import { ToastContainer } from "react-toastify"

// Components
const LandingLayout = lazy(() => import("./ui/layouts/LandingLayout"))
const AdminLayout = lazy(() => import("./ui/layouts/AdminLayout"))
const AdminLogin = lazy(() => import("./ui/pages/AdminLogin"))
const NotFound = lazy(() => import("./ui/pages/NotFound"))
const ReportViewLayout = lazy(() => import("./ui/layouts/ReportViewLayout"))

// Main component
function App() {
  return (
    <div className="relative h-full w-full bg-white">
      <Routes>
        <Route path={routeConfig.landing.root + "*"} element={<LandingLayout />} />
        <Route path={routeConfig.admin.root + "/*"} element={<AdminLayout />} />
        <Route path={routeConfig.auth.root} element={<AdminLogin />} />
        <Route path={routeConfig.reportview.root} element={<ReportViewLayout />} />
        <Route path={routeConfig.auth.endpoint.not_found} element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App