import axios from 'axios';
import type { AuthResponse } from '../models/response/AuthResponse';

export const BASE_URL = 'http://localhost:5000/api';
export const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log("Unauthorized", e);
        }
    }
    throw error;
});

export default $api;