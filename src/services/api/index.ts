// services/api.ts
import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../axiosConfig.ts';

interface ApiRequest {
  url: string;
  body?: Record<string, unknown>;
  auth?: boolean;
}

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status;
    throw new ApiError(message, status);
  }
  throw new ApiError('An unexpected error occurred');
};

const del = async <T>({ url, body: data }: ApiRequest): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, { data });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const get = async <T>({ url, auth = true }: ApiRequest): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await (auth
      ? axiosInstance.get(url)
      : axios.get(url));
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const post = async <T>({ url, body }: ApiRequest): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


const put = async <T>({ url, body }: ApiRequest): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(url, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const api = {
  delete: del,
  get,
  post,
  put,
};

export default api;
