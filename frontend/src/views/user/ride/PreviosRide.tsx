import { useEffect, useState } from "react";
import '../../../assets/css/navbar.css';
import { useRide } from "../../../hooks/useRide";

interface IUserAllRide {
    pickup_latitude: string;
    pickup_longitude: string;
    drop_latitude: string;
    drop_longitude: string;
    fare_amount: number;
    updatedAt: string;
    createdAt: string;
}
export function PreviousRides() {

    const { userAllRide } = useRide();
    const [rideData, setRideData] = useState<IUserAllRide[]>([]);

    async function myinfo(): Promise<void> {
        try {
            const response: object = await userAllRide();
            setRideData((response as any).payload.rides as IUserAllRide[]);
        } catch (error: any) {
            console.error("Error fetching rides:", error);
        }
    }

    useEffect(() => {
        myinfo();
    }, []);

    return <>
        <table className="previosloc col">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Pickup Latitude</th>
                    <th>Pickup Longitude</th>
                    <th>Drop Latitude</th>
                    <th>Drop Longitude</th>
                    <th>Amount</th>
                    <th>Booked At</th>
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
                            <td>{ride.updatedAt.slice(0, ride.updatedAt.indexOf('T'))} {ride.updatedAt.slice(ride.updatedAt.indexOf('T') + 1, ride.updatedAt.indexOf('T') + 9)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} style={{ textAlign: "center" }}>No ride data available</td>
                    </tr>
                )}
            </tbody>
        </table>
    </>;
}

