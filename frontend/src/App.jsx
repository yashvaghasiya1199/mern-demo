import { useDispatch } from "react-redux"
import { routes } from "./routes"
import { useEffect } from "react"
import Cookies from 'js-cookie'
import { userlogin } from "./store/redusers/user.reduser"
import { RouterProvider } from "react-router-dom"
import { driverLogins } from "./store/redusers/driver.reduser"

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
    <RouterProvider router={routes} />
  </>
}
export default App


