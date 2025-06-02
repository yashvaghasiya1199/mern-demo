import { Navigate, NavLink, Outlet } from 'react-router-dom'
import '../componets/css/driveradmin.css'


export function DriverAdmin() {
   return <>
        <div className="admin-main">
            <div className="admin-left">
                {/* <NavLink to="./location">Add location</NavLink> */}
                <NavLink to="/driveradmin">Profile</NavLink>
                <NavLink to="/driveradmin/location">Add location</NavLink>
                <NavLink to="/driveradmin/reviews">Reviews</NavLink>
                <NavLink to="/driveradmin/vehicle">Add vehicle</NavLink>
            </div>
            <div className="admin-right">
                <Outlet />
            </div>
        </div>

    </>
}

