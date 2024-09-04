import axios from 'axios';

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8"
axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
axios.defaults.withCredentials = true;

const axiosInstance = () => axios.create();

export const AxiosInstance = axiosInstance();
