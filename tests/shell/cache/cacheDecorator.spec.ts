import { Cachable, cache } from '../../../src/shell/cache/cacheDecorator';
import { AppRawDataStorage } from '../../../src/shell/cache/appRawDataStorage';
import { InMemoryAppRawDataStorage } from './inMemory.appRawDataStorage';
import { vitest } from 'vitest';
import { fail } from 'node:assert';

class FakeDatasource {
  numberOfCall = 0;

  getData(): Promise<number> {
    this.numberOfCall++;
    return Promise.resolve(this.numberOfCall);
  }

  getDataNotFound(): Promise<number> {
    this.numberOfCall++;
    return Promise.reject(new Error('not found'));
  }
}

class FakeCachedService extends Cachable {
  fakeDatasource = new FakeDatasource();

  constructor(readonly appRawDataStorage: AppRawDataStorage) {
    super(appRawDataStorage);
  }

  @cache({ key: 'myKey' })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getData(id: number): Promise<number> {
    return this.fakeDatasource.getData();
  }

  @cache({ key: 'myKey2' })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDataNotFound(id: number): Promise<number> {
    return this.fakeDatasource.getDataNotFound();
  }
}

describe('Cache decorator', () => {
  describe('cache', () => {
    it("devrait cacher la réponse si l'api retourne une 200", async () => {
      // GIVEN
      const appRawData = new InMemoryAppRawDataStorage();
      const fakeCacheService = new FakeCachedService(appRawData);

      const fakeDataSourceSpyOn = vitest.spyOn(fakeCacheService.fakeDatasource, 'getData');
      const id = 178;

      // WHEN
      await fakeCacheService.getData(id);
      const response = await fakeCacheService.getData(id);

      // THEN
      expect(response).toEqual(1);
      expect(fakeDataSourceSpyOn).toHaveBeenCalledTimes(1);
    });

    it("ne devrait pas cacher la réponse si la datasource retourne une erreur not found et qu'on n'a pas défini une valeur par défaut pour le not found", async () => {
      // GIVEN
      const appRawData = new InMemoryAppRawDataStorage();
      const fakeCacheService = new FakeCachedService(appRawData);

      const id = 178;

      // WHEN
      try {
        await fakeCacheService.getDataNotFound(id);
        fail();
      } catch (e) {
        // THEN
        await expect(fakeCacheService.getDataNotFound(id)).rejects.toThrow(new Error('not found'));
      }
    });
  });
});
