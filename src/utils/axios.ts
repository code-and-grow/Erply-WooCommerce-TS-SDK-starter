import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => (
  axios.isAxiosError(error)
);

export const axiosGet = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | AxiosError<T> | unknown> => {
  try {
    return await axios.get<T>(url, config);
  } catch (error: unknown) {
    if (isAxiosError<T>(error)) {
      return { error: error.message };
    }
    return { error };
  }
};

export const axiosPost = async <T>(
  url: string,
  payload: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | AxiosError<T> | unknown> => {
  try {
    return await axios.post<T>(url, payload, config);
  } catch (error: unknown) {
    if (isAxiosError<T>(error)) {
      return { error: error.message };
    }
    return { error };
  }
};
