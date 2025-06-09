import { useEffect, useState } from "react"
import { errorToast, successToast } from "../../componets/toast"
import { ToastContainer } from "react-toastify"
import '../../assets/css/driveradmin.css'
import { useDriverHooks } from "../../hooks/useDriver"
import { CircularIndeterminate } from "../../componets/loadder"
import { MdDelete, MdEditSquare } from "react-icons/md"
import { ErrorNote } from "../../componets/common/errornote"


// export function DriverVehical() {
//     const [vehicle, setVehicle] = useState({
//         type: "",
//         model: "",
//         registration_number: "",
//         color: ""
//     })

//     const { isPending,getDriverVehicle, addVehicle, deleteVehicle, updateVehicle,isError,message } = useDriverHooks()
//     const {clearData} = useDriverHooks()

//     const [updateVehicals, setUpdateVehicle] = useState(false)
//     const [getVehicle, setGetVehicle] = useState([])
//     const [previousData, setPreviousdata] = useState()

//     function handelChange(e) {
//         const { name, value } = e.target
//         setVehicle((prev) => ({
//             ...prev,
//             [name]: value
//         }))
//         setPreviousdata((prev) => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     async function getVehicleData() {

//         try {
//             const response = await getDriverVehicle()
//             setGetVehicle(response.payload.driver.Vehicles)
          
//         } catch (error) {
//             errorToast(error.msg)
//         }

//     }

//     async function handelSubmit(e) {
//         e.preventDefault()
//         setVehicle({
//             type: "",
//             model: "",
//             registration_number: "",
//             color: ""
//         })

//         try {
//             const response = await addVehicle(vehicle)
//             console.log(response);

//             if (!response.error) {
//                 successToast(response.msg)
//             }
//             if(response.error){
//                 errorToast(response.msg)    
//             }
//         } catch (error) {
//             errorToast(error.msg)
//         }
//         getVehicleData()
//     }

//     async function deleteVehicles(id) {

//         try {
//             const response = await deleteVehicle(id)
//             setGetVehicle((prev) => prev.filter((val, ind) => val.vehicle_id !== id))
//         } catch (error) {
//             errorToast("not deleted")
//         }

//     }

//     async function updateVehical(data) {
//         setUpdateVehicle(true)
//         setPreviousdata(data)
//     }


//     async function updateSubmit(e) {
//         e.preventDefault();
//         try {
//             const response = await updateVehicle(previousData.vehicle_id, previousData);
//             console.log(response);
//             setUpdateVehicle(false)
//             empty()
//             successToast("vehicle updatae succesfully")
//             getVehicleData();
//         } catch (error) {
//             console.error("Update failed:", error);
//         }
//     }

//     function empty() {
//         setVehicle({
//             vehicle: '',
//             registration_number: "",
//             model: '',
//             color: ''
//         })
//     }


//     useEffect(() => {
//         getVehicleData()
//         return()=>{
//             clearData()
//         }
//     }, [])

//     return <>

//         <h2 className="text-center" >driver vehicle Information</h2>

//         {
//             updateVehicals ? <div>
//                 <div className="location-form-container">
//                     <form className="location-form" onSubmit={updateSubmit} >
//                         <h2  >Update vehicle</h2>
//                         {isError && <ErrorNote />}
//                         <label htmlFor="vehicleType">vehicle Type</label>
//                         <input
//                             type="text"
//                             id="vehicleType"
//                             name="type"
//                             placeholder="Car or Bike"
//                             value={previousData.type}
//                             onChange={handelChange}
//                             required
//                         />

//                         <label htmlFor="model">Vehicle model</label>
//                         <input
//                             type="text"
//                             id="model"
//                             name="model"
//                             placeholder="Enter Model"
//                             value={previousData.model}
//                             onChange={handelChange}
//                             required
//                         />

//                         <label htmlFor="registration_number">registration_number </label>
//                         <input
//                             type="text"
//                             id="registration_number"
//                             name="registration_number"
//                             placeholder="registration number"
//                             value={previousData.registration_number}
//                             onChange={handelChange}
//                             required
//                         />
//                         <label htmlFor="color">Vehicle Color</label>
//                         <input
//                             type="text"
//                             id="color"
//                             name="color"
//                             placeholder="Enter color"
//                             value={previousData.color}
//                             onChange={handelChange}
//                             required
//                         />
//                         <div className="updatevheclebuttton" >
//                             <button type="submit">Update vehicles</button>
//                             <button type="submit" onClick={() => setUpdateVehicle(false)}>cancel</button>
//                         </div>
//                     </form>


