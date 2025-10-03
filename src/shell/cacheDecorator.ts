import { AppRawDataStorage } from '@/shell/appRawDataStorage';

interface CacheParams {
  key: string;
  storage?: AppRawDataStorage;
  defaultValueForNotFound?: unknown;
}

interface CachedItem<T> {
  value: T;
  expiresAt: number;
}

const TTL_IN_SECONDS = 60 * 5;

const missingStorageErrorMessage =
  'Cache cannot be used. To use it, please specify the storage to use :\n' +
  '- either in the @cache parameters \n' +
  '- or  by setting a "storage" property in the class" ';

export function cache({ key, storage, defaultValueForNotFound }: CacheParams) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;

    (descriptor as PropertyDescriptor & { storage: AppRawDataStorage }).value = async function (...args: unknown[]) {
      const selectedStorage = getSelectedStorage(this.storage, storage);
      const cacheKey = `${key}__${JSON.stringify(args)}`;
      const cachedItem = selectedStorage.get<CachedItem<unknown>>(cacheKey);

      const now = Date.now();
      if (cachedItem !== null && cachedItem.expiresAt > now) {
        return Promise.resolve(cachedItem.value);
      }

      const method = originalMethod.apply(this, args);
      if (method instanceof Promise) {
        try {
          const result = await method;
          const cachedItem: CachedItem<unknown> = {
            value: result,
            expiresAt: now + TTL_IN_SECONDS * 1000,
          };
          selectedStorage.set(cacheKey, cachedItem);
          return Promise.resolve(result);
        } catch (exception) {
          if (defaultValueForNotFound) {
            const cachedItem: CachedItem<unknown> = {
              value: defaultValueForNotFound,
              expiresAt: now + TTL_IN_SECONDS * 1000,
            };
            selectedStorage.set(cacheKey, cachedItem);
            return Promise.resolve(defaultValueForNotFound);
          } else {
            return Promise.reject(exception);
          }
        }
      }
    };
  };
}

export function removeCache({ key, storage }: CacheParams) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;

    (descriptor as PropertyDescriptor & { storage: AppRawDataStorage }).value = function (...args: unknown[]) {
      const selectedStorage = getSelectedStorage(this.storage, storage);
      const keyPrefix = `${key}__`;

      selectedStorage.clearItem(keyPrefix, true);

      return originalMethod.apply(this, args);
    };
  };
}

function getSelectedStorage(classStorage: AppRawDataStorage, paramStorage?: AppRawDataStorage): AppRawDataStorage {
  if (classStorage === undefined && paramStorage === undefined) {
    console.error(missingStorageErrorMessage); // eslint-disable-line no-console
    throw new Error(missingStorageErrorMessage);
  }

  return paramStorage || classStorage;
}
