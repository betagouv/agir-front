import { CommuneRepository, Collectivites } from '@/domaines/communes/ports/communeRepository';

export class CommuneRepositoryForTest implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<string[]> {
    return ['BOURG EN BRESSE', 'ST DENIS LES BOURG'];
  }

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
