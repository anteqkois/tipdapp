import axios from 'axios';

export const api = axios.create({
  // export default axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (data) => Promise.resolve(data.data),
  (err) => Promise.reject(err.response?.data.error)
);