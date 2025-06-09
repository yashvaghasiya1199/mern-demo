import { useEffect, useState } from 'react';
import '../../assets/css/driverprofile.css'
import { useDriverHooks } from '../../hooks/useDriver';
import defaultpng from '../../../src/assets/images/default.png'
import { useAuthHook } from '../../hooks/useAuth';
import { Uploadfile } from '../../componets/common/fileuploader';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function DriverProfile() {
  const [data, setData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProfileFormVisible, setProfileFormVisible] = useState(false);

  const { imageupdateDriver, profileUpdateDriver } = useDriverHooks();
  const { driverMe } = useAuthHook()

  const fetchDriverData = async () => {
    try {
      const driver = await driverMe();
      setData(driver.driverData);
    } catch (error) {
      console.log('Fetch error:', error);
      setData(null);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert('Please select an image');
      return;
    }
   setImageFile(null)
    setLoading(true);
    const formData = new FormData();
    formData.append('profileimage', imageFile);

    try {
      const response = await imageupdateDriver(formData);
      console.log('Upload success:', response);
      await fetchDriverData();
    } catch (error) {
      console.log('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProfileForm = () => setProfileFormVisible(!isProfileFormVisible);

  const profileImage = data?.profile_image || defaultpng;

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function formSumbit(e) {
    e.preventDefault()
    try {
      const response = await profileUpdateDriver(data)
      console.log(response);
      setProfileFormVisible(false)

    } catch (error) {
      console.log(error);
      setProfileFormVisible(false)
    }
  }



  useEffect(() => {
    fetchDriverData();
  }, []);

  return (
    <>

      {data ? (

        <div className="profile-container">
          <h2 className="profile-title">🚗 Driver Profile</h2>

          <div className="driver-card">
            <img src={profileImage} alt="Driver Profile" className="driver-image" />
            <div className="driver-info">
              <h2>{data.first_name} {data.last_name}</h2>
              <p><strong>Username:</strong> {data.username}</p>
              <p><strong>Email:</strong> {data.email}</p>
            </div>
          </div>


          {isProfileFormVisible && (
            <div className="location-form-container">
              <form className="location-form" onSubmit={formSumbit}>
                <h2>Update Profile</h2>

                <label htmlFor="vehicleType">first name</label>
                <input
                  type="text"
                  id="vehicleType"
                  name="first_name"
                  placeholder="Car or Bike"
                  value={data.first_name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="model">last name</label>
                <input
                  type="text"
                  id="model"
                  name="last_name"
                  placeholder="Enter Model"
                  value={data.last_name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="registration_number">email</label>
                <input
                  type="text"
                  id="registration_number"
                  name="email"
                  placeholder="Registration Number"
                  value={data.email}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="color">phone number</label>
                <input
                  type="text"
                  id="color"
                  name="phone"
                  placeholder="Enter Color"
                  value={data.phone}
                  onChange={handleChange}
                  required
                />

                <div className="updatevheclebuttton">
                  <button type="submit" >Save</button>
                  <button type="button" onClick={toggleProfileForm}>Cancel</button>
                </div>
              </form>
            </div>
          )}
          
         {!isProfileFormVisible && <div className="edit-profile">
            <label htmlFor="updateimage" className="upload-label">
              Update Profile Image
            </label>
            <Uploadfile setimage={setImageFile} />
            <button
              className="update-button"
              onClick={handleImageUpload}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button className="update-button" onClick={toggleProfileForm}>
              {isProfileFormVisible ? 'Close Update Form' : 'Edit Profile'}
            </button>
          </div>}

        </div >
      ) : (
        <h2>Loading...</h2>
      )
      }

    </>
  );

}