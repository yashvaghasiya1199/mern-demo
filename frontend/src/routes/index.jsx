import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/applayout";
import { Home } from "../pages/home";
import { UserSignupPage } from "../pages/userpages/signup";
import { UserLoginPage } from "../pages/userpages/login";
import { UserResetPasswordPage } from "../pages/userpages/resetpassword";
import { FindRidePage } from "../pages/userpages/findride";
import { BookRidePage } from "../pages/userpages/bookride";
import { PaymentsPage } from "../pages/userpages/payment";
import { DriverSignupPage } from "../pages/driverpages/signup";
import { DriverLoginPage } from "../pages/driverpages/login";
import { DriverForgotPasswordpage } from "../pages/driverpages/forgotpassword";
import { DriverResetPasswordPage } from "../pages/driverpages/resetpassword";
import { DriverDocumentsPage } from "../pages/driverpages/document";
import { DriverAdmin } from "../layout/driveradminpage";
import { DriverLocationPage } from "../pages/driverpages/location";
import { ReviewsPage } from "../pages/driverpages/reviews";
import { DriverVehiclePage } from "../pages/driverpages/vehicle";
import { DriverProfilePage } from "../pages/driverpages/profile";
import { CurrentPage } from "../pages/userpages/currentpage";
import { PreviousRidesPages } from "../pages/userpages/previosride";
import { UserProfilePage } from "../pages/userpages/profile";
import { ErrorPage } from "../componets/errorpage";
import { UserProtectionPage } from "../pages/userpages/protected";
import { UserForgotPasswordPage } from "../pages/userpages/forgotpassword";
import { DriverProtectionPage } from "../pages/driverpages/protected";

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
        element: <UserSignupPage />
      },
      {
        path: '/user/login',
        element: <UserLoginPage />
      },
      {
        path: '/user/forgot-password',
        element: <UserForgotPasswordPage />
      },
      {
        path: '/user/reset-password',
        element: <UserResetPasswordPage />
      },
      {
        path: "/findride",
        element: <>
          <UserProtectionPage>
            <FindRidePage />
          </UserProtectionPage>
        </>
      },
      {
        path: '/bookride',
        element: <>
          <UserProtectionPage>
            <BookRidePage />
          </UserProtectionPage>
        </>
      },
      {
        path: '/payment',
        element: <>
          <UserProtectionPage>
            <PaymentsPage />
          </UserProtectionPage>
        </>
      },
      {
        path: '/payment/complated',
        element: <>
          <UserProtectionPage>
            <CurrentPage />
          </UserProtectionPage>
        </>
      },
      {
        path: '/profile',
        element: <>
          {/* <UserProtectionPage> */}
            <UserProfilePage />
          {/* </UserProtectionPage> */}
        </>
      },
      {
        path: '/previousrides',
        element: <UserProtectionPage>
          <PreviousRidesPages />
        </UserProtectionPage>
      },
      {
        path: '/driver/signup',
        element: <DriverSignupPage />
      },
      {
        path: '/driver/login',
        element: <DriverLoginPage />
      },
      {
        path: '/driver/forgot-password',
        element: <DriverForgotPasswordpage />
      },
      {
        path: '/driver/reset-password',
        element: <DriverResetPasswordPage />
      },
      {
        path: '/driver/document',
        element: <DriverDocumentsPage />
      },
      {
        path: '/driveradmin',
        element: (
             <DriverProtectionPage> 
              <DriverAdmin />
              </DriverProtectionPage>
        ),
        children: [
          {
            index: true,
            element: <DriverProfilePage />
          },
          {
            path: 'location',
            element: <DriverLocationPage />
          },
          {
            path: 'reviews',
            element: <ReviewsPage />
          },
          {
            path: 'vehicle',
            element: <DriverVehiclePage />
          },
        ]
      },

    ]
  }, {
    path: "*",
    element: <ErrorPage />,

  }
])