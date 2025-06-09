import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:8011", 
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});