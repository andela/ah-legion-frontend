import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

const axiosConfig = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});
export default axiosConfig;
