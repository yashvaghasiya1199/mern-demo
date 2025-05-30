import { Outlet } from "react-router-dom";
import { Navbar } from "../componets/navbar";

export function AppLayout(){

    return<>
    <Navbar/>
    <Outlet/>
    </>
}