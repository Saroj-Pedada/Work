import axios from 'axios';

const apiUrl = 'https://medicalcamps-backend.vercel.app';

const HttpnInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': '*/*',
  }
});

export default HttpnInstance;