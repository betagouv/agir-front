import { CommuneRepository } from '@/domaines/communes/ports/commune.repository';

export class CommuneRepositoryForTest implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<string[]> {
    return ['BOURG EN BRESSE', 'ST DENIS LES BOURG'];
  }
}
