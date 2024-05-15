import { ChargementCommunesUsecase } from '@/domaines/communes/chargementCommunesUsecase';
import { CommuneRepository } from '@/domaines/communes/ports/communeRepository';

class CommuneRepositoryForTest implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<string[]> {
    return ['BOURG EN BRESSE', 'ST DENIS LES BOURG'];
  }
}

describe('Fichier de test du usecase de chargement des communes', () => {
  it('En donnant un code postal, doit me retourne la liste des communes associées', async () => {
    // GIVEN
    const codePostal = '01000';
    const chargementCommunesUsecase = new ChargementCommunesUsecase(new CommuneRepositoryForTest());

    // WHEN
    const listeDesCommunes = await chargementCommunesUsecase.execute(codePostal);

    // THEN
    expect(listeDesCommunes).toStrictEqual(['BOURG EN BRESSE', 'ST DENIS LES BOURG']);
  });
});
