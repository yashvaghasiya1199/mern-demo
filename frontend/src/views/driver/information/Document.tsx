import { useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import '../../../assets/css/login.css'
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../../componets/toast";
import { useDispatch } from "react-redux";
import { driverDocument } from "../../../store/redusers/driver.reduser";
import { api } from "../../../libs/axios";
import { useNavigate } from "react-router-dom";
import { ErrorNote } from "../../../componets/common/errornote";
import { useDriverHooks } from "../../../hooks/useDriver";

export function DriverDocument() {
    const { documentUpload } = useDriverHooks();
    const [docType, setDocType] = useState<'pancard' | 'aadharcard'>('pancard');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('docType', docType);

        if (docType === 'pancard') {
            const panFile = (e.currentTarget.pancard as HTMLInputElement).files?.[0];
            if (panFile) {
                formData.append('pancard', panFile);
            }
        } else if (docType === 'aadharcard') {
            const front = (e.currentTarget.aadharFront as HTMLInputElement).files?.[0];
            const back = (e.currentTarget.aadharBack as HTMLInputElement).files?.[0];
            if (front) formData.append('aadharFront', front);
            if (back) formData.append('aadharBack', back);
        }

        try {
            const response = await api.post('/api/driver/adddocument', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const result = await response.data;
            console.log(result);

            if (!result.error) {
                successToast(result.msg);
                dispatch(driverDocument());
                navigate('/driveradmin');
            }
            if (result.err) {
                errorToast(result.msg);
            }
        } catch (error: any) {
            console.error("Upload error:", error.response?.data?.msg);
            setError(error.response?.data?.msg || "An error occurred");
        }
    }

    return <>
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Document Type</label>
                {error && <ErrorNote data={error} />}
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="docType"
                            value="pancard"
                            checked={docType === 'pancard'}
                            onChange={(e) => setDocType(e.target.value as 'pancard' | 'aadharcard')}
                        />
                        PAN Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="docType"
                            value="aadharcard"
                            checked={docType === 'aadharcard'}
                            onChange={(e) => setDocType(e.target.value as 'pancard' | 'aadharcard')}
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