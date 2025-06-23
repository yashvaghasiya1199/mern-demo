import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useUserHooks } from "../../../hooks/useUser";
import '../../../assets/css/userprofile.css';
import { errorToast, successToast } from "../../../componets/toast";
import { ToastContainer } from "react-toastify";
import { BlobOptions } from "buffer";

interface IUserData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    username?: string;
}

export function UserProfile() {
    const [data, setData] = useState<IUserData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        username: ''
    });
    const [update, setIsUpdate] = useState<boolean>(false);
    const { userProfile, userProfileUpdate } = useUserHooks();

    async function getUserData(): Promise<void> {
        const response = await userProfile();
        const payload = response.payload as {error: boolean, msg: IUserData};
        setData(payload.msg);
    }

    function handelChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function formSumit(e: FormEvent): Promise<void> {
        e.preventDefault();
        try {
            const response = await userProfileUpdate(data);
            const payload = response.payload as {error:boolean,msg:IUserData}
            setIsUpdate(!update);
            successToast("Profile updated successfully");
            if (payload.error) {
                errorToast(response.msg);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const firstName = data?.first_name?.split('');
    const lastName = data?.last_name?.split('');

    useEffect(() => {
        getUserData();
    }, []);

    return <>
        {
            update ? <div className="location-form-container">
                <form className="location-form" onSubmit={formSumit}>
                    <h2>Update Profile</h2>

                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        onChange={handelChange}
                        placeholder="Enter First Name"
                        required
                    />

                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        onChange={handelChange}
                        placeholder="Enter Last Name"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handelChange}
                        placeholder="Enter Email"
                        required
                    />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handelChange}
                        placeholder="Enter Phone Number"
                        required
                    />

                    <div className="updatevheclebuttton">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsUpdate(!update)}>Cancel</button>
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
    </>;
}