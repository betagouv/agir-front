import axios, { AxiosInstance } from "axios";

export class AxiosFactory {
  public static getAxios(): AxiosInstance {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
