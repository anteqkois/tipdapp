import axios from 'axios';

export const api = axios.create({
  // export default axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

api.interceptors.response.use((data)=>{
  return Promise.resolve(data.data);
}, (err)=>{
  return Promise.reject(err.response?.data.error);
})

export default api;
