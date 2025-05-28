import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./componets/applayout"
import { Login } from "./pages/userpages/userlogin"
import { Signup } from "./pages/userpages/usersignup"
import { Home } from "./pages/home"
import { ForgotPassword } from "./pages/userpages/forgotpassword"

import { DriverForgotPassword } from "./pages/driverpages/driverforgotpassword"
import { DriverResetPassword } from "./pages/driverpages/driverresetpassword"
import { DriverAdmin } from "./pages/driverpages/driveradminpage"
import { DriverLocation } from "./pages/driverpages/driverlocation"
import { Reviews } from "./pages/driverpages/driverreviews"
import { DriverVehicle } from "./pages/driverpages/drivervehicle"
import { DriverLogin } from "./pages/driverpages/driverlogin"
import { DriverSignup } from "./pages/driverpages/driversignup"
import { DriverDocuments } from "./pages/driverpages/driverdocument"
import { ResetPassword } from "./pages/userpages/resetpassword"
import { DriverProtection } from "./pages/driverpages/driverprotected"
import { useEffect } from "react"
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux"
import { userlogin } from "./redux/slices/user.slice"
import { BookRide } from "./pages/userpages/bookride"

function App() {

  const routes = createBrowserRouter([
    {

      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/user/signup',
          element: <Signup />
        },
        {
          path: '/user/login',
          element: <Login />
        },
        {
          path: '/user/forgot-password',
          element: <ForgotPassword />
        },
        {
          path: '/user/reset-password',
          element: <ResetPassword />
        },
        {
          path:"/bookride",
          element:<BookRide/>
        },
        {
          path: '/driver/signup',
          element: <DriverSignup />
        },
        {
          path: '/driver/login',
          element: <DriverLogin />
        },
        {
          path: '/driver/forgot-password',
          element: <DriverForgotPassword />
        },
        {
          path: '/driver/reset-password',
          element: <DriverResetPassword />
        },
        {
          path: '/driver/document',
          element: <DriverDocuments />
        },
        {
          path: '/driveradmin',
          element: <DriverProtection>
            <DriverAdmin />
          </DriverProtection>,
          children: [
            {
              path: 'location',
              element: <DriverLocation />
            },
            {
              path: 'reviews',
              element: <Reviews />
            },
            {
              path: 'vehicle',
              element: <DriverVehicle />
            }
          ]
        },
        
      ]

    }
  ])
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


