import { useState } from "react"
import { api } from "../../axios/axios"
import { useDispatch } from "react-redux"
import { ridedata } from "../../store/redusers/userauth.reduser"
import { useNavigate } from "react-router-dom"
import { errorToast } from "../../componets/toast"
import { ToastContainer } from "react-toastify"

export function FindRide() {

  const [data, setData] = useState({
    pickup_latitude: "",
    pickup_longitude: ""
  })
  const [nearRide, setNearRide] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function formHandel(e) {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function formSumbit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/api/ride/findride', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setNearRide(response.data.drivers);
    } catch (error) {
      if (error.response) {
        // console.error("Error response from server:", error.response.data.errors[0]);
        errorToast(error.response.data.errors[0])
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred");
      }
    }
  }


  function ridebook(e) {
    // dispatch(ridedata(e))
    localStorage.setItem('rideinformation', JSON.stringify(e))
    navigate('/bookride')
  }


  return <>
    <h2 className="text-center" >Find near ride</h2>
    <div className="location-form-container">
      <form className="location-form" onSubmit={formSumbit} >
        <h2>Find Ride</h2>

        <label htmlFor="longitude">pickup_latitude</label>
        <input
          type="text"
          id="longitude"
          name="pickup_latitude"
          value={data.pickup_latitude}
          onChange={formHandel}
          placeholder="Enter longitude"
          required
        />

        <label htmlFor="latitude">pickup_longitude</label>
        <input
          type="text"
          id="latitude"
          name="pickup_longitude"
          placeholder="Enter latitude"
          onChange={formHandel}
          value={data.pickup_longitude}
          required
        />

        <button type="submit">Submit Location</button>
      </form>

    </div>
    <h2 className="text-center" >Choose driver and Car</h2>
    <div className="location-table">
      <table className="previosloc " style={{ color: "black" }} >
        <thead>
          <tr>
            <th>No</th>
            <th>Driver name</th>
            <th>type</th>
            <th>model</th>
            <th>phoneno</th>
            <th>Book Ride</th>
          </tr>
        </thead>
        <tbody>
          {nearRide.length > 0 ? (
            nearRide.flatMap((driverItem, i) =>
              (driverItem.Driver?.Vehicles || []).map((vehicle, vi) => (
                <tr key={`${i}-${vi}`}>
                  <td>{`${i + 1}.${vi + 1}`}</td>
                  <td>{`${driverItem.Driver.first_name} ${driverItem.Driver.last_name}`}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.model}</td>
                  <td>{driverItem.Driver.phone}</td>
                  <td>
                    <button onClick={() => ridebook(vehicle)}>
                      Book
                    </button>
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No nearby rides found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  </>
}