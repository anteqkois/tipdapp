import axios from 'axios';

const databaseApi = axios.create({
  baseURL: 'http://localhost:3002/api',
  withCredentials: true,
});

databaseApi.interceptors.response.use(
  (data) => {
    return Promise.resolve(data.data);
  },
  (err) => {
    return Promise.reject(err.response?.data.error);
  },
);

const blockchainDataFeedApi = axios.create({
  baseURL: 'http://localhost:3003/api',
  withCredentials: true,
});

databaseApi.interceptors.response.use(
  (data) => {
    return Promise.resolve(data.data);
  },
  (err) => {
    return Promise.reject(err.response?.data.error);
  },
);

export { databaseApi, blockchainDataFeedApi };
