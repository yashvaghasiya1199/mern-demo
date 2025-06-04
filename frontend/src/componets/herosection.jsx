import "./css/herosection.css"
import { Map } from "./map"
import { Navigate, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

export function Hero() {
    const isDriverLogin = useSelector(state => state.driverLogin.driverLogin)

    if (isDriverLogin) {
        return <Navigate to="/driveradmin" />
    }

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
