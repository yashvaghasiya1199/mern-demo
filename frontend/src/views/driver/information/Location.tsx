import React, { useEffect, useState } from "react";
import '../../../assets/css/driveradmin.css'
import { errorToast, successToast } from "../../../componets/toast";
import { ToastContainer } from "react-toastify";
import { useDriverHooks } from "../../../hooks/useDriver";
import { CircularIndeterminate } from "../../../componets/loadder";
import { ErrorNote } from "../../../componets/common/errornote";
import { MdDelete } from "react-icons/md";
import { promises } from "dns";
import { BlobOptions } from "buffer";

interface ILocation {
  location_id: string;
  latitude: string;
  longitude: string;
  createdAt: string;
}   

interface IErrors{
  latitude?: string;
  longitude?: string;
}
export function DriverLocation() {
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [location, setLocation] = useState<ILocation[]>([]);

  const [errors, setErrors] = useState<IErrors>({
    latitude: "",
    longitude: "",
  });

  const {
    isPending,
    locationDriver,
    getDriverLocation,
    deleteDriverLocation,
    isError
  } = useDriverHooks();

  const getLocations = async (): Promise<void> => {
    const getLocation = await getDriverLocation();
    const payload = getLocation.payload as { error: boolean; driverlocations: ILocation[] };
    setLocation(payload.driverlocations);
  }
  

  const validate = ():boolean => {
    const newErrors: IErrors = {};
    if (!latitude.trim()) newErrors.latitude = "Latitude is required";
    if (!longitude.trim()) newErrors.longitude = "Longitude is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await locationDriver({ longitude, latitude });
      getLocations();

      if (!response.err) {
        successToast(response.msg);
        setLongitude("");
        setLatitude("");
        setErrors({});
      } else {
        errorToast(response.msg);
      }
    } catch (error) {
      console.error("Error submitting location:", error);
      errorToast("Failed to add location");
    }
  };

  const deleteLocation = async (id:string): Promise<void> => {
    await deleteDriverLocation(id);
    setLocation((prev) => prev.filter((loc) => loc.location_id !== id));
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className="location-main">
      <div className="location-form-container">
        <form className="location-form" onSubmit={handleSubmit}>
          <h2>Driver Location</h2>
          {isError && <ErrorNote data={"Failed to add location"} />}

          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={(e) => {
              setLatitude(e.target.value);
              setErrors((prev) => ({ ...prev, latitude: "" }));
            }}
            placeholder="Enter latitude"
          />
          {errors.latitude && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.latitude}</p>
          )}

          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={longitude}
            onChange={(e) => {
              setLongitude(e.target.value);
              setErrors((prev) => ({ ...prev, longitude: "" }));
            }}
            placeholder="Enter longitude"
          />
          {errors.longitude && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.longitude}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            style={{ backgroundColor: isPending ? "#9b9090" : "green" }}
          >
            {isPending ? <CircularIndeterminate /> : "Add Location"}
          </button>
        </form>
      </div>

      <h2 className="text-center">Previous Locations</h2>
      <div className="location-table">
        <table className="previosloc">
          <thead>
            <tr>
              <th>No</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Date</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {location.length > 0 ? (
              location.map((loc, i) => {
                const date = new Date(loc.createdAt);
                return (
                  <tr key={loc.location_id}>
                    <td>{i + 1}</td>
                    <td>{loc.latitude}</td>
                    <td>{loc.longitude}</td>
                    <td>
                      {date.toLocaleDateString()}{" "}
                      {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td
                      className="tbl-delete-btn"
                      onClick={() => deleteLocation(loc.location_id)}
                    >
                      <MdDelete color="red" fontSize="25px" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  {isPending ? "Loading..." : "No locations found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

