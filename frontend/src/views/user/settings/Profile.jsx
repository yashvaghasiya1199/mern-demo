import { useEffect, useState } from "react";
import { useUserHooks } from "../../../hooks/useUser";
import '../../../assets/css/userprofile.css'
import { errorToast, successToast } from "../../../componets/toast";
import { ToastContainer } from "react-toastify";

export function UserProfile() {

    const [data, setData] = useState([])
    const [update, setIsUpdate] = useState(false)
    const { userProfile, userProfileUpdate } = useUserHooks()

    async function getUserData() {
        const data = await userProfile()
        setData(data.payload.msg)
    }

    function handelChange(e) {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function formSumit(e) {
        e.preventDefault()
        try {
            const response = await userProfileUpdate(data)
            setIsUpdate(!update)
            successToast("profile update succesfully")
            if (response.payload.error) {
                errorToast(response.msg)
            }

        } catch (error) {
            console.log(error);

        }
    }
    const firstName = data?.first_name?.split('')
    const lastName = data?.last_name?.split('')
  

    useEffect(() => {
        getUserData()
    }, [])

    return <>
        {
            update ? <div className="location-form-container">
                <form className="location-form" onSubmit={formSumit} >
                    <h2>Update Profile</h2>

                    <label htmlFor="vehicleType">first name</label>
                    <input
                        type="text"
                        id="vehicleType"
                        name="first_name"
                        value={data.first_name}
                        onChange={handelChange}
                        placeholder="Car or Bike"
                        required
                    />

                    <label htmlFor="model">last name</label>
                    <input
                        type="text"
                        id="model"
                        name="last_name"
                        value={data.last_name}
                        onChange={handelChange}
                        placeholder="Enter Model"
                        required
                    />

                    <label htmlFor="registration_number">email</label>
                    <input
                        type="text"
                        id="registration_number"
                        name="email"
                        value={data.email}
                        onChange={handelChange}
                        placeholder="Registration Number"
                        required
                    />

                    <label htmlFor="color">phone number</label>
                    <input
                        type="text"
                        id="color"
                        name="phone"
                        value={data.phone}
                        onChange={handelChange}
                        placeholder="Enter Color"
                        required
                    />

                    <div className="updatevheclebuttton">
                        <button type="submit"  >Save</button>
                        <button type="button" onClick={() => setIsUpdate(!update)} >Cancel</button>
                    </div>
                </form>
            </div> :
                <div className="user-profile-card">
                    <div className="profile-header">
                        <div className="avatar-placeholder">
                            {data && firstName}
                        </div>
                        <div className="profile-info">
                            <h1>{data.first_name} {data.last_name}</h1>
                            <p>@{data.username}</p>
                        </div>
                    </div>
                    <div className="profile-details">
                        <h2>Email: <span>{data.email}</span></h2>
                        <h2>Phone: <span>{data.phone}</span></h2>
                        <button className="btn-edit" onClick={() => setIsUpdate(!update)}>Edit Profile</button>
                    </div>
                </div>

        }
        <ToastContainer />

    </>


}