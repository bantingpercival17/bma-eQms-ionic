import axios from 'axios';
// Set baseURL globally for all requests
const links = [
    'http://127.0.0.1:8000/api/',
    'http://127.0.0.1:9090/api/',
    'http://api-eqms.bma.edu.ph/api/'
]
const production = links[2]
const testing = links[0]
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? production : testing;
// Create an instance of Axios with the default configurations
const axiosInstance = axios.create();

export default axiosInstance;