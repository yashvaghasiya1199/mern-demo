import { NavigateFunction, useNavigate } from "react-router-dom";
import { api } from "../../../libs/axios";
import { JSX, ReactNode, useEffect, useState } from "react";

interface IDriverProtectionProps {
    children: ReactNode;
}

export function DriverProtection({ children }: IDriverProtectionProps): JSX.Element | null {
    const navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        async function verifyAuth(): Promise<void> {
            try {
                const response = await api.get("/api/auth/driver/auth/verify");
                const driver = response.data.driver as { document_uploaded: boolean } | null;
                const documents = driver?.document_uploaded;
                console.log(documents);

                if (!driver) {
                    navigate("/driver/login");
                    return;
                }

                if (!documents) {
                    navigate("/driver/document");
                    return;
                }

                setIsAuthenticated(true);
            } catch (error) {
                console.warn("Auth failed:", error);
                navigate("/driver/login");
            } finally {
                setLoading(false);
            }
        }

        verifyAuth();
    }, [navigate]);

    if (loading) {
        return <div>Checking authentication...</div>;
    }

    return isAuthenticated ? children : null;
}
