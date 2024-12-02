import axios from 'axios';

const apiUrl = 'http://localhost:3002';
 // const apiUrl = 'https://csm-backend.adaptable.app';
// const apiUrl = 'https://csm-api-server.onrender.com';

const HttpnInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default HttpnInstance;