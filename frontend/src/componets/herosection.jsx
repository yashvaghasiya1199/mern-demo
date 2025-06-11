import { Navigate, NavLink } from "react-router-dom"
import '../assets/css/herosection.css'
import { useSelector } from "react-redux"
import { Map } from "./common/map"

export function Hero() {
    const isDriverLogin = useSelector(state => state.driver.driverLogin)
    const isUserLogin = useSelector(state => state.user)
    

    if (isDriverLogin) {
        return <Navigate to="/driveradmin" />
    }
    // if(isUserLogin){
    //     return <Navigate to="/profile"/>
    // }
    return (
        <div className="main">
            <div className="left">
                <section className="hero">
                    <h1 className="hero-h1">Your Ride, Your Way.</h1>
                    <p className="hero-p">Fast. Affordable. Available 24/7 in your city.</p>
                    <button className="hero-button">
                        <NavLink className="navlink" to='/findride'>Book a Ride</NavLink>
                    </button>
                </section>
            </div>
            <div className="right">
                <Map />
            </div>
        </div>
    )
}
