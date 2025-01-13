import axios from 'axios';

const API = axios.create({
    baseURL:'http://localhost:3001', // Replace with your backend URL
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');  // Assuming token stored in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
