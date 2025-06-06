import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAuthHook } from '../hooks/auth';

const DriverAuthContext = createContext({
  loading: true,
  authenticated: false,
});

export function DriverAuthProvider({ children }) {
  const { driverMe } = useAuthHook();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  console.log(">>>>>>>>>>>>>>>")
  useEffect(() => {
    let mounted = true;

    async function validateDriver() {
      try {
        const driver = await driverMe();
        const documentUploaded = driver?.driverData?.document_uploaded;

        if (mounted) {
          console.log("driver && !driver.error && documentUploaded", driver && !driver.error && documentUploaded)
          if (driver && !driver.error && documentUploaded) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        }
      } catch (error) {
        if (mounted) {
          console.error("Error validating driver:", error);
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    validateDriver();

    return () => {
      mounted = false; // Prevent setState on unmounted component
    };
  }, [driverMe]);

  const value = useMemo(() => ({
    loading,
    authenticated,
  }), [loading, authenticated]);

  return (
    <DriverAuthContext.Provider value={value}>
      {children}
    </DriverAuthContext.Provider>
  );
}

export function useDriverAuth() {
  return useContext(DriverAuthContext);
}
