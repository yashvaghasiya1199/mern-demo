import React, { useState } from 'react';
import '../../assets/css/payment.css'
import { useUserHooks } from '../../hooks/user.hook';
import { errorToast, successToast } from '../../componets/toast';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export function Payments(){

      const [method, setMethod] = useState(null);
      const [paymentId,setPaymentId] = useState(null)
      const localData = JSON.parse(localStorage.getItem("rideid"))
      const {ride_id,user_id,driver_id,vehicle_id} = localData.ride
      const navigate = useNavigate()
    
    
      const data = {
          method,
          paymentId,
          ride_id,
          user_id,
          driver_id,
          vehicle_id
          
        }
    
      const{payment} = useUserHooks()
    
      async function formSubmit(e){
        e.preventDefault()
        if(!method){
          return  errorToast("please select any one method")
        }
    
        try {
            const response = await payment(data)
            if(response.payload){
                successToast("payment successfully your ride is booked")
                navigate("/payment/complated")
    
            }
            console.log(response);
            if(response.payload.error){
                // errorToast(response.msg)    
            }
            
        } catch (error) {
            console.log(error);
            errorToast(error.msg)
        }
      }
    
      return (
        <form className="payment-form" onSubmit={formSubmit} >
          <div className="form-group">
            <h1 className='text-center' >confirem payment</h1>
            <label>
              <input
                type="radio"
                name="method"
                value="cash"
                autoFocus
                checked={method === 'cash'}
                onChange={(e) => setMethod(e.target.value)}
              />
              Cash
            </label>
    
            <label>
              <input
                type="radio"
                name="method"
                value="online"
                checked={method === 'online'}
                onChange={(e) => setMethod(e.target.value)}
              />
              Online
            </label>
          </div>
    
          {method === 'online' && (
            <div className="form-group">
              <label htmlFor="paymentid">Payment ID</label>
              <input type="text" id="paymentid" value={paymentId} onChange={(e)=>setPaymentId(e.target.value)}  required />
            </div>
          )}
          <button type='submit' className='payment-submit-btn'  >submit</button>
          <ToastContainer/>
        </form>
      );

}