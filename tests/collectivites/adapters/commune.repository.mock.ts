import { CollectiviteRepository } from '@/domaines/collectivites/ports/collectivite.repository';
import { Collectivites } from '@/domaines/collectivites/entities/collectivites';

export class CollectiviteRepositoryMock implements CollectiviteRepository {
  constructor(
    private listeARetourner: {
      codeInsee: string;
      nom: string;
    }[],
  ) {}

  async chercherCollectivites(nom: string, limite: number): Promise<Collectivites> {
    return new Collectivites(this.listeARetourner, limite);
  }
}
