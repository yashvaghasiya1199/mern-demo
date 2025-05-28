import { useEffect, useState } from "react"
import { api } from "../../axios/axios"
import { errorToast, successToast } from "../../componets/toast"
import { ToastContainer } from "react-toastify"
import '../../componets/css/driveradmin.css'

export function DriverVehicle() {

    const [vehicle, setVehicle] = useState({
        type: "",
        model: "",
        registration_number: "",
        color: ""
    })
    const [updateVehicals, setUpdateVehicle] = useState(false)
    const [getVehicle, setGetVehicle] = useState([])
    const [previousData, setPreviousdata] = useState()

    function handelChange(e) {
        const { name, value } = e.target
        setVehicle((prev) => ({
            ...prev,
            [name]: value
        }))
        setPreviousdata((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    async function getVehicleData() {
        let responce = await api.get("/api/vehicle/alldata", {
            withCredentials: true
        })
        const result = responce.data
        if (result.error) {
            return errorToast(result.msg)
        }
        setGetVehicle(result.driver.Vehicles)
    }

    async function handelSubmit(e) {
        e.preventDefault()
        setVehicle({
            type: "",
            model: "",
            registration_number: "",
            color: ""
        })

        const responce = await api.post('/api/vehicle/addvehicle', vehicle, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(responce.data);
        const result = responce.data

        if (result.error) {
            return errorToast(result.msg)
        }
        if (!result.error) {
            successToast(result.msg)
        }
        getVehicleData()
    }

    async function deleteVehicle(id) {
        const responce = await api.delete(`/api/vehicle/delete/${id}`, {
            withCredentials: true
        })
        console.log(responce);
        setGetVehicle((prev) => prev.filter((val, ind) => val.vehicle_id !== id))

    }

    async function updateVehical(data) {
        setUpdateVehicle(true)
        setPreviousdata(data)
        console.log(previousData);



    }

    async function updateSubmit(e){
        e.preventDefault() 
        const responce = await api.put(`/api/vehicle/updatevehicle/${previousData.vehicle_id}`, previousData,{
            withCredentials: true
        })
        console.log(responce);
        getVehicleData()
    }

    useEffect(() => {
        getVehicleData()
    }, [])

    return <> <h2 className="text-center" >driver vehicle Information</h2>

        {
            updateVehicals ? <div>
                <div className="location-form-container">
                    <form className="location-form" onSubmit={updateSubmit} >
                        <h2  >Update vehicle</h2>

                        <label htmlFor="vehicleType">vehicle Type</label>
                        <input
                            type="text"
                            id="vehicleType"
                            name="type"
                            placeholder="Car or Bike"
                            value={previousData.type}
                            onChange={handelChange}
                            required
                        />

                        <label htmlFor="model">Vehicle model</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            placeholder="Enter Model"
                            value={previousData.model}
                            onChange={handelChange}
                            required
                        />

                        <label htmlFor="registration_number">registration_number </label>
                        <input
                            type="text"
                            id="registration_number"
                            name="registration_number"
                            placeholder="registration number"
                            value={previousData.registration_number}
                            onChange={handelChange}
                            required
                        />
                        <label htmlFor="color">Vehicle Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            placeholder="Enter color"
                            value={previousData.color}
                            onChange={handelChange}
                            required
                        />
                        <button type="submit">Update vehicles</button>
                    </form>


                </div>
            </div> : <div className="location-form-container">
                <form className="location-form" onSubmit={handelSubmit} >
                    <h2  >Add vehicle</h2>

                    <label htmlFor="vehicleType">vehicleT ype</label>
                    <input
                        type="text"
                        id="vehicleType"
                        name="type"
                        placeholder="Car or Bike"
                        value={vehicle.type}
                        onChange={handelChange}
                        required
                    />

                    <label htmlFor="model">Vehicle model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Enter Model"
                        value={vehicle.model}
                        onChange={handelChange}
                        required
                    />

                    <label htmlFor="registration_number">registration_number </label>
                    <input
                        type="text"
                        id="registration_number"
                        name="registration_number"
                        placeholder="registration number"
                        value={vehicle.registration_number}
                        onChange={handelChange}
                        required
                    />
                    <label htmlFor="color">Vehicle Color</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        placeholder="Enter color"
                        value={vehicle.color}
                        onChange={handelChange}
                        required
                    />
                    <button type="submit">Submit Vehicle</button>
                </form>


            </div>
        }
        <div className="location-table">
            <table className="previosloc ">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Type</th>
                        <th>Model</th>
                        <th>Registration number</th>
                        <th>Color</th>
                        <th>Oprations</th>
                    </tr>
                </thead>
                <tbody>
                    {getVehicle.length > 0 ? (
                        getVehicle.map((c, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{c.type}</td>
                                <td>{c.model}</td>
                                <td>{c.registration_number}</td>
                                <td>{c.color}</td>
                                <td>
                                    <div><button onClick={() => deleteVehicle(c.vehicle_id)} style={{ marginLeft: "2vw" }} >delete</button><button onClick={() => updateVehical(c)} >Update</button></div>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <ToastContainer />
    </>
}
