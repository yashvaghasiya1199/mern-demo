import "./css/herosection.css"
import carImage from '../assets/images/car.png'
import { Map } from "./map"
import { NavLink } from "react-router-dom"
export function Hero() {

    return <>
        <div className="main">
            <div className="left">
                <section className="hero">
                    <h1 className="hero-h1">Your Ride, Your Way.</h1>
                    <p className="hero-p" >Fast. Affordable. Available 24/7 in your city.</p>
                    <button className="hero-button" ><NavLink className="navlink" to='/findride'>Book a Ride</NavLink></button>
                </section>

            </div>
            <div className="right">
                {/* <img className="hero-car" src={carImage} alt="" /> */}
                <Map />
            </div>
        </div>
    </>
}