import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/applayout";
import { Home } from "../pages/home";
import { UserSignupPage } from "../pages/userpages/usersignup";
import { UserLoginPage } from "../pages/userpages/userlogin";
import { UserResetPasswordPage } from "../pages/userpages/resetpassword";
import { FindRidePage } from "../pages/userpages/findride";
import { BookRidePage } from "../pages/userpages/bookride";
import { PaymentsPage } from "../pages/userpages/payment";
import { DriverSignupPage } from "../pages/driverpages/driversignup";
import { DriverLoginPage } from "../pages/driverpages/driverlogin";
import { DriverForgotPasswordpage } from "../pages/driverpages/driverforgotpassword";
import { DriverResetPasswordPage } from "../pages/driverpages/driverresetpassword";
import { DriverDocumentsPage } from "../pages/driverpages/driverdocument";
import { DriverProtectionPage } from "../pages/driverpages/driverprotected";
import { DriverAdmin } from "../layout/driveradminpage";
import { DriverLocationPage } from "../pages/driverpages/driverlocation";
import { ReviewsPage } from "../pages/driverpages/driverreviews";
import { DriverVehiclePage } from "../pages/driverpages/drivervehicle";
import { DriverProfilePage } from "../pages/driverpages/driverprofile";
import { CurrentPage } from "../pages/userpages/currentpage";
import { PreviousRidesPages } from "../pages/userpages/previosride";
import { UserProtectionPage } from "../pages/userpages/userprotected";
import { UserProfilePage } from "../pages/userpages/userprofile";
import { UserForgotPassword, } from "../views/auth";
import { ErrorPage } from "../componets/errorpage";

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
        element: <UserForgotPassword />
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
        path: '/user/me',
        element: <>
          <UserProtectionPage>
            <UserProfilePage />
          </UserProtectionPage>
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
        element: <DriverProtectionPage>
          <DriverAdmin />
        </DriverProtectionPage>,
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