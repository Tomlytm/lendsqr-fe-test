/* eslint-disable @typescript-eslint/no-explicit-any */
// services/api.ts
import axios, { AxiosResponse } from 'axios';
import {axiosInstance} from '../axiosConfig.ts';

type Request = {
  url: string;
  body?: any;
  auth?: boolean;
};

const del = async <T>({ url, body: data }: Request): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.delete(url, { data });
  return response.data;
};

const get = async <T>({ url, auth = true }: Request): Promise<T> => {
  const response: AxiosResponse<T> = await (auth
    ? axiosInstance.get(url)
    : axios.get(url)); 
  return response.data;
};

const post = async <T>({ url, body, auth = true }: Request): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.post(url, body); 
  return response.data;
};


const put = async <T>({ url, body }: Request): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.put(url, body);
  return response.data;
};

const api = {
  delete: del,
  get,
  post,
  put,
};

export default api;
