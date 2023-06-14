import axios, { AxiosInstance } from "axios";

export class AxiosFactory {
  public static getAxios(): AxiosInstance {
    console.log(import.meta.env.VITE_API_URL);
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
