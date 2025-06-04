import { useState } from "react";
import '../../componets/css/login.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../componets/toast";
import { useDispatch } from "react-redux";
import { driverDocument } from "../../store/redusers/driver.reduser";
import { api } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

export function DriverDoument() {

    const [docType, setDocType] = useState('pancard');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handelSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('docType', docType);

        if (docType === 'pancard') {
            const panFile = e.target.pancard.files[0];
            if (panFile) {
                formData.append('pancard', panFile);
            }
        } else if (docType === 'aadharcard') {
            const front = e.target.aadharFront.files[0];
            const back = e.target.aadharBack.files[0];
            if (front) formData.append('aadharFront', front);
            if (back) formData.append('aadharBack', back);
        }

        try {

            const response = await api.post('/api/driver/adddocument', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            let result = await response.data
            console.log(response);


            if (!result.error) {
                successToast(result.msg)
                dispatch(driverDocument())
                navigate('/driveradmin')
            }
            if (result.err) {
                errorToast(result.msg)
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("An error occurred while uploading");
        }
    }
    return <>
        <div className="login-container">
            <form className="login-form" onSubmit={handelSubmit}>
                <label>Document Type</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="docType"
                            value="pancard"
                            checked={docType === 'pancard'}
                            onChange={(e) => setDocType(e.target.value)}
                        />
                        PAN Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="docType"
                            value="aadharcard"
                            checked={docType === 'aadharcard'}
                            onChange={(e) => setDocType(e.target.value)}
                        />
                        Aadhar Card
                    </label>
                </div>

                {docType === 'pancard' && (
                    <>
                        <label htmlFor="pancard">PAN Card Upload</label>
                        <input type="file" id="pancard" name="pancard" accept="image/*" required />
                    </>
                )}

                {docType === 'aadharcard' && (
                    <>
                        <label htmlFor="aadharFront">Aadhar Card Front</label>
                        <input type="file" id="aadharFront" name="aadharFront" accept="image/*" required />

                        <label htmlFor="aadharBack">Aadhar Card Back</label>
                        <input type="file" id="aadharBack" name="aadharBack" accept="image/*" required />
                    </>
                )}

                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>

    </>
}