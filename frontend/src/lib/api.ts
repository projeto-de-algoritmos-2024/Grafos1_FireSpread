import axios from 'axios';

export type Response<T> = {
  status: number;
  body: T | null;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const tokenName = import.meta.env.VITE_PUBLIC_TOKEN_COOKIE_NAME;
if (!tokenName) {
  throw new Error('PUBLIC_TOKEN_COOKIE_NAME is not defined');
}
