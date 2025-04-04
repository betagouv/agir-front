import axios from 'redaxios';
import { EventBusEvents, NavigationBus } from '@/navigationBus';
import { utilisateurStore } from '@/store/utilisateur';

export class AxiosFactory {
  public static getAxios() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${utilisateurStore().utilisateur.token}`,
      },
    });
  }
}

export interface AxiosError {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
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
