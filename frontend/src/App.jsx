import { routes } from "./routes"
import Cookies from 'js-cookie'
import { RouterProvider } from "react-router-dom"
import { Cookieprovider } from "./context/cokiecontext";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userlogin } from "./store/redusers/user.reduser";
import { driverLogins } from "./store/redusers/driver.reduser";

function App() {

  const dispatch = useDispatch()
    useEffect(() => {
      const token = Cookies.get('usertoken')
      const driverToken = Cookies.get('drivertoken')
      if (token) {
        dispatch(userlogin())
      }
      if(driverToken){
        dispatch(driverLogins())
      }
    }, [])

  return <>
    <Cookieprovider>
      <RouterProvider router={routes} />
    </Cookieprovider>
  </>
}
export default App


