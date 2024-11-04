import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiquesRepository';
import { Thematique } from '@/domaines/thematiques/recupererThematique.usecase';

export class ThematiquesRepositoryMock implements ThematiquesRepository {
  recupererThematique(_idUtilisateur: string, _thematiqueId: string): Promise<Thematique> {
    return Promise.resolve({
      id: '1',
      nom: 'Le climat',
      urlImage: 'https://via.placeholder.com/150',
    });
  }
}
