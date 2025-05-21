import { AppRawDataStorage } from '@/shell/appRawDataStorage';
import { vi } from 'vitest';

export class SpyAppRawDataStorage implements AppRawDataStorage {
  clearItem = vi.fn();
  clearAllItems = vi.fn();
  get = vi.fn();
  set = vi.fn();
}
