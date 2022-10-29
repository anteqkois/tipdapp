import axios from 'axios';

export const api = axios.create({
  // export default axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default api;
