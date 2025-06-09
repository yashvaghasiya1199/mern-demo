import { useEffect, useState } from "react";
import { Map } from "../../../componets/common/map";
import { useUserHooks } from "../../../hooks/useUser";

export function Current(){

    const [review, setReview] = useState(false);
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(0);
    const rideId = JSON.parse(localStorage.getItem("rideid")).ride.ride_id;
    const { userReview } = useUserHooks()
    const data = {
        ride_id: rideId,
        rating
    }

    console.log("Ride ID:", rideId);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await userReview(data)
            console.log(response.payload);

        } catch (error) {
            console.log(error);

        }

        console.log("Submitting review for ride:", rideId);
        console.log("Rating:", rating);
        setReview(false);
        alert("Thank you for your review!");
    };
    useEffect(()=>{
        setTimeout(() => {
            setReview(true)
        }, 1500);
    },[])

    return (
        <>
            {review ? (
                <div className="location-form-container">
                    <form className="location-form" onSubmit={handleSubmit}>
                        <h2>Rate Your Ride</h2>
                        <label htmlFor="rating">Rating</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
                                    onClick={() => setRating(star)}     
                                    onMouseEnter={() => setHover(star)}  
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <div className="updatevheclebuttton" >
                            <button type="submit">Submit Review</button>
                            <button className="cancel" onClick={()=>setReview(!review)} >cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="current">
                    <div>
                        <h1>Your ride is booked successfully</h1>
                        <h2>Ride will arrive in 5 minutes</h2>
                    </div>
                    <Map />
                </div>
            )}
        </>
    );
    

}