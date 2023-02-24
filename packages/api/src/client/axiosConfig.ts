import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  // baseURL: `${process.env.SERVER_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (data) => Promise.resolve(data.data),
  (err) => Promise.reject(err.response?.data.error)
);

export { api };
