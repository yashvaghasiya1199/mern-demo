import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:8011",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


