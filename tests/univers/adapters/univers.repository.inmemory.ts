import { UniversRepository } from '@/domaines/univers/ports/univers.repository';
import { Univers } from '@/domaines/univers/recupererListeUnivers.usecase';

export class UniversRepositoryMock implements UniversRepository {
  recupererUnivers(idUtilisateur: string, universId: string): Promise<Univers> {
    return Promise.resolve({
      id: '1',
      nom: 'Le climat',
      urlImage: 'https://via.placeholder.com/150',
      nombreDeDefisRealises: 0,
      estTermine: true,
    });
  }
  recupererLaListeDesUnivers(): Promise<Univers[]> {
    return Promise.resolve([
      {
        id: '1',
        nom: 'Le climat',
        urlImage: 'https://via.placeholder.com/150',
        nombreDeDefisRealises: 0,
        estTermine: false,
      },
      {
        id: '2',
        nom: 'En cuisine',
        urlImage: 'https://via.placeholder.com/150',
        nombreDeDefisRealises: 0,
        estTermine: true,
      },
    ]);
  }
}
