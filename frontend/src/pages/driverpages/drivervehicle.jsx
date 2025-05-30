import { useEffect, useState } from "react"
import { errorToast, successToast } from "../../componets/toast"
import { ToastContainer } from "react-toastify"
import '../../componets/css/driveradmin.css'
import { DriverHooks } from "../../componets/hooks/driver.hook"


export function DriverVehicle() {

    const [vehicle, setVehicle] = useState({
        type: "",
        model: "",
        registration_number: "",
        color: ""
    })

    const { driverGetVehicles, driverAddVehicles ,driverDeleteVehicles, driverUpdateVehicles } = DriverHooks()

    const [updateVehicals, setUpdateVehicle] = useState(false)
    const [getVehicle, setGetVehicle] = useState([])
    const [previousData, setPreviousdata] = useState()

    function handelChange(e) {
        const { name, value } = e.target
        setVehicle((prev) => ({
            ...prev,
            [name]: value
        }))
        setPreviousdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function getVehicleData() {

        try {
            const response = await driverGetVehicles()
            setGetVehicle(response.driver.Vehicles)
        } catch (error) {
            errorToast(error.msg)
        }

    }

    async function handelSubmit(e) {
        e.preventDefault()
        setVehicle({
            type: "",
            model: "",
            registration_number: "",
            color: ""
        })

        try {
            const response = await driverAddVehicles(vehicle)
            console.log(response);
            
            if (!response.error) {
                successToast(response.msg)
            }
        } catch (error) {
            errorToast(error.msg)
        }
        getVehicleData()
    }

    async function deleteVehicle(id) {
        
       try {
        const response = await driverDeleteVehicles(id)
        setGetVehicle((prev) => prev.filter((val, ind) => val.vehicle_id !== id))
       } catch (error) {
        errorToast("not deleted")
       }

    }

    async function updateVehical(data) {
        setUpdateVehicle(true)
        setPreviousdata(data)
    }


    async function updateSubmit(e) {
        e.preventDefault();
        try {
            const response = await driverUpdateVehicles(previousData.vehicle_id, previousData);
            console.log(response);
            setUpdateVehicle(false)
            empty()         
            successToast("vehicle updatae succesfully")
            getVehicleData();
        } catch (error) {
            console.error("Update failed:", error);
        }
    }

    function empty(){
        setVehicle({
            vehicle:'',
            registration_number: "",
            model:'',
            color:''   
          })
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
                        <div className="updatevheclebuttton" >
                        <button type="submit">Update vehicles</button>
                        <button type="submit" onClick={()=>setUpdateVehicle(false)}>cancel</button>
                        </div>
                    </form>


                </div>
            </div> : <div className="location-form-container">
                <form className="location-form" onSubmit={handelSubmit} >
                    <h2  >Add vehicle</h2>

                    <label htmlFor="vehicleType">vehicle Type</label>
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
