import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { errorToast } from '../componets/toast';
import { useDriverHooks } from '../hooks/driver.hook';
import { useUserHooks } from '../hooks/user.hook';
import { useAuthHook } from '../hooks/auth';


export function DriverProtection({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { driverMe } = useAuthHook();
  const navigate = useNavigate();

  useEffect(() => {
    async function validateDriver() {
      try {
        const driver = await driverMe();
        const documentUploaded = driver?.driverData?.document_uploaded;

        // if (!documentUploaded) {
        //   errorToast("Please upload driver document");
        //   navigate('/driver/document');
        //   return;
        // }

        if (driver && !driver.error && documentUploaded) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error validating driver:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    validateDriver();
  }, [driverMe, navigate]);

  if (loading) return <div>Loading ...</div>;

  if (!authenticated) return <Navigate to="/driver/login" replace />;

  return children;
}




export function UserProtection({ children }) {
  const { userProfile } = useUserHooks();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
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

    fetchUserInfo();
  }, [userProfile]);  

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/user/login" replace />;

  return children; 
}
