import axios from 'axios';

export const API_URL = 'http://localhost:5000';
// export const API_URL = 'https://fallback-backend.sia-test.dhl.com'
const $api = axios.create({
  withCredentials: true, 
  baseURL: `${API_URL}`,
});

// Only add interceptors once we added JWT Authentication
// $api.interceptors.request.use(async config => {
// });
// $api.interceptors.response.use(
//   config => {
//     return config;
//   },
//   async error => {},
// );

export default $api;
