import axios from 'axios'

const baseUrl = 'https://calidad.cominvi.com.mx:8880/api/principal';

const api = axios.create({
    baseURL: baseUrl
})

export default api;