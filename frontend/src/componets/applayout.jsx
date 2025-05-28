import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export function AppLayout(){

    return<>
    <Navbar/>
    <Outlet/>
    </>
}