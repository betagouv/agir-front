import axios from 'redaxios';

export class AxiosFactory {
  private static bearer = '';
  public static setBearer(value: string) {
    this.bearer = value;
  }
  public static getAxios() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.bearer}`,
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
