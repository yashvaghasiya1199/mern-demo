import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../../assets/css/payment.css'
import { useUserHooks } from '../../../hooks/useUser';
import { errorToast, successToast } from '../../../componets/toast';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../../../hooks/useRide';

interface ILocalData {
    ride_id: string;
    user_id: string;
    driver_id: string;
    vehicle_id: string;
}

interface IPaymentData {
    method: string | null;
    paymentId: string | null;
    ride_id: string;
    user_id: string;
    driver_id: string;
    vehicle_id: string;
}

export function Payments() {
    const [method, setMethod] = useState<string | null>(null);
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const localData: ILocalData = JSON.parse(localStorage.getItem("rideid") || '{}');
    const { ride_id, user_id, driver_id, vehicle_id } = localData;
    const navigate = useNavigate();

    const data: IPaymentData = {
        method,
        paymentId,
        ride_id,
        user_id,
        driver_id,
        vehicle_id
    };

    const { payment } = useRide();

    async function formSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!method) {
            return errorToast("please select any one method");
        }

        try {
            const response = await payment(data);
            if (response.payload) {
                successToast("payment successfully your ride is booked");
                navigate("/payment/complated");
            }
            console.log(response);
        } catch (error: any) {
            console.log(error);
            errorToast(error.msg);
        }
    }

    return (
        <form className="payment-form" onSubmit={formSubmit}>
            <div className="form-group">
                <h1 className='text-center'>confirem payment</h1>
                <label>
                    <input
                        type="radio"
                        name="method"
                        value="cash"
                        autoFocus
                        checked={method === 'cash'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)}
                    />
                    Cash
                </label>

                <label>
                    <input
                        type="radio"
                        name="method"
                        value="online"
                        checked={method === 'online'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)}
                    />
                    Online
                </label>
            </div>

            {method === 'online' && (
                <div className="form-group">
                    <label htmlFor="paymentid">Payment ID</label>
                    <input
                        type="text"
                        id="paymentid"
                        value={paymentId || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentId(e.target.value)}
                        required
                    />
                </div>
            )}
            <button type='submit' className='payment-submit-btn'>Pay</button>
            <ToastContainer />
        </form>
    );
}