import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { apiBaseUrl } from '../constant';
import { queryString } from '../utils/helper';
const $toast = useToast();

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.response.use(response => response,
    error => {
        if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
            $toast.error('Network error: Connection reset');
        }
        return Promise.reject(error);
    }
);

const apiMethods = {
    get(url, props = {}) {
        return api.get(`${url}?${queryString(props)}`);
    },
};

export default apiMethods;
