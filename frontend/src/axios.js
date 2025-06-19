// h axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://abes-findify-backend.onrender.com', // ✅ deployed backend
  withCredentials: true, // only if your backend uses cookies (e.g., sessions)
});

export default instance;
