// Import libraries
import { lazy } from "react"

// Router DOM
import { Routes, Route } from "react-router-dom"
import { routeConfig } from "./routes/routeConfig"

// Components
const LandingLayout = lazy(() => import("./ui/layouts/LandingLayout"))
const AdminLayout = lazy(() => import("./ui/layouts/AdminLayout"))
const AdminLogin = lazy(() => import("./ui/pages/AdminLogin"))

// Main component
function App() {
  return (
    <div className="h-full w-full bg-white">
      <Routes>
        <Route path={routeConfig.landing.root + "*"} element={<LandingLayout />} />
        <Route path={routeConfig.admin.root + "*"} element={<AdminLayout />} />
        <Route path={routeConfig.auth.root} element={<AdminLogin />} />
      </Routes>
    </div>
  )
}

export default App