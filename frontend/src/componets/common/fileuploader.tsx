

import React, { useState } from 'react';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import '../../assets/css/driverprofile.css';

export const Uploadfile = ({ setimage }) => {
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; 
    setimage(file);

    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-container">
      <div className="image-preview-box">
        {filePreview ? (
          <img src={filePreview} alt="preview" className="square-preview" />
        ) : (
          <AvatarIcon className="upload-icon" />
        )}
      </div>

 
      <input
        type="file"
        id="file-upload"
        className="upload-input"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
