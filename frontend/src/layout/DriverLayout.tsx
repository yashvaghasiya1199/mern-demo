import { Navigate, NavLink, Outlet } from 'react-router-dom'
import "../assets/css/driveradmin.css"
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { driverLogout } from '../store/redusers/driver.reduser'
import { useState } from 'react'

export function DriverAdmin() {
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)

    function logout():void{
        Cookies.remove("drivertoken")
        dispatch(driverLogout())
        setRedirect(true)
    }
    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <div className="admin-main">
            <div className="admin-left">
                <NavLink to="/driveradmin">Profile</NavLink>
                <NavLink to="/driveradmin/location">Add location</NavLink>
                <NavLink to="/driveradmin/reviews">Reviews</NavLink>
                <NavLink to="/driveradmin/vehicle">Add vehicle</NavLink>
                <button className='btn2' onClick={logout}>Logout</button>
            </div>
            <div className="admin-right">
                <Outlet />
            </div>
        </div>
    )
}

