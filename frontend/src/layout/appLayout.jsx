import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function AppLayout(){

    return<>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </>
}