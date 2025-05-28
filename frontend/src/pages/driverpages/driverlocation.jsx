import { useEffect, useState } from "react";
import '../../componets/css/driveradmin.css';
import { api } from "../../axios/axios";
import { errorToast, successToast } from "../../componets/toast";
import { ToastContainer } from "react-toastify";

export function DriverLocation() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [location, setLocation] = useState([])

  async function getLocations() {
    const getLocation = await api.get('/api/driver/alllocation', {
      withCredentials: true
    });
    // console.log("data", getLocation.data.driver.driverlocations);
    setLocation(getLocation.data.driver.driverlocations)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can replace the URL with your actual API endpoint
    try {

      const response = await api.post('/api/driver/addlocation', { latitude, longitude }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      })
      getLocations()
      const result = response.data
      if (!result.err) {
        successToast(result.msg)
        setLongitude('');
        setLatitude('');
      }
      if (result.err) {
        errorToast(result.msg)
      }
    } catch (error) {
      console.error("Error submitting location:", error);
      alert("Something went wrong.");
    }
  };

  async function deleteLocation(id){
    let responce = await api.delete(`/api/driver/delete/location/${id}`,{
      withCredentials:true
    })
    console.log(responce);
    setLocation((prev)=> prev.filter((val,ind)=>val.location_id !== id))
    
  }

  useEffect(() => {
    getLocations()
  }, [])
  return (
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

          <button type="submit">Submit Location</button>
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
                  <td><div><button onClick={()=>deleteLocation(c.location_id)} >delete</button></div></td>
                  {/* isoDate.slice(tIndex + 1, tIndex + 9); */}
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
  );
}
