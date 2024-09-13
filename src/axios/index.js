import axios from 'axios';

// Set baseURL globally for all requests
const prod = 'http://beta.one.bma.edu.ph/api/'
//const prod = 'http://192.168.100.6:7070/api/'
const testing = 'http://127.0.0.1:9090/api/'
//const testing = 'http://beta.one.bma.edu.ph/api/'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? prod : testing;
// Create an instance of Axios with the default configurations
const axiosInstance = axios.create();

export default axiosInstance;