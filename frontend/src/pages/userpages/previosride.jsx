// import { useEffect, useState } from "react";
// import { UserHooks } from "../../componets/hooks/user.hook"
// import { ridedata } from "../../store/redusers/user.reduser";
// import '../../componets/css/navbar.css'

// export function PreviousRides() {

//     const { userAllRide } = UserHooks()
//     const [rideData, setRideData] = useState([])

//     async function myinfo() {
//         try {
//             const response = await userAllRide()
//             console.log(response.rides);
//             setRideData(response.rides)

//         } catch (error) {
//             console.log(error);

//         }
//     }
//     useEffect(() => {
//         myinfo()
//     }, [])


//     return <>
//         <button >createSlice</button>
//         <table className="previosloc col ">
//             <thead>
//                 <tr>
//                     <th>No</th>
//                     <th>pickup latitude</th>
//                     <th>pickup longitude</th>
//                     <th>drop latitude</th>
//                     <th>drop longitude</th>
//                     <th>amount</th>
//                 </tr>
//             </thead>
//             <tbody>
//               {
//                 ridedata? <div>
//                     {
//                         rideData.map((c,i)=>{
//                             return <tr key={i} >
//                                 <td>{i+1}</td>
//                                 <td>{c.driver_id}</td>
//                                 <td>121</td>
//                                 <td>yash</td>
//                             </tr>
//                         })
//                     }
//                 </div>:
                
//                 <div></div>
//               }
//             </tbody>
//         </table>
//     </>
// }

import { useEffect, useState } from "react";
import { UserHooks } from "../../componets/hooks/user.hook";
import '../../componets/css/navbar.css';

export function PreviousRides() {
  const { userAllRide } = UserHooks();
  const [rideData, setRideData] = useState([]);

  async function myinfo() {
    try {
      const response = await userAllRide();
      console.log(response.rides);
      setRideData(response.rides);
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  }

  useEffect(() => {
    myinfo();
  }, []);

  return (
    <>
      <table className="previosloc col">
        <thead>
          <tr>
            <th>No</th>
            <th>Pickup Latitude</th>
            <th>Pickup Longitude</th>
            <th>Drop Latitude</th>
            <th>Drop Longitude</th>
            <th>Amount</th>
            <th>booked at</th>
          </tr>
        </thead>
        <tbody>
          {rideData && rideData.length > 0 ? (
            rideData.map((ride, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ride.pickup_latitude}</td>
                <td>{ride.pickup_longitude}</td>
                <td>{ride.drop_latitude}</td>
                <td>{ride.drop_longitude}</td>
                <td>{ride.fare_amount}</td>
                <td>{ride.updatedAt.slice(0, ride.createdAt.indexOf('T'))} {ride.createdAt.slice(ride.createdAt + 1, ride.createdAt + 9)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No ride data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