//                 </div>
//             </div>
//              : <div className="location-form-container">
//                 <form className="location-form" onSubmit={handelSubmit} >
//                     <h2  >Add vehicle</h2>
//                     {isError && <ErrorNote data={message.msg} />}
//                     <label htmlFor="vehicleType">vehicle Type</label>
//                     <input
//                         type="text"
//                         id="vehicleType"
//                         name="type"
//                         placeholder="Car or Bike"
//                         value={vehicle.type}
//                         onChange={handelChange}
//                         required
//                     />

//                     <label htmlFor="model">Vehicle model</label>
//                     <input
//                         type="text"
//                         id="model"
//                         name="model"
//                         placeholder="Enter Model"
//                         value={vehicle.model}
//                         onChange={handelChange}
//                         required
//                     />

//                     <label htmlFor="registration_number">registration_number </label>
//                     <input
//                         type="text"
//                         id="registration_number"
//                         name="registration_number"
//                         placeholder="registration number"
//                         value={vehicle.registration_number}
//                         onChange={handelChange}
//                         required
//                     />
//                     <label htmlFor="color">Vehicle Color</label>
//                     <input
//                         type="text"
//                         id="color"
//                         name="color"
//                         placeholder="Enter color"
//                         value={vehicle.color}
//                         onChange={handelChange}
//                         required
//                     />
//                      <button
//                              type="submit"
//                              disabled={isPending}
//                              style={{ backgroundColor: `${isPending ? "#9b9090" : "green"}` }}
//                            >
//                              {isPending ? <CircularIndeterminate /> : "Add vehicle"}
//                            </button>
//                 </form>


//             </div>
//         }
//         <div className="location-table">
//             <table className="previosloc ">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Type</th>
//                         <th>Model</th>
//                         <th>Registration number</th>
//                         <th>Color</th>
//                         <th>Oprations</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {getVehicle.length > 0 ? (
//                         getVehicle.map((c, i) => (
//                             <tr key={i}>
//                                 <td>{i + 1}</td>
//                                 <td>{c.type}</td>
//                                 <td>{c.model}</td>
//                                 <td>{c.registration_number}</td>
//                                 <td>{c.color}</td>
//                                 <td>
//                                     <div><span  className="tbl-delete-btn" ><MdDelete onClick={() => deleteVehicles(c.vehicle_id)}  color="lightred" fontSize='25px' /><MdEditSquare onClick={() => updateVehical(c)} color="lightblue" fontSize='25px' /></span></div>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4" className="text-center">
//                                 Loading...
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>

//         <ToastContainer />
//     </>

// }


export function DriverVehical() {
  const [vehicle, setVehicle] = useState({
    type: "",
    model: "",
    registration_number: "",
    color: ""
  });

  const [errors, setErrors] = useState({});
  const [updateErrors, setUpdateErrors] = useState({});
  const [getVehicle, setGetVehicle] = useState([]);
  const [updateVehicals, setUpdateVehicle] = useState(false);
  const [previousData, setPreviousdata] = useState({});

  const { isPending, getDriverVehicle, addVehicle, deleteVehicle, updateVehicle, isError, message } = useDriverHooks();
  const { clearData } = useDriverHooks();

  function handelChange(e) {
    const { name, value } = e.target;
    if (updateVehicals) {
      setPreviousdata((prev) => ({ ...prev, [name]: value }));
      setUpdateErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setVehicle((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  const validate = (data) => {
    const newErrors = {};
    if (!data.type.trim()) newErrors.type = "Vehicle type is required";
    if (!data.model.trim()) newErrors.model = "Vehicle model is required";
    if (!data.registration_number.trim()) newErrors.registration_number = "Registration number is required";
    if (!data.color.trim()) newErrors.color = "Vehicle color is required";
    return newErrors;
  };

  async function getVehicleData() {
    try {
      const response = await getDriverVehicle();
      setGetVehicle(response.payload.driver.Vehicles);
    } catch (error) {
      errorToast("Failed to fetch vehicles");
    }
  }

  async function handelSubmit(e) {
    e.preventDefault();

    const newErrors = validate(vehicle);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await addVehicle(vehicle);
      if (!response.error) {
        successToast(response.msg);
        setVehicle({ type: "", model: "", registration_number: "", color: "" });
        setErrors({});
        getVehicleData();
      } else {
        errorToast(response.msg);
      }
    } catch (error) {
      errorToast("Failed to add vehicle");
    }
  }

  async function deleteVehicles(id) {
    try {
      await deleteVehicle(id);
      setGetVehicle((prev) => prev.filter((v) => v.vehicle_id !== id));
    } catch (error) {
      errorToast("Failed to delete vehicle");
    }
  }

  function updateVehical(data) {
    setUpdateVehicle(true);
    setPreviousdata(data);
  }

  async function updateSubmit(e) {
    e.preventDefault();

    const newErrors = validate(previousData);
    if (Object.keys(newErrors).length > 0) {
      setUpdateErrors(newErrors);
      return;
    }

    try {
      await updateVehicle(previousData.vehicle_id, previousData);
      successToast("Vehicle updated successfully");
      setUpdateVehicle(false);
      getVehicleData();
      setPreviousdata({});
    } catch (error) {
      errorToast("Update failed");
    }
  }

  useEffect(() => {
    getVehicleData();
    return () => {
      clearData();
    };
  }, []);

  return (
    <>
      <h2 className="text-center">Driver Vehicle Information</h2>

      {updateVehicals ? (
        <div className="location-form-container">
          <form className="location-form" onSubmit={updateSubmit}>
            <h2>Update Vehicle</h2>
            {isError && <ErrorNote data={message?.msg || "Error occurred"} />}

            <label>Vehicle Type</label>
            <input
              type="text"
              name="type"
              placeholder="Car or Bike"
              value={previousData.type || ""}
              onChange={handelChange}
            />
            {updateErrors.type && <p className="error">{updateErrors.type}</p>}

            <label>Vehicle Model</label>
            <input
              type="text"
              name="model"
              placeholder="Enter model"
              value={previousData.model || ""}
              onChange={handelChange}
            />
            {updateErrors.model && <p className="error">{updateErrors.model}</p>}

            <label>Registration Number</label>
            <input
              type="text"
              name="registration_number"
              placeholder="Enter registration number"
              value={previousData.registration_number || ""}
              onChange={handelChange}
            />
            {updateErrors.registration_number && (
              <p className="error">{updateErrors.registration_number}</p>
            )}

            <label>Color</label>
            <input
              type="text"
              name="color"
              placeholder="Enter color"
              value={previousData.color || ""}
              onChange={handelChange}
            />
            {updateErrors.color && <p className="error">{updateErrors.color}</p>}

            <div className="updatevheclebuttton">
              <button type="submit">Update Vehicle</button>
              <button type="button" onClick={() => setUpdateVehicle(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="location-form-container">
          <form className="location-form" onSubmit={handelSubmit}>
            <h2>Add Vehicle</h2>
            {isError && <ErrorNote data={message?.msg || "Error occurred"} />}

            <label>Vehicle Type</label>
            <input
              type="text"
              name="type"
              placeholder="Car or Bike"
              value={vehicle.type}
              onChange={handelChange}
            />
            {errors.type && <p className="error">{errors.type}</p>}

            <label>Vehicle Model</label>
            <input
              type="text"
              name="model"
              placeholder="Enter model"
              value={vehicle.model}
              onChange={handelChange}
            />
            {errors.model && <p className="error">{errors.model}</p>}

            <label>Registration Number</label>
            <input
              type="text"
              name="registration_number"
              placeholder="Enter registration number"
              value={vehicle.registration_number}
              onChange={handelChange}
            />
            {errors.registration_number && (
              <p className="error">{errors.registration_number}</p>
            )}

            <label>Color</label>
            <input
              type="text"
              name="color"
              placeholder="Enter color"
              value={vehicle.color}
              onChange={handelChange}
            />
            {errors.color && <p className="error">{errors.color}</p>}

            <button
              type="submit"
              disabled={isPending}
              style={{ backgroundColor: isPending ? "#9b9090" : "green" }}
            >
              {isPending ? <CircularIndeterminate /> : "Add Vehicle"}
            </button>
          </form>
        </div>
      )}

      <div className="location-table">
        <table className="previosloc">
          <thead>
            <tr>
              <th>No</th>
              <th>Type</th>
              <th>Model</th>
              <th>Registration Number</th>
              <th>Color</th>
              <th>Operations</th>
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
                    <span className="tbl-delete-btn">
                      <MdDelete
                        onClick={() => deleteVehicles(c.vehicle_id)}
                        color="red"
                        fontSize="25px"
                      />
                      <MdEditSquare
                        onClick={() => updateVehical(c)}
                        color="blue"
                        fontSize="25px"
                      />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </>
  );
}
