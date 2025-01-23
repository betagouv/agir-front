import { CommuneRepositoryForTest } from './adapters/commune.repository.mock';
import { ChargementCommunesEPCIUsecase } from '@/domaines/communes/chargementCommunesEPCIUsecase';

describe('Fichier de test du usecase de chargement des communes EPCI', () => {
  it('En donnant un code postal, doit me retourne la liste des communes associées', async () => {
    // GIVEN
    const codePostal = '01000';
    const chargementCommunesUsecase = new ChargementCommunesEPCIUsecase(new CommuneRepositoryForTest());

    // WHEN
    const listeDesCommunes = await chargementCommunesUsecase.execute(codePostal);

    // THEN
    expect(listeDesCommunes).toStrictEqual([
      { codeInsee: '75056', nom: 'Paris' },
      { codeInsee: '69123', nom: 'Lyon' },
    ]);
  });
});
