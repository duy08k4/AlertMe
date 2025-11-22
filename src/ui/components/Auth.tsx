import type React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import authService from "../../service/auth.serv"
import { routeConfig } from "../../configs/routeConfig"

const Auth: React.FC = () => {
    const pathLocation = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        autoAuth()
    }, [])

    const autoAuth = async () => {
        const isAuth = await authService.autosigin()

        if (isAuth) {
            if (!pathLocation.pathname.includes("main")) {
                navigate(routeConfig.admin.root)
            }
        } else {
            navigate(routeConfig.auth.root)
        }
    }
    return (
        <></>
    )
}

export default Auth