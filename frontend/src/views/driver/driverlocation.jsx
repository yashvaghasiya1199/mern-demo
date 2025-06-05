import { useEffect, useState } from "react";
import '../../assets/css/driveradmin.css'
import { errorToast, successToast } from "../../componets/toast";
import { ToastContainer } from "react-toastify";
import { useDriverHooks } from "../../hooks/driver.hook";
import { CircularIndeterminate } from "../../componets/loadder";
import { MdDelete } from "react-icons/md";
// import { driverDeleteLocationAction } from "../../store/actions"
export function DriverLocation(){

    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [location, setLocation] = useState([])
  
    const { isPending,locationDriver,getDriverLocation ,deleteDriverLocation } = useDriverHooks()
  
    async function getLocations() {
      const getLocation = await getDriverLocation()
      console.log("data",getLocation );
      setLocation(getLocation.driver.driverlocations)
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
  
  
        const response = await locationDriver({ longitude, latitude })
        console.log(response);
  
        getLocations()
        if (!response.err) {
          successToast(response.msg)
          setLongitude('');
          setLatitude('');
        }
        if (response.err) {
          errorToast(response.msg)
        }
      } catch (error) {
        console.error("Error submitting location:", error);
        alert("Something went wrong.");
      }
    };
  
    async function deleteLocation(id) {
      const response = await deleteDriverLocation(id)
      console.log(response);
      setLocation((prev) => prev.filter((val, ind) => val.location_id !== id))
  
    }
  
    useEffect(() => {
      getLocations()
    }, [])

    return<>
     <div className="location-main">
      <div className="location-form-container">
        <form className="location-form" onSubmit={handleSubmit}>
          <h2>Driver Location</h2>

          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
            required
          />

          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
            required
          />

           <button
                    type="submit"
                    disabled={isPending}
                    style={{ backgroundColor: `${isPending ? "#9b9090" : "green"}` }}
                  >
                    {isPending ? <CircularIndeterminate /> : "Add Location"}
                  </button>
        </form>

      </div>
      <h2 className="text-center">Previous Location</h2>
      <div className="location-table">
        <table className="previosloc">
          <thead>
            <tr>
              <th>No</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Date</th>
              <th>Oprations</th>
            </tr>
          </thead>
          <tbody>
            {location.length > 0 ? (
              location.map((c, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{c.latitude}</td>
                  <td>{c.longitude}</td>
                  <td>{c.createdAt.slice(0, c.createdAt.indexOf('T'))} {c.createdAt.slice(c.createdAt + 1, c.createdAt + 9)}</td>
                  {/* <td><div><button onClick={() => deleteLocation(c.location_id)} ><MdDelete /></button></div></td> */}
                  <td className="tbl-delete-btn" onClick={() => deleteLocation(c.location_id)}  ><MdDelete  color="red" fontSize='25px' /></td>
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
    </div>
    </>
}