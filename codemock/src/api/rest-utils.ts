import { useDispatch } from "react-redux";
import { COOKIE_KEY, removeCookie } from "./cookies";
import { getCookie } from "./cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthActions } from "@/store/actions";
import { store } from "@/app/providers";
import { RootState } from "@/store/redux";

type HeaderProps = {
  "Content-Type": string;
  Accept: string;
  "User-Agent"?: string;
};

const TIMEOUT = 30000;

const buildHeaders = (): HeaderProps => {
  const result: HeaderProps = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return result;
};

const apiConfig = {
  baseUrl: "http://localhost:8081/",
};

export const callApiWithoutToken = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
});

// rest-utils.ts
// api.ts
export const refreshTokenApi = async () => {
  const token = (store.getState() as RootState).auth.access_token;
  const response = await callApiWithoutToken.patch<{ access_token: string }>(
    "/auth/refresh-token",
    undefined,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // <-- return ONLY the data
};

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: apiConfig.baseUrl,
      timeout: TIMEOUT,
      headers: buildHeaders(),
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = (store.getState() as RootState).auth.access_token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(token);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (window.location.pathname !== "/features/Authentication") {
            store.dispatch(AuthActions.refreshToken.request());
          }
        }
        return Promise.reject(error);
      }
    );
  }

  resetHeaders() {
    this.instance.defaults.headers.Authorization = null;
  }

  async get<T>(path: string, config?: AxiosRequestConfig) {
    const response = await this.instance.get<T>(path, config);
    return response.data;
  }

  async post<T>(path: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.post<T>(path, data, config);
    return response.data;
  }

  async postForm<T>(path: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.postForm<T>(path, data, config);
    return response.data;
  }

  async put<T>(path: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.put<T>(path, data, config);
    return response.data;
  }

  async patch<T>(path: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.patch<T>(path, data, config);
    return response.data;
  }

  async delete<T>(path: string, config?: AxiosRequestConfig) {
    const response = await this.instance.delete<T>(path, config);
    return response.data;
  }
}

const httpClient = new HttpClient();

export const resetAxios = () => {
  httpClient.resetHeaders();
};

export const get = async <T>(
  path: string,
  params?: any,
  headers?: any
): Promise<T> => {
  return httpClient.get<T>(path, { params, headers: { ...headers } });
};

export const post = async <T>(path: string, data?: any): Promise<T> => {
  return httpClient.post<T>(path, data);
};

export const postForm = async <T>(path: string, data?: any): Promise<T> => {
  return httpClient.postForm<T>(path, data);
};

export const put = async <T>(path: string, data?: any): Promise<T> => {
  return httpClient.put<T>(path, data);
};

export const patch = async <T>(path: string, data?: any): Promise<T> => {
  return httpClient.patch<T>(path, data);
};

export const del = async <T>(path: string, data?: any): Promise<T> => {
  return httpClient.delete<T>(path, { data });
};
