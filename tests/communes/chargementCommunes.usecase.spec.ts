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
    expect(listeDesCommunes).toStrictEqual([
      { label: 'BOURG EN BRESSE', codeEpci: '01923' },
      { label: 'ST DENIS LES BOURG', codeEpci: '01943' },
    ]);
  });
});
