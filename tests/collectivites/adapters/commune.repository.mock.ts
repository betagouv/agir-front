import { CollectiviteRepository, Collectivites } from '@/domaines/collectivites/ports/collectivite.repository';

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
