import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDriverHooks } from '../componets/hooks/driver.hook';
import { errorToast } from '../componets/toast';
import { useUserHooks } from "../componets/hooks/user.hook";
import { useSelector } from 'react-redux';

export function DriverProtection({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { driverMe } = useDriverHooks();
  const navigate = useNavigate(); 
  
  useEffect(() => {  
    async function validateDriver() {
      try {
        const driver = await driverMe();
        const documentUploaded = driver.driverData.document_uploaded;
        // console.log(documentUploaded);

        if (!documentUploaded) {
          errorToast("please upload driver documnet")
          setTimeout(() => {
            navigate('/driver/document');
          }, 1200);
          return; 
        }

        if (driver && !driver.error && documentUploaded) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    validateDriver();
  }, [driverMe, navigate]);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) return <Navigate to="/driver/login" replace />;

  return children;
}


export function UserProtection({children}){
    const { userProfile } = useUserHooks();
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