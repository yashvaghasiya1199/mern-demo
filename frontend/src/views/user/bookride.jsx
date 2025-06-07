// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { api } from "../../libs/axios"
// import { useNavigate } from "react-router-dom"
// import { ridedata } from "../../store/redusers/user.reduser"
// import { errorToast, successToast } from "../../componets/toast"
// import { ToastContainer } from "react-toastify"
// import { useUserHooks } from "../../hooks/user.hook"
// import { CircularIndeterminate } from "../../componets/loadder"

// export function Bookride() {

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const { userPending, bookRide } = useUserHooks()

//     const driverInformation = useSelector(state => state.userlogin.rideinformation)

//     const [loading, setloading] = useState(true)

//     const [rideData, setRideData] = useState({
//         pickup_latitude: '',
//         pickup_longitude: '',
//         drop_latitude: '',
//         drop_longitude: '',
//         driver_id: '',
//         vehicle_id: '',
//         status: 'completed',
//     })

//     if (loading) {
//         const datas = localStorage.getItem("rideinformation")
//         if (datas) {
//             const result = JSON.parse(datas)
//             dispatch(ridedata(result))
//         }
//         setloading(false)
//     }

//     useEffect(() => {
//         if (driverInformation?.driver_id && driverInformation?.vehicle_id) {
//             setRideData(prev => ({
//                 ...prev,
//                 driver_id: driverInformation.driver_id,
//                 vehicle_id: driverInformation.vehicle_id,
//             }))
//         }
//     }, [driverInformation])

//     // Handle input change
//     function handleChange(e) {
//         const { name, value } = e.target
//         setRideData(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     // Handle form submission
//     async function handleSubmit(e) {
//         e.preventDefault()
//         try {
//             const response = await bookRide(rideData)
//             console.log(response);

//             localStorage.setItem("rideid", JSON.stringify(response))
//             if (response) {
//                 successToast(response.msg)
//             }
//             console.log(response)
//             setTimeout(() => {
//                 navigate('/payment')
//             }, 1200)
//         } catch (error) {
//             errorToast("Failed to create ride. Please try again.")
//             console.error("Ride booking error:", error)
//         }
//     }

//     return <>
//         <h2 className="text-center">Create Ride</h2>
//         <div className="location-form-container">
//             <form className="location-form" onSubmit={handleSubmit}>
//                 <h2>Create Ride</h2>

//                 <label htmlFor="type">Type</label>
//                 <input
//                     type="text"
//                     id="type"
//                     name="type"
//                     value={driverInformation?.type || 'N/A'}
//                     disabled
//                     required
//                 />

//                 <label htmlFor="model">Model</label>
//                 <input
//                     type="text"
//                     id="model"
//                     name="model"
//                     value={driverInformation?.model || 'N/A'}
//                     disabled
//                     required
//                 />

//                 <label htmlFor="pickup_latitude">Pickup Latitude</label>
//                 <input
//                     type="text"
//                     id="pickup_latitude"
//                     name="pickup_latitude"
//                     placeholder="Enter latitude"
//                     value={rideData.pickup_latitude}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="pickup_longitude">Pickup Longitude</label>
//                 <input
//                     type="text"
//                     id="pickup_longitude"
//                     name="pickup_longitude"
//                     placeholder="Enter longitude"
//                     value={rideData.pickup_longitude}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="drop_latitude">Drop Latitude</label>
//                 <input
//                     type="text"
//                     id="drop_latitude"
//                     name="drop_latitude"
//                     placeholder="Enter latitude"
//                     value={rideData.drop_latitude}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="drop_longitude">Drop Longitude</label>
//                 <input
//                     type="text"
//                     id="drop_longitude"
//                     name="drop_longitude"
//                     placeholder="Enter longitude"
//                     value={rideData.drop_longitude}
//                     onChange={handleChange}
//                     required
//                 />

//                 <button
//                     type="submit"
//                     disabled={userPending}
//                     style={{ backgroundColor: `${userPending ? "#9b9090" : "green"}` }}
//                 >
//                     {userPending ? <CircularIndeterminate /> : "Book ride"}
//                 </button>
//             </form>
//         </div>
//         <ToastContainer />
//     </>

// }

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ridedata } from "../../store/redusers/user.reduser"
import { errorToast, successToast } from "../../componets/toast"
import { ToastContainer } from "react-toastify"
import { useUserHooks } from "../../hooks/useuser.hook"
import { CircularIndeterminate } from "../../componets/loadder"

export function Bookride() {
    const [loading, setloading] = useState(true)

    const [rideData, setRideData] = useState({
        pickup_latitude: '',
        pickup_longitude: '',
        drop_latitude: '',
        drop_longitude: '',
        driver_id: '',
        vehicle_id: '',
        status: 'completed',
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userPending, bookRide } = useUserHooks()

    const driverInformation = useSelector(state => state.userlogin.rideinformation)
    const location = localStorage.getItem("location")
    const result = JSON.parse(location)

    useEffect(() => {
        if (loading) {
            const datas = localStorage.getItem("rideinformation")
            if (datas) {
                const result = JSON.parse(datas)
                dispatch(ridedata(result))
            }
            setloading(false)
        }
    }, [loading, dispatch,])

    // Update ride data with driver/vehicle info from Redux
    useEffect(() => {
        if (driverInformation?.driver_id && driverInformation?.vehicle_id) {
            setRideData(prev => ({
                ...prev,
                // pickup_latitude:result.pickup_latitude,
                // pickup_longitude:result.pickup_longitude,
                driver_id: driverInformation.driver_id,
                vehicle_id: driverInformation.vehicle_id,
            }))
        }
    }, [driverInformation])

    function handleChange(e) {
        const { name, value } = e.target
        setRideData(prev => ({
            ...prev,
            pickup_latitude:result.pickup_latitude,
                pickup_longitude:result.pickup_longitude,
            [name]: value
        }))
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await bookRide(rideData)
            console.log(response)

            localStorage.setItem("rideid", JSON.stringify(response))
            if (response) {
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
                        placeholder="Enter latitude"
                        value={result?.pickup_latitude}
                        disabled
                        required
                    />

                    <label htmlFor="pickup_longitude">Pickup Longitude</label>
                    <input
                        type="text"
                        id="pickup_longitude"
                        name="pickup_longitude"
                        placeholder="Enter longitude"
                        value={result?.pickup_longitude}
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
                        required
                    />

                    <label htmlFor="drop_longitude">Drop Longitude</label>
                    <input
                        type="text"
                        id="drop_longitude"
                        name="drop_longitude"
                        placeholder="Enter longitude"
                        value={rideData.drop_longitude}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={userPending}
                        style={{ backgroundColor: userPending ? "#9b9090" : "green" }}
                    >
                        {userPending ? <CircularIndeterminate /> : "Book ride"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
