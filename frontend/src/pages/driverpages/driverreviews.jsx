// import { useEffect, useState } from "react";
// import { api } from "../axios/axios"
// import '../componets/css/driveradmin.css'

// export function Reviews() {

//     const [reviews, setReviews] = useState([])

//     async function getReviews() {
//         let res = await api.get('/api/driver/allreview', {
//             withCredentials: true
//         })
//         // console.log(res.data.reviews );
//         setReviews(res.data)
//     }
//     if(reviews.error){
//         return <h1>Review not found</h1>
//     }
//     // console.log(reviews);
//     useEffect(() => {
//         getReviews()
//     }, [])
//     return <>
//         <h2 className="text-center" >My all reviews</h2>
//         <div className="location-table">
//             <table className="previosloc">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>RideId</th>
//                         <th>UserId</th>
//                         <th>User Name</th>
//                         <th>Review</th>
//                     </tr>
//                 </thead>
//                 <tbody>

//                       {reviews.length > 0 && (
                        
//                         reviews.map((c, i) => (
//                             <tr key={i}>
//                                 <td>{i + 1}</td>
//                                 <td>{c.ride_id}</td>
//                                 <td>{c.user.user_id}</td>
//                                 <td>{c.user.first_name}</td>
//                                 <td>{c.rating}</td>
//                             </tr>
//                         )))}
//                 </tbody>
//             </table>
//         </div>
//     </>
// }

import { useEffect, useState } from "react";
import { api } from "../../axios/axios";
import '../../componets/css/driveradmin.css';

export function Reviews() {
    const [reviews, setReviews] = useState(null); // Use null as initial to distinguish loading/error states
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getReviews() {
            try {
                const res = await api.get('/api/driver/allreview', {
                    withCredentials: true
                });

                if (res.data.error) {
                    setError(true);
                    setReviews([]);
                } else {
                    setReviews(res.data.reviews);
                }
            } catch (err) {
                console.error("Error fetching reviews", err);
                setError(true);
            }
        }

        getReviews();
    }, []);

    return (
        <>
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
                                <th>UserId</th>
                                <th>User Name</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((c, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{c.ride_id}</td>
                                    <td>{c.user?.user_id}</td>
                                    <td>{c.user?.first_name}</td>
                                    <td>{c.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
