import { createContext, useContext, useEffect } from "react";
import  Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { userlogin } from "../store/redusers/user.reduser";
import { driverLogins } from "../store/redusers/driver.reduser";

const CookieContext = createContext()

export function Cookieprovider({children}){

  let token,driverToken;
    const dispatch = useDispatch()
    useEffect(() => {
       token = Cookies.get('usertoken')
      driverToken = Cookies.get('drivertoken')
      if (token) {
        dispatch(userlogin())
      }
      if(driverToken){
        dispatch(driverLogins())
      }
    }, [])
    return(
        <CookieContext.Provider value={{token,driverToken}} >
            {children}
        </CookieContext.Provider>
    )
}

export function CookieAuth(){
 return useContext(CookieContext)
}