

import { useState } from "react"
import { api } from "../../axios/axios"

export function BookRide() {

    const [data, setData] = useState({
        pickup_latitude: "",
        pickup_longitude: ""
    })
     const[nearRide,setNearRide] = useState([])

    function formHandel(e) {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function formSumbit(e) {
        e.preventDefault()
   
        const responce = await api.post('/api/ride/findride', data , {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            },
          });
          setNearRide(responce.data.drivers)

        console.log(responce.data);


    }

    return <>
        <h2 className="text-center" >booking ride</h2>
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
            <table className="previosloc "style={{color:"black"}} > 
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
            <button onClick={() => console.log("Book ride with", vehicle.vehicle_id)}>
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
        </div>
    </>
}