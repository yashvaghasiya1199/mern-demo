import { Outlet } from "react-router-dom";
import { Navbar } from "../layout/navbar";

export function UserPrivate(){

    return<>
    <Navbar/>
    <Outlet/>
    </>
}