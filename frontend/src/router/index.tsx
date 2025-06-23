import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { Home } from "../pages/home";
import { UserSignupPage } from "../pages/user/auth/signup";
import { UserLoginPage } from "../pages/user/auth/login";
import { UserResetPasswordPage } from "../pages/user/auth/resetpassword";
import { FindRidePage } from "../pages/user/ride/findride";
import { BookRidePage } from "../pages/user/ride/bookride";
import {PaymentsPage} from '../pages/user/ride/payment'
import { DriverDocumentsPage } from "../pages/driver/information/document";
import { DriverAdmin } from "../layout/DriverLayout";
import { DriverLocationPage } from "../pages/driver/information/location";
import { ReviewsPage } from "../pages/driver/information/reviews";
import { DriverVehiclePage } from "../pages/driver/information/vehicle";
import { DriverProfilePage } from "../pages/driver/information/profile";
import { CurrentPage } from "../pages/user/settings/currentpage";
import { PreviousRidesPages } from "../pages/user/ride/previosride";
import { UserProfilePage } from "../pages/user/settings/profile";
import { ErrorPage } from "../componets/errorpage";
import { UserProtectionPage } from "../pages/user/settings/protected";
import { UserForgotPasswordPage } from "../pages/user/auth/forgotpassword";
import { DriverProtectionPage } from "../pages/driver/information/protected";
import { DriverSignupPage } from "../pages/driver/auth/signup";
import { DriverLoginPage } from "../pages/driver/auth/login";
import { DriverForgotPasswordpage } from "../pages/driver/auth/forgotpassword";
import { DriverResetPasswordPage } from "../pages/driver/auth/resetpassword";
import { UserPrivate } from "../layout/UserLayout";


// export const routes = createBrowserRouter([

//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Home />
//       },
//       {
//         path: '/user/signup',
//         element: <UserSignupPage />
//       },
//       {
//         path: '/user/login',
//         element: <UserLoginPage />
//       },
//       {
//         path: '/user/forgot-password',
//         element: <UserForgotPasswordPage />
//       },
//       {
//         path: '/user/reset-password',
//         element: <UserResetPasswordPage />
//       },
//       {
//         path: "/findride",
//         element: <>
//           <UserProtectionPage>
//             <FindRidePage />
//           </UserProtectionPage>
//         </>
//       },
//       {
//         path: '/bookride',
//         element: <>
//           <UserProtectionPage>
//             <BookRidePage />
//           </UserProtectionPage>
//         </>
//       },
//       {
//         path: '/payment',
//         element: <>
//           <UserProtectionPage>
//             <PaymentsPage />
//           </UserProtectionPage>
//         </>
//       },
//       {
//         path: '/payment/complated',
//         element: <>
//           <UserProtectionPage>
//             <CurrentPage />
//           </UserProtectionPage>
//         </>
//       },
//       {
//         path: '/profile',
//         element: <>
//           {/* <UserProtectionPage> */}
//             <UserProfilePage />
//           {/* </UserProtectionPage> */}
//         </>
//       },
//       {
//         path: '/previousrides',
//         element: <UserProtectionPage>
//           <PreviousRidesPages />
//         </UserProtectionPage>
//       },
//       {
//         path: '/driver/signup',
//         element: <DriverSignupPage />
//       },
//       {
//         path: '/driver/login',
//         element: <DriverLoginPage />
//       },
//       {
//         path: '/driver/forgot-password',
//         element: <DriverForgotPasswordpage />
//       },
//       {
//         path: '/driver/reset-password',
//         element: <DriverResetPasswordPage />
//       },
//       {
//         path: '/driver/document',
//         element: <DriverDocumentsPage />
//       },
//       {
//         path: '/driveradmin',
//         element: (
//              <DriverProtectionPage> 
//               <DriverAdmin />
//               </DriverProtectionPage>
//         ),
//         children: [
//           {
//             index: true,
//             element: <DriverProfilePage />
//           },
//           {
//             path: 'location',
//             element: <DriverLocationPage />
//           },
//           {
//             path: 'reviews',
//             element: <ReviewsPage />
//           },
//           {
//             path: 'vehicle',
//             element: <DriverVehiclePage />
//           },
//         ]
//       },

//     ]
//   }, {
//     path: "*",
//     element: <ErrorPage />,

//   }
// ])

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
    ]
  },
  {
    path:'/',
    element:<UserProtectionPage>
      <UserPrivate/>
      </UserProtectionPage>,
    children:[
      {
        path: "/findride",
        element: <FindRidePage />
      },
      {
        path: '/bookride',
        element: <BookRidePage />
      },
      {
        path: '/payment',
        element: <PaymentsPage />
      },
      {
        path: '/payment/complated',
        element: <CurrentPage />
      },
      {
        path: '/profile',
        element: <UserProfilePage />
      },
      {         
        path: '/previousrides',
        element: 
          <PreviousRidesPages />
      },
    ]
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

  {
    path: "*",
    element: <ErrorPage />,

  }
])