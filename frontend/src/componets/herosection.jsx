import "./css/herosection.css"
import carImage from '../assets/images/car.png'
export function Hero() {

    return <>
        <div className="main">
            <div className="left">
                <section className="hero">
                    <h1 className="hero-h1">Your Ride, Your Way.</h1>
                    <p className="hero-p" >Fast. Affordable. Available 24/7 in your city.</p>
                    <button className="hero-button" >Book a Ride</button>
                </section>

            </div>
            <div className="right">
                <img className="hero-car" src={carImage} alt="" />
            </div>
        </div>
    </>
}