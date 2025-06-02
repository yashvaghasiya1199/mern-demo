import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DriverHooks } from '../../componets/hooks/driver.hook';
import { errorToast } from '../../componets/toast';

export function DriverProtection({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { driverMe } = DriverHooks();
  const navigate = useNavigate(); 

  useEffect(() => {
    async function validateDriver() {
      try {
        const driver = await driverMe();
        const documentUploaded = driver.driverData.document_uploaded;
        console.log(documentUploaded);

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


