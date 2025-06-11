import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export function UserPrivate(){

    return<>
    <Navbar/>
    <Outlet/>
    </>
}