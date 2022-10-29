import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const errorHandler = (request) => {
  return async (body) => {
    try {
      await request(body);
    } catch (error) {
      // add global logger in future
      // console.log(error);
      console.log('Axios error');
    }
  };
};

// axios.interceptors.response.use(undefined, (error) => {
//   console.log('error !');
// });

export default api;
