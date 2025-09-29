// Import libraries
import { lazy } from "react"

// Router DOM
import { Routes, Route } from "react-router-dom"

// Components
const LandingLayout = lazy(() => import("./ui/layouts/LandingLayout"))

// Main component
function App() {
  return (
    <div className="h-full w-full bg-white">
      <Routes>
        <Route path="/*" element={<LandingLayout />} />
        <Route path="/main" />
      </Routes>
    </div>
  )
}

export default App