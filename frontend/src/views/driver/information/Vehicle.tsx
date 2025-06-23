import React, { useEffect, useState } from "react"
import { errorToast, successToast } from "../../../componets/toast"
import { ToastContainer } from "react-toastify"
import '../../../assets/css/driveradmin.css'
import { useDriverHooks } from "../../../hooks/useDriver"
import { CircularIndeterminate } from "../../../componets/loadder"
import { MdDelete, MdEditSquare } from "react-icons/md"
import { ErrorNote } from "../../../componets/common/errornote"
import { useVehicle } from "../../../hooks/useVehicle.hook"

interface IVehicle {
  type: string;
  model: string;
  registration_number: string; // Changed String to string for consistency
  color: string;
  vehicle_id?: string; // Added optional vehicle_id for update and delete operations
}

interface IError {
  [key: string]: string;
}

export function DriverVehical() {
  const [vehicle, setVehicle] = useState<IVehicle>({
    type: "",
    model: "",
    registration_number: "",
    color: ""
  });

  const [errors, setErrors] = useState<IError>({});
  const [updateErrors, setUpdateErrors] = useState<IError>({});
  const [getVehicle, setGetVehicle] = useState<IVehicle[]>([]);
  const [updateVehicals, setUpdateVehicle] = useState(false);
  const [previousData, setPreviousdata] = useState<Partial<IVehicle>>({
    type: "",
    model: "",
    registration_number: "",
    color: ""
  });

  
  const {isError,isPending,message,getDriverVehicle,addVehicle,deleteVehicle,updateVehicle}=useVehicle()
  const { clearData } = useDriverHooks();

  function handelChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    if (updateVehicals) {
      setPreviousdata((prev) => ({ ...prev, [name]: value }));
      setUpdateErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setVehicle((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  const validate = (data: IVehicle): IError => {
    const newErrors: IError = {};
    if (!data.type.trim()) newErrors.type = "Vehicle type is required";
    if (!data.model.trim()) newErrors.model = "Vehicle model is required";
    if (!data.registration_number.trim()) newErrors.registration_number = "Registration number is required";
    if (!data.color.trim()) newErrors.color = "Vehicle color is required";
    return newErrors;
  };

  async function getVehicleData(): Promise<void> {
    try {
      const response = await getDriverVehicle();
      const payload = response.payload as { driver: { Vehicles: IVehicle[] } };
      setGetVehicle(payload.driver.Vehicles || []);
    } catch (error) {
      errorToast("Failed to fetch vehicles");
    }
  }

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
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

  async function deleteVehicles(id: string): Promise<void> {
    try {
      await deleteVehicle(id);
      setGetVehicle((prev) => prev.filter((v) => v.vehicle_id !== id));
    } catch (error) {
      errorToast("Failed to delete vehicle");
    }
  }

  function updateVehical(data: IVehicle): void {
    setUpdateVehicle(true);
    setPreviousdata(data);
  }

  async function updateSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const newErrors = validate(previousData as IVehicle);
    if (Object.keys(newErrors).length > 0) {
      setUpdateErrors(newErrors);
      return;
    }

    try {
      await updateVehicle(previousData.vehicle_id!, previousData); // Added non-null assertion for vehicle_id
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
            {isError && <ErrorNote data={message?.msg || message} />}

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
            {isError && <ErrorNote data={message?.msg || message} />}

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
                        onClick={() => c.vehicle_id && deleteVehicles(c.vehicle_id)}
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
                <td colSpan={6} className="text-center">
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
