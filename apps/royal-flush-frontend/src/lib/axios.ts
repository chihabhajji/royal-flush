import axios from "axios";

export const HOME_AXIOS_CLIENT = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
export const DASHBOARD_AXIOS_CLIENT = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
  
DASHBOARD_AXIOS_CLIENT.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            if(config.headers) config.headers['Authorization'] = `Bearer ${token}`;
            else config.headers = { 'Authorization': `Bearer ${token}` };
        }
        return config;
    }
);