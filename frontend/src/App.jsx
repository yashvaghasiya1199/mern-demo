import { useDispatch } from "react-redux"
import { routes } from "./routes"
import { useEffect } from "react"
import Cookies from 'js-cookie'
import { userlogin } from "./store/redusers/user.reduser"
import { RouterProvider } from "react-router-dom"

function App() {


  const dispatch = useDispatch()
  useEffect(() => {
    const token = Cookies.get('usertoken')
    if (token) {
      dispatch(userlogin())
    }
  }, [])
  return <>
    <RouterProvider router={routes} />
  </>
}
export default App


