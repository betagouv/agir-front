import { ChargementCommunesUsecase } from '@/domaines/communes/chargementCommunesUsecase';
import { CommuneRepositoryForTest } from './adapters/commune.repository.mock';

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
