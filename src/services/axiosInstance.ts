import axios, { type AxiosRequestConfig } from "axios";

export type ApiResponse<T> = {
  success: boolean;
  status: number;
  data?: T;
  error?: string;
};

export const axiosInstance = axios.create({
  baseURL:
    "https://springboot-app-1069861645989.asia-south1.run.app/api/v1/acceleratedonboarding",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Wrapper function
export async function makeRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.request<T>(config);
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status || 500,
      error: error?.response?.data?.message || error.message,
    };
  }
}
