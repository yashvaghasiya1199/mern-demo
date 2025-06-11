import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function UserPrivate(){

    return<>
    <Navbar/>
    <Outlet/>
    </>
}