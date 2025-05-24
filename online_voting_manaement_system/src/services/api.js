// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'  // तुमचं Spring Boot backend चालू असलेलं base URL
});

export default api;
