import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/applayout";
import { Home } from "../pages/home";
import { Signup } from "../pages/userpages/usersignup";
import { Login } from "../pages/userpages/userlogin";
import { ForgotPassword } from "../pages/userpages/forgotpassword";
import { ResetPassword } from "../pages/userpages/resetpassword";
import { FindRide } from "../pages/userpages/findride";
import { BookRide } from "../pages/userpages/bookride";
import { Payments } from "../pages/userpages/payment";
import { DriverSignup } from "../pages/driverpages/driversignup";
import { DriverLogin } from "../pages/driverpages/driverlogin";
import { DriverForgotPassword } from "../pages/driverpages/driverforgotpassword";
import { DriverResetPassword } from "../pages/driverpages/driverresetpassword";
import { DriverDocuments } from "../pages/driverpages/driverdocument";
import { DriverProtection } from "../pages/driverpages/driverprotected";
import { DriverAdmin } from "../layout/driveradminpage";
import { DriverLocation } from "../pages/driverpages/driverlocation";
import { Reviews } from "../pages/driverpages/driverreviews";
import { DriverVehicle } from "../pages/driverpages/drivervehicle";
import { DriverProfile } from "../pages/driverpages/driverprofile";

export const routes = createBrowserRouter([
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
          path:"/findride",
          element:<FindRide/>
        },
        {
          path:'/bookride',
          element:<BookRide/>
        },
        {
          path:'/payment',
          element:<Payments/>
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
            },{
              path: 'me',
              element: <DriverProfile/>
            },
          ]
        },
        
      ]

    }
  ])