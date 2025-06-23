import { useEffect, useState } from "react";
import '../../../assets/css/driveradmin.css'
import { useDriverHooks } from "../../../hooks/useDriver";

interface IReaview{
    ride_id: string;
    user: {
        first_name: string;
    };
    rating: number;
}

export function Reviews() {
    const [reviews, setReviews] = useState<IReaview[] | null>(null);
    const [error, setError] = useState<Boolean>(false);

    const { getDriverReview } = useDriverHooks()

    useEffect(() => {
        async function getReviews():Promise<void>{
            try {
                const response = await getDriverReview()
                console.log("🚀 ~ getReviews ~ response:", response.payload)
                const payload = response.payload as { reviews: IReaview[] ,error:boolean};
                setReviews(payload.reviews)
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
