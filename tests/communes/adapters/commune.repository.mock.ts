import { CommuneRepository, CommunesEPCI } from '@/domaines/communes/ports/communeRepository';

export class CommuneRepositoryForTest implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<string[]> {
    return ['BOURG EN BRESSE', 'ST DENIS LES BOURG'];
  }

  async getCommunesEPCI(nom: string): Promise<CommunesEPCI> {
    return [
      { codeInsee: '75056', nom: 'Paris' },
      { codeInsee: '69123', nom: 'Lyon' },
    ];
  }
}
