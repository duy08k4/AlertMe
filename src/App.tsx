// Import libraries
import { lazy } from "react"

// Router DOM
import { Routes, Route } from "react-router-dom"
import { routeConfig } from "./configs/routeConfig"

// Components
const LandingLayout = lazy(() => import("./ui/layouts/LandingLayout"))
const AdminLayout = lazy(() => import("./ui/layouts/AdminLayout"))
const AdminLogin = lazy(() => import("./ui/pages/AdminLogin"))
const NotFound = lazy(() => import("./ui/pages/NotFound"))

// Main component
function App() {
  return (
    <div className="h-full w-full bg-white">
      <Routes>
        <Route path={routeConfig.landing.root + "*"} element={<LandingLayout />} />
        <Route path={routeConfig.admin.root + "/*"} element={<AdminLayout />} />
        <Route path={routeConfig.auth.root} element={<AdminLogin />} />
        <Route path={routeConfig.auth.endpoint.not_found} element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App