import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { errorToast } from "../../../componets/toast"
import { ToastContainer } from "react-toastify"
import { useUserHooks } from "../../../hooks/useUser"
import { CircularIndeterminate } from "../../../componets/loadder"
import { ErrorNote } from "../../../componets/common/errornote"

export function FindRide() {
    const { userPending, findRide } = useUserHooks()
    const [nearRide, setNearRide] = useState([])
    const [formErrors, setFormErrors] = useState({})
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
        e.preventDefault()

        const errors = {}

        if (!data.pickup_latitude.trim()) {
            errors.pickup_latitude = "Pickup latitude must be defined"
        }

        if (!data.pickup_longitude.trim()) {
            errors.pickup_longitude = "Pickup longitude must be defined"
        }

        if (
            data.pickup_latitude.trim() &&
            data.pickup_longitude.trim() &&
            data.pickup_latitude === data.pickup_longitude
        ) {
            errors.sameLocation = "Latitude and longitude cannot be the same"
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        setFormErrors({}) // Clear previous errors if valid

        try {
            const response = await findRide(data)
            if (response.payload.error) {
                return errorToast(response.payload.msg)
            }
            setNearRide(response.payload.drivers)
        } catch (error) {
            if (error.response) {
                return errorToast(error.response.data.errors[0])
            } else {
                console.error("Unexpected error:", error)
            }
        }
    }

    function ridebook(vehicle, locationData) {
        localStorage.setItem('rideinformation', JSON.stringify(vehicle))
        localStorage.setItem('location', JSON.stringify(locationData))
        navigate('/bookride')
    }

    return (
        <>
            <h2 className="text-center">Find Near Ride</h2>
            <div className="location-form-container">
                <form className="location-form" onSubmit={formSumbit}>
                    <h2>Find Ride</h2>

                    <label htmlFor="pickup_latitude">Pickup Latitude</label>
                    <input
                        type="text"
                        id="pickup_latitude"
                        name="pickup_latitude"
                        value={data.pickup_latitude}
                        onChange={formHandel}
                        placeholder="Enter latitude"
                    />
                    {formErrors.pickup_latitude && (
                        <p className="error">{formErrors.pickup_latitude}</p>
                    )}

                    <label htmlFor="pickup_longitude">Pickup Longitude</label>
                    <input
                        type="text"
                        id="pickup_longitude"
                        name="pickup_longitude"
                        value={data.pickup_longitude}
                        onChange={formHandel}
                        placeholder="Enter longitude"
                    />
                    {formErrors.pickup_longitude && (
                        <p className="error">{formErrors.pickup_longitude}</p>
                    )}

                    {formErrors.sameLocation && (
                        <p className="error">{formErrors.sameLocation}</p>
                    )}

                    <button
                        type="submit"
                        disabled={userPending}
                        style={{ backgroundColor: userPending ? "#9b9090" : "green" }}
                    >
                        {userPending ? <CircularIndeterminate /> : "Find ride"}
                    </button>
                </form>
            </div>

            <h2 className="text-center">Choose Driver and Car</h2>
            <div className="location-table">
                <table className="previosloc" style={{ color: "black" }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Driver name</th>
                            <th>Type</th>
                            <th>Model</th>
                            <th>Phone No</th>
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
                                            <button onClick={() => ridebook(vehicle, data)}>
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
    )
}
