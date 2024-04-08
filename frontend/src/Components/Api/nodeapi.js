import axios from 'axios';

const apiUrl = 'http://localhost:3002';

const HttpnInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': '*/*',
  }
});

export default HttpnInstance;