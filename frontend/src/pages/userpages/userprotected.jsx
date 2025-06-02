import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserHooks } from "../../componets/hooks/user.hook";

export function UserProtection({ children }) {
  const { userProfile } = UserHooks();
  const [loading, setLoading] = useState(true);       // start with loading = true
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function fetchUserInfo() {
    try {
      const response = await userProfile();
      if (response && !response.error) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/user/login" replace />;

  return children;
}
