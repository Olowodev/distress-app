import axios from "axios";



const BASE_URL = 'http://192.168.0.18:5000/api/';

export const publicRequest = axios.create({
    baseURL: BASE_URL
});
