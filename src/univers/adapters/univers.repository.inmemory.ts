import { UniversRepository } from '@/univers/ports/univers.repository';
import { Univers } from '@/univers/recupererListeUnivers.usecase';

export class UniversRepositoryInmemory implements UniversRepository {
  recupererLaListeDesUnivers(): Promise<Univers[]> {
    return Promise.resolve([
      {
        id: 1,
        nom: 'Le climat',
        urlImage: 'https://via.placeholder.com/150',
        nombreDeDefisRealises: 0,
      },
      {
        id: 2,
        nom: 'En cuisine',
        urlImage: 'https://via.placeholder.com/150',
        nombreDeDefisRealises: 0,
      },
    ]);
  }
}
