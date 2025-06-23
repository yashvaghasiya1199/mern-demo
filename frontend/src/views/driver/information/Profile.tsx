import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import '../../../assets/css/driverprofile.css';
import { useDriverHooks } from '../../../hooks/useDriver';
import { useAuthHook } from '../../../hooks/useAuth';
import { Uploadfile } from '../../../componets/common/fileuploader';
import { styled } from '@mui/material/styles';
import { ErrorNote } from '../../../componets/common/errornote';

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

interface IData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string;
  profile_image?: string;
}

interface IErrors {
  [key: string]: string;
}

export function DriverProfile() {
  const [data, setData] = useState<IData | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isProfileFormVisible, setProfileFormVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrors>({});

  const { imageupdateDriver, profileUpdateDriver, isError, isPending, message } = useDriverHooks();
  const { driverMe } = useAuthHook();

  useEffect(() => {
    fetchDriverData();
  }, []);

  const fetchDriverData = async (): Promise<void> => {
    try {
      const driver = await driverMe();
      setData(driver.driverData);
    } catch (error) {
      console.error('Fetch error:', error);
      setData(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const validateForm = (): IErrors => {
    const newErrors: IErrors = {};
    if (!data?.first_name?.trim()) newErrors.first_name = 'First name is required';
    if (!data?.last_name?.trim()) newErrors.last_name = 'Last name is required';
    if (!data?.email?.trim()) newErrors.email = 'Email is required';
    if (!data?.phone?.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const formSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await profileUpdateDriver(data);
      console.log('Update response:', response);
      setProfileFormVisible(false);
      await fetchDriverData(); // Refresh data
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleImageUpload = async (): Promise<void> => {
    if (!imageFile) return alert('Please select an image');
    setLoading(true);

    const formData = new FormData();
    formData.append('profileimage', imageFile);

    try {
      await imageupdateDriver(formData);
      await fetchDriverData();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProfileForm = (): void => setProfileFormVisible((prev) => !prev);

  const profileImage = data?.profile_image ;

  const renderInput = (
    label: string,
    name: keyof IData,
    placeholder: string,
    type: string = 'text'
  ) => (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={data?.[name] || ''}
        onChange={handleChange}
        style={{
          borderColor: errors[name] ? 'red' : undefined,
        }}
      />
      {errors[name] && <p style={{ color: 'red' }}>{errors[name]}</p>}
    </>
  );

  if (!data) return <h2>Loading...</h2>;

  return (
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

      {isProfileFormVisible ? (
        <div className="location-form-container">
          <form className="location-form" onSubmit={formSubmit}>
            <h2>Update Profile</h2>
            {renderInput('First Name', 'first_name', 'Enter your first name')}
            {renderInput('Last Name', 'last_name', 'Enter your last name')}
            {renderInput('Email', 'email', 'Enter your email')}
            {renderInput('Phone Number', 'phone', 'Enter your phone number')}

            <div className="updatevheclebuttton">
              <button type="submit">Save</button>
              <button type="button" onClick={toggleProfileForm}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="edit-profile">
          {isError && <ErrorNote data={message.msg} />}
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
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

