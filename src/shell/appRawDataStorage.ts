export interface AppRawDataStorage {
  get<T>(key: string): T | null;

  set<T>(key: string, value: T): void;

  clearItem(key: string, usePrefixDeletion?: boolean): void;

  clearAllItems(): void;
}

class SessionAppRawDataStorage implements AppRawDataStorage {
  /**
   *  We cannot delete all the data in the sessionStorage. We should delete only the data  that we specifically cached.
   *  That is why we had to keep all the cached keys in this.KEYS_IN_CACHE_KEY
   */
  private readonly KEYS_IN_CACHE_KEY = 'KeysInCache';

  get<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item === null ? null : (JSON.parse(item) as T);
  }

  set<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
    this.addCachedKey(key);
  }

  clearItem(key: string, usePrefixDeletion = false): void {
    if (usePrefixDeletion) {
      this.clearAllItemsThatStartWithPrefix(key);
    } else {
      sessionStorage.removeItem(key);
    }
  }

  clearAllItems(): void {
    const keys = this.getCachedKeys();
    keys.forEach(key => {
      this.clearItem(key);
    });
    this.clearItem(this.KEYS_IN_CACHE_KEY);
  }

  private clearAllItemsThatStartWithPrefix(prefix: string) {
    const keysWithPrefix = this.getCachedKeys().filter(key => key.startsWith(prefix));
    const remainingKeys = this.getCachedKeys().filter(key => !key.startsWith(prefix));

    keysWithPrefix.forEach(key => {
      this.clearItem(key);
    });

    sessionStorage.setItem(this.KEYS_IN_CACHE_KEY, JSON.stringify(remainingKeys));
  }

  private getCachedKeys(): string[] {
    const keys = sessionStorage.getItem(this.KEYS_IN_CACHE_KEY);
    return keys !== null ? JSON.parse(keys) : [];
  }

  private addCachedKey(key: string): void {
    const currentKeys = this.getCachedKeys();
    if (!currentKeys.includes(key)) {
      sessionStorage.setItem(this.KEYS_IN_CACHE_KEY, JSON.stringify([...currentKeys, key]));
    }
  }
}

export const sessionAppRawDataStorage = new SessionAppRawDataStorage();
