import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export function DriverProtection({ children }) {
  const token = Cookies.get("drivertoken");
  const driverid = Cookies.get("driverid")
  if(!token || !driverid){
    return <Navigate to="/driver/login" replace />;
  }

  if (token !== driverid) {
    return <Navigate to="/driver/login" replace />;
  }

  return children;
}

  