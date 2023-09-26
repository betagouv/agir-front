import axios from 'redaxios';

export class AxiosFactory {
  public static getAxios() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public static getCMSAxios() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL_CMS,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN_CMS}`,
      },
    });
  }
}
