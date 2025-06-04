import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { errorToast } from "../../componets/toast"
import { ToastContainer } from "react-toastify"
import { useUserHooks } from "../../componets/hooks/user.hook"
import { CircularIndeterminate } from "../../componets/loadder"


export function FindRide() {

    const { userPending, findRide } = useUserHooks()

    const [data, setData] = useState({
        pickup_latitude: "",
        pickup_longitude: ""
    })
    const [nearRide, setNearRide] = useState([])
    const navigate = useNavigate()

    function formHandel(e) {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function formSumbit(e) {
        e.preventDefault();

        try {
            const response = await findRide(data)
            setNearRide(response.drivers);
        } catch (error) {
            if (error.response) {
                errorToast(error.response.data.errors[0])
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }


    function ridebook(e) {
        // dispatch(ridedata(e))
        localStorage.setItem('rideinformation', JSON.stringify(e))
        navigate('/bookride')
    }

    return <>
        <h2 className="text-center" >Find near ride</h2>
        <div className="location-form-container">
            <form className="location-form" onSubmit={formSumbit} >
                <h2>Find Ride</h2>

                <label htmlFor="longitude">pickup_latitude</label>
                <input
                    type="text"
                    id="longitude"
                    name="pickup_latitude"
                    value={data.pickup_latitude}
                    onChange={formHandel}
                    placeholder="Enter longitude"
                    required
                />

                <label htmlFor="latitude">pickup_longitude</label>
                <input
                    type="text"
                    id="latitude"
                    name="pickup_longitude"
                    placeholder="Enter latitude"
                    onChange={formHandel}
                    value={data.pickup_longitude}
                    required
                />

                <button
                    type="submit"
                    disabled={userPending}
                    style={{ backgroundColor: `${userPending ? "#9b9090" : "green"}` }}
                >
                    {userPending ? <CircularIndeterminate /> : "Login"}
                </button>
            </form>

        </div>
        <h2 className="text-center" >Choose driver and Car</h2>
        <div className="location-table">
            <table className="previosloc " style={{ color: "black" }} >
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Driver name</th>
                        <th>type</th>
                        <th>model</th>
                        <th>phoneno</th>
                        <th>Book Ride</th>
                    </tr>
                </thead>
                <tbody>
                    {nearRide.length > 0 ? (
                        nearRide.flatMap((driverItem, i) =>
                            (driverItem.Driver?.Vehicles || []).map((vehicle, vi) => (
                                <tr key={`${i}-${vi}`}>
                                    <td>{`${i + 1}.${vi + 1}`}</td>
                                    <td>{`${driverItem.Driver.first_name} ${driverItem.Driver.last_name}`}</td>
                                    <td>{vehicle.type}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{driverItem.Driver.phone}</td>
                                    <td>
                                        <button onClick={() => ridebook(vehicle)}>
                                            Book
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No nearby rides found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    </>
}