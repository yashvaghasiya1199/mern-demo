// import { routes } from "./router"
// import Cookies from 'js-cookie'
// import { RouterProvider } from "react-router-dom"
// import { Cookieprovider } from "./context/cokieContext";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { userlogin } from "./store/redusers/user.reduser";
// import { driverLogins } from "./store/redusers/driver.reduser";

// function App() {

//   const dispatch = useDispatch()
//     useEffect(() => {
//       const token = Cookies.get('usertoken')
//       const driverToken = Cookies.get('drivertoken')
//       if (token) {
//         dispatch(userlogin())
//       }
//       if(driverToken){
//         dispatch(driverLogins())
//       }
//     }, [])

//   return <>
//     <Cookieprovider>
//       <RouterProvider router={routes} />
//     </Cookieprovider>
//   </>
// }
// export default App


// App.tsx

import { routes } from "./router/index";
import Cookies from "js-cookie";
import { RouterProvider } from "react-router-dom";
import { Cookieprovider } from "./context/cokieContext";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userlogin } from "./store/redusers/user.reduser";
import { driverLogins } from "./store/redusers/driver.reduser";
import type { AppDispatch } from "./store/store"; 

function App(){
  const dispatch = useDispatch<AppDispatch>(); 

  useEffect(() => {
    const token:string = Cookies.get("usertoken");
    const driverToken:string = Cookies.get("drivertoken");

    if (token) {
      dispatch(userlogin());
    }

    if (driverToken) {
      dispatch(driverLogins());
    }
  }, [dispatch]);

  return (
    <Cookieprovider>
      <RouterProvider router={routes} />
    </Cookieprovider>
  );
}

export default App;
