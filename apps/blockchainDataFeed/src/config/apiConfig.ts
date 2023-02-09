import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: `https://api.coingecko.com/api/v3`,
  withCredentials: true,
});

api.interceptors.response.use(
  (data) => {
    return Promise.resolve(data.data);
  },
  (err) => {
    return Promise.reject(err.response?.data.error);
  }
);

export default api;
