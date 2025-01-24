import { CollectiviteRepository, Collectivites } from '@/domaines/collectivites/ports/collectivite.repository';

export class CollectiviteRepositoryStub implements CollectiviteRepository {
  async findCollectivites(nom: string): Promise<Collectivites> {
    if (nom === 'paris') {
      return [
        { codeInsee: '75056', nom: 'Paris' },
        { codeInsee: '75057', nom: 'Paris 1er arrondissement' },
        { codeInsee: '75058', nom: 'Paris 2eme arrondissement' },
        { codeInsee: '75059', nom: 'Paris 3eme arrondissement' },
        { codeInsee: '75060', nom: 'Paris 4eme arrondissement' },
      ];
    }

    if (nom === 'c') {
      const tableauDe100Rempli = Array.from({ length: 100 }, (_, index) => ({
        codeInsee: (index + 1).toString(),
        nom: `Test${index + 1}`,
      }));
      return tableauDe100Rempli;
    }

    return [];
  }
}
