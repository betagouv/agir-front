import axios from 'redaxios';
import { Router } from 'vue-router';

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

export class Context {
  public static router: Router;
}
interface AxiosError {
  status: number;
}

export function intercept401() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propertyKey: any,
    descriptor?: PropertyDescriptor
  ) => {
    if (descriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args: unknown[]) {
        const method = originalMethod.apply(this, args);
        if (method instanceof Promise) {
          try {
            const result = await method;
            return Promise.resolve(result);
          } catch (exception) {
            //Session Expired
            if ((exception as AxiosError).status === 401) {
              await Context.router.push({ name: 'session-expiree' });
            }
          }
        }
      };
    }
  };
}
