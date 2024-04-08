import axios from 'axios';

const apiUrl = 'https://medicalcamp-backend.onrender.com';

const HttpnInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': '*/*',
  }
});

export default HttpnInstance;