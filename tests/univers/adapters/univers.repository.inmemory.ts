import { UniversRepository } from '../../../src/univers/ports/univers.repository';
import { Univers } from '../../../src/univers/recupererListeUnivers.usecase';

export class UniversRepositoryMock implements UniversRepository {
  recupererUnivers(idUtilisateur: string, universId: string): Promise<Univers> {
    return Promise.resolve({
      id: '1',
      nom: 'Le climat',
      urlImage: 'https://via.placeholder.com/150',
      nombreDeDefisRealises: 0,
    });
  }
  recupererLaListeDesUnivers(): Promise<Univers[]> {
    return Promise.resolve([
      {
        id: '1',
        nom: 'Le climat',
        urlImage: 'https://via.placeholder.com/150',
        nombreDeDefisRealises: 0,
      },
      {
        id: '2',
        nom: 'En cuisine',
        urlImage: 'https://via.placeholder.com/150',
        nombreDeDefisRealises: 0,
      },
    ]);
  }
}
