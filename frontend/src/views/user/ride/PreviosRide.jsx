import { useEffect, useState } from "react";
import '../../../assets/css/navbar.css'
import { useRide } from "../../../hooks/useRide";

export function PreviousRides(){

    const {userAllRide} =useRide()
    const [rideData, setRideData] = useState([]);
  
    async function myinfo() {
      try {
        const response = await userAllRide();
        setRideData(response.payload.rides);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    }
  
    useEffect(() => {
      myinfo();
    }, []);

    return<>
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

}