import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://abes-findify-backend.onrender.com'|| "http://localhost:3000",
  withCredentials: true, // ✅ THIS IS IMPORTANT for sending cookies on login
});

export default instance;
