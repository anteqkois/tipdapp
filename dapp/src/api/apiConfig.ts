import axios from 'axios';

export const api = axios.create({
  // export default axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

export default api;
