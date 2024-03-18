import axios from 'redaxios';
import { NavigationBus, EventBusEvents } from '@/navigationBus';
import Cookies from 'js-cookie';

export class AxiosFactory {
  get axiosCMS(): typeof axios {
    return this._axiosCMS;
  }
  get axiosBack(): typeof axios {
    return this._axiosBack;
  }
  private static axiosInstance: AxiosFactory;
  private readonly _axiosBack: typeof axios;
  private readonly _axiosCMS: typeof axios;
  private constructor() {
    this._axiosBack = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('bearer')}`,
      },
    });

    this._axiosCMS = axios.create({
      baseURL: import.meta.env.VITE_API_URL_CMS,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN_CMS}`,
      },
    });
  }

  public static getInstance(): AxiosFactory {
    if (!AxiosFactory.axiosInstance) {
      AxiosFactory.axiosInstance = new AxiosFactory();
    }
    return AxiosFactory.axiosInstance;
  }

  public updateBearer(newBearer: string): void {
    this._axiosBack.defaults.headers = {
      ...this._axiosBack.defaults.headers,
      Authorization: `Bearer ${newBearer}`,
    };
  }
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
    descriptor?: PropertyDescriptor,
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
              await NavigationBus.getInstance().on(EventBusEvents.SESSION_EXPIREE);
            } else {
              throw exception;
            }
          }
        }
      };
    }
  };
}
