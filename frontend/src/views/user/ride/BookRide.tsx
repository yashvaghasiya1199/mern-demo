import { useEffect, useState, ChangeEvent, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ridedata } from "../../../store/redusers/user.reduser"
import { errorToast, successToast } from "../../../componets/toast"
import { ToastContainer } from "react-toastify"
import { CircularIndeterminate } from "../../../componets/loadder"
import { useRide } from "../../../hooks/useRide"

interface IRideData {
    pickup_latitude: string;
    pickup_longitude: string;
    drop_latitude: string;
    drop_longitude: string;
    driver_id: string;
    vehicle_id: string;
    status: string;
}

interface IFormErrors {
    drop_latitude?: string;
    drop_longitude?: string;
    sameLocation?: string;
}

export function Bookride() {
    const [loading, setLoading] = useState<boolean>(true)
    const [rideData, setRideData] = useState<IRideData>({
        pickup_latitude: '',
        pickup_longitude: '',
        drop_latitude: '',
        drop_longitude: '',
        driver_id: '',
        vehicle_id: '',
        status: 'completed',
    })
    const [formErrors, setFormErrors] = useState<IFormErrors>({})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isPending, isError, bookRide } = useRide()

    const driverInformation = useSelector((state: any) => state.user.rideinformation)
    const location = JSON.parse(localStorage.getItem("location") || '{}')

    useEffect(() => {
        if (loading) {
            const saved = localStorage.getItem("rideinformation")
            if (saved) {
                dispatch(ridedata(JSON.parse(saved)))
            }
            setLoading(false)
        }
    }, [loading, dispatch])

    useEffect(() => {
        if (driverInformation?.driver_id && driverInformation?.vehicle_id) {
            setRideData(prev => ({
                ...prev,
                pickup_latitude: location.pickup_latitude,
                pickup_longitude: location.pickup_longitude,
                driver_id: driverInformation.driver_id,
                vehicle_id: driverInformation.vehicle_id,
            }))
        }
    }, [driverInformation])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setRideData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function validateForm(): IFormErrors {
        const errors: IFormErrors = {}

        if (!rideData.drop_latitude.trim()) {
            errors.drop_latitude = "Drop latitude must be defined"
        }

        if (!rideData.drop_longitude.trim()) {
            errors.drop_longitude = "Drop longitude must be defined"
        }

        if (
            rideData.drop_latitude.trim() &&
            rideData.drop_longitude.trim() &&
            rideData.drop_latitude === rideData.pickup_latitude &&
            rideData.drop_longitude === rideData.pickup_longitude
        ) {
            errors.sameLocation = "Pickup and drop locations must be different"
        }

        return errors
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        setFormErrors({})

        try {
            const response = await bookRide(rideData)
            localStorage.setItem("rideid", JSON.stringify(response))
            if (response?.msg) {
                successToast(response.msg)
            }

            setTimeout(() => {
                navigate('/payment')
            }, 1200)
        } catch (error) {
            errorToast("Failed to create ride. Please try again.")
            console.error("Ride booking error:", error)
        }
    }

    return (
        <>
            <h2 className="text-center">Create Ride</h2>
            <div className="location-form-container">
                <form className="location-form" onSubmit={handleSubmit}>
                    <h2>Create Ride</h2>

                    {formErrors.sameLocation && (
                        <p className="error">{formErrors.sameLocation}</p>
                    )}

                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={driverInformation?.type || 'N/A'}
                        disabled
                        required
                    />

                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={driverInformation?.model || 'N/A'}
                        disabled
                        required
                    />

                    <label htmlFor="pickup_latitude">Pickup Latitude</label>
                    <input
                        type="text"
                        id="pickup_latitude"
                        name="pickup_latitude"
                        value={rideData.pickup_latitude}
                        disabled
                        required
                    />

                    <label htmlFor="pickup_longitude">Pickup Longitude</label>
                    <input
                        type="text"
                        id="pickup_longitude"
                        name="pickup_longitude"
                        value={rideData.pickup_longitude}
                        disabled
                        required
                    />

                    <label htmlFor="drop_latitude">Drop Latitude</label>
                    <input
                        type="text"
                        id="drop_latitude"
                        name="drop_latitude"
                        placeholder="Enter latitude"
                        value={rideData.drop_latitude}
                        onChange={handleChange}
                    />
                    {formErrors.drop_latitude && (
                        <p className="error">{formErrors.drop_latitude}</p>
                    )}

                    <label htmlFor="drop_longitude">Drop Longitude</label>
                    <input
                        type="text"
                        id="drop_longitude"
                        name="drop_longitude"
                        placeholder="Enter longitude"
                        value={rideData.drop_longitude}
                        onChange={handleChange}
                    />
                    {formErrors.drop_longitude && (
                        <p className="error">{formErrors.drop_longitude}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        style={{ backgroundColor: isPending ? "#9b9090" : "green" }}
                    >
                        {isPending ? <CircularIndeterminate /> : "Book ride"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
