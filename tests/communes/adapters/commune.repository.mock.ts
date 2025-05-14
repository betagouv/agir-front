import { Commune, CommuneRepository } from '@/domaines/communes/ports/commune.repository';

export class CommuneRepositoryForTest implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<Commune[]> {
    return [
      { codeEpci: '01923', label: 'BOURG EN BRESSE' },
      { codeEpci: '01943', label: 'ST DENIS LES BOURG' },
    ];
  }
}
