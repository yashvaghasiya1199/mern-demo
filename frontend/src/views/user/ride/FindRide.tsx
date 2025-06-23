import { useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { ErrorNote } from "../../../componets/common/errornote"
import { useRide } from "../../../hooks/useRide"
import { errorToast } from "../../../componets/toast"
import { CircularIndeterminate } from "../../../componets/loadder"

interface IRideData {
    pickup_latitude: string;
    pickup_longitude: string;
}

interface IFormErrors {
    pickup_latitude?: string;
    pickup_longitude?: string;
    sameLocation?: string;
}

interface IVehicle {
    type: string;
    model: string;
}

interface IDriver {
    first_name: string;
    last_name: string;
    phone: string;
    Vehicles?: IVehicle[];
}

interface IDriverItem {
    Driver: IDriver;
}

export function FindRide() {
    const { isError, isPending, findRide } = useRide()
    const [nearRide, setNearRide] = useState<IDriverItem[]>([] as IDriverItem[])
    const [formErrors, setFormErrors] = useState<IFormErrors>({})
    const navigate = useNavigate()

    const [data, setData] = useState<IRideData>({
        pickup_latitude: "",
        pickup_longitude: ""
    })

    function formHandel(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function formSumbit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const errors: IFormErrors = {}

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
            const response:any = await findRide(data)
            if (response.payload.error) {
                return errorToast(response.payload.msg)
            }
            setNearRide(response.payload.drivers)
        } catch (error: any) {
            if (error.response) {
                return errorToast(error.response.data.errors[0])
            } else {
                console.error("Unexpected error:", error)
            }
        }
    }

    function ridebook(vehicle: IVehicle, locationData: IRideData):void{
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
        {isError && <ErrorNote data="invalid locations" />}
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
                        disabled={isPending}
                        style={{ backgroundColor: isPending ? "#9b9090" : "green" }}

                    >
                        {isPending ? <CircularIndeterminate /> : "Find ride"}
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
                        {nearRide?.length > 0 ? (
                            nearRide.flatMap((driverItem, i) => {
                                const vehicles = driverItem.Driver?.Vehicles || [];
                                return vehicles.map((vehicle, vi) => (
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
                                ));
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
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
