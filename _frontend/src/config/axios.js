import axios from "axios";


const axiosInstance = axios. create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}` //token to be readed from local storaga and sent to header whenever a request to server made
    }
})

export default axiosInstance;