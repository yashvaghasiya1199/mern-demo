    // import { Uploader, Button } from 'rsuite';

    // export const Uploadfile = () => (
    //   <>
    //     <Uploader listType="picture-text" action="//jsonplaceholder.typicode.com/posts/">
    //       <Button>Select files...</Button>
    //     </Uploader>
    //   </>
    // );

// import { Uploader, Message, Loader, useToaster } from 'rsuite';
// import AvatarIcon from '@rsuite/icons/legacy/Avatar';
// import React from 'react';

// function previewFile(file, callback) {
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     callback(reader.result);
//   };
//   reader.readAsDataURL(file);
// }

// export const Uploadfile = ({setimage}) => {
//   const toaster = useToaster();
//   const [uploading, setUploading] = React.useState(false);
//   const [fileInfo, setFileInfo] = React.useState(null);

//   return (
//     <Uploader
//       onChange={(e)=>setimage(e.target.file[0])}
//       fileListVisible={false}
//       listType="picture"
//       action="//jsonplaceholder.typicode.com/posts/"
//       onUpload={file => {
//         setUploading(true);
//         previewFile(file.blobFile, value => {
//           setFileInfo(value);
//         });
//       }}
//       onSuccess={(response, file) => {
//         setUploading(false);
//         toaster.push(<Message type="success">Uploaded successfully</Message>);
//         console.log(response);
//       }}
//       onError={() => {
//         setFileInfo(null);
//         setUploading(false);
//         toaster.push(<Message type="error">Upload failed</Message>);
//       }}
//     >
//       <button style={{ width: 150, height: 150 }}>
//         {uploading && <Loader backdrop center />}
//         {fileInfo ? (
//           <img src={fileInfo} width="100%" height="100%" />
//         ) : (
//           <AvatarIcon style={{ fontSize: 80 }} />
//         )}
//       </button>
//     </Uploader>
//   );
// // };
// import { Uploader, Message, Loader, useToaster, Button } from 'rsuite';
// import AvatarIcon from '@rsuite/icons/legacy/Avatar';
// import React from 'react';
// import '../../assets/css/driverprofile.css'

// function previewFile(file, callback) {
//   const reader = new FileReader();
//   reader.onloadend = () => callback(reader.result);
//   reader.readAsDataURL(file);
// }

// export const Uploadfile = ({ setimage }) => {
//   const toaster = useToaster();
//   const [uploading, setUploading] = React.useState(false);
//   const [fileInfo, setFileInfo] = React.useState(null);

//   return (
//     <div className="upload-container">
//       {/* <Uploader
//         fileListVisible={false}
//         listType="picture"
//         action="//jsonplaceholder.typicode.com/posts/"
//         autoUpload={true}
//         onUpload={(file) => {
//           setUploading(true);
//           previewFile(file.blobFile, (value) => {
//             setFileInfo(value);
//             setimage(file.blobFile);
//           });
//         }}
//         onSuccess={() => {
//           setUploading(false);
//           toaster.push(<Message type="success">Uploaded successfully</Message>, { placement: 'topEnd' });
//         }}
//         onError={() => {
//           setUploading(false);
//           setFileInfo(null);
//           toaster.push(<Message type="error">Upload failed</Message>, { placement: 'topEnd' });
//         }}
//       > */}
//         <div className="image-preview-box">
//           {uploading && <Loader backdrop content="Uploading..." vertical />}
//           {fileInfo ? (
//             <img src={fileInfo} alt="preview" className="square-preview" />
//           ) : (
//             <AvatarIcon className="upload-icon" />
//           )}
//         </div>
//       {/* </Uploader> */}

//       {/* <Button className="select-file-button" appearance="primary">
//         Select File
//       </Button> */}
//     </div>
//   );
// };

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
