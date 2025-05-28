
import { toast } from 'react-toastify';

export const successToast = (message) => {
    toast.success(message, {
      position: "top-right",  // Position of the toast
      autoClose: 2000,        // Auto close in ms
      closeOnClick: true,     // Close on click
      pauseOnHover: true,     // Pause timer on hover
      draggable: true,        // Allow drag to dismis
      theme: "dark",       // Theme: "light", "dark", or "colored"
    });
  };
  

  export const errorToast = (message) => {
    toast.error(message, {
      position: "top-right",  // Position of the toast
      autoClose: 2000,        // Auto close in ms
      closeOnClick: true,     // Close on click
      pauseOnHover: true,     // Pause timer on hover
      draggable: true,        // Allow drag to dismis
      theme: "dark",       // Theme: "light", "dark", or "colored"
    });
  };
  