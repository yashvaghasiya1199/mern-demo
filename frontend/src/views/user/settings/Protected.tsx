import { useNavigate } from "react-router-dom"
import { api } from "../../../libs/axios" 
import { useEffect, useState } from "react"

export function UserProtection({ children }) {
    const navigate = useNavigate()
    const [authChecked, setAuthChecked] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        async function verifyAuth() {
            try {
                const response = await api.get("/api/auth/user/auth/verify") 
                if (response.data?.user) {
                    setIsAuthenticated(true)
                } else {
                    navigate("/user/login")
                }
            } catch (error) {
                console.warn("Auth failed:", error)
                navigate("/user/login")
            } finally {
                setAuthChecked(true)
            }
        }

        verifyAuth()
    }, [navigate])

    if (!authChecked) {
        return <div>Checking authentication...</div>    
    }

    return isAuthenticated ? children : null
}