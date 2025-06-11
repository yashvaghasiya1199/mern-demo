import { useEffect, useState } from "react";
import '../../../assets/css/driveradmin.css'
import { useDriverHooks } from "../../../hooks/useDriver";


export function Reviews() {
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(false);

    const { getDriverReview } = useDriverHooks()

    useEffect(() => {
        async function getReviews() {
            try {
                const response = await getDriverReview()
                setReviews(response.payload.reviews)
                console.log("erer");


            } catch (err) {
                console.error("Error fetching reviews", err);
                setError(true);
            }
        }

        getReviews();
    }, []);

    return <>
        <h2 className="text-center">My all reviews</h2>

        {error ? (
            <h3 className="text-center">Review not found</h3>
        ) : reviews === null ? (
            <h3 className="text-center">Loading...</h3>
        ) : (
            <div className="location-table">
                <table className="previosloc">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>RideId</th>
                            <th>User Name</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews?.map((c, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{c.ride_id}</td>
                                <td>{c.user?.first_name}</td>
                                <td>{c.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </>
}