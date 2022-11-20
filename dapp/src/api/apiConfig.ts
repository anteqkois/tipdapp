import axios from 'axios';

//TODO! add base url to .env
export const api = axios.create({
  // export default axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
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
