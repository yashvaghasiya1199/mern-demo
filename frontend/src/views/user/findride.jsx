import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { errorToast } from "../../componets/toast"
import { ToastContainer } from "react-toastify"
import { useUserHooks } from "../../hooks/useuser.hook"
import { CircularIndeterminate } from "../../componets/loadder"
import { ErrorNote } from "../../componets/common/errornote"


export function FindRide() {

    const { userPending, findRide } = useUserHooks()
    const [nearRide, setNearRide] = useState([])
    const [isError,setIsError] = useState(false)
    const navigate = useNavigate()

    const [data, setData] = useState({
        pickup_latitude: "",
        pickup_longitude: ""
    })

    function formHandel(e) {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function formSumbit(e) {
        e.preventDefault();
        if(data.pickup_latitude === data.pickup_longitude){
            setIsError(true)
        }

        try {
            const response = await findRide(data)
            console.log(response.payload);
            if(response.payload.error){
                return errorToast(response.payload.msg) 
            }
            setNearRide(response.payload.drivers);
        } catch (error) {
            if (error.response) {
               return errorToast(error.response.data.errors[0])
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }


    function ridebook(e,data) {
        console.log(e);
        console.log(data)
        // dispatch(ridedata(e))
        localStorage.setItem('rideinformation', JSON.stringify(e))
        localStorage.setItem('location', JSON.stringify(data))
        navigate('/bookride')
    }

    return <>
        <h2 className="text-center" >Find near ride</h2>
        <div className="location-form-container">
            <form className="location-form" onSubmit={formSumbit} >
                <h2>Find Ride</h2>
        {isError && <ErrorNote data="longitude and latitude does not equal"/>}
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
                    {userPending ? <CircularIndeterminate /> : "Find ride"}
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
                                        <button onClick={() => ridebook(vehicle,data)}>
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