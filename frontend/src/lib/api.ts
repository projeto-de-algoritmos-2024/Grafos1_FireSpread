import axios from 'axios';

export type Response<T> = {
  status: number;
  body: T | null;
};

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});

// const tokenName = import.meta.env.PUBLIC_TOKEN_COOKIE_NAME;
// if (!tokenName) {
//   throw new Error('PUBLIC_TOKEN_COOKIE_NAME is not defined');
// }

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem(tokenName);
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use((response) => {
//   const setCookieHeader = response.headers['set-cookie'];
//   if (setCookieHeader) {
//     setCookieHeader.forEach((cookie: string) => {
//       const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
//       // Armazene o cookie no armazenamento local em vez de definir o cookie diretamente
//       localStorage.setItem(cookieName, cookieValue);
//     });
//   }

//   return response;
// });
