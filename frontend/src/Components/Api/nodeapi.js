import axios from 'axios';

// const apiUrl = 'https://medicalcamp-backend.onrender.com';
// const apiUrl = 'http://localhost:3002';
const apiUrl = 'https://csm-backend.adaptable.app';

const HttpnInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': '*/*',
  }
});

export default HttpnInstance;
