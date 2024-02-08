import { ObtenirConsommationElectriqueUsecase } from '@/linky/obtenirConsommationElectrique.usecase';
import { ConsommationElectriqueViewModel, LinkyPresenterImpl } from '@/linky/adapters/linky.presenter.impl';
import { MockLinkyRepository } from './adapters/linky.repository.mock';

describe('Fichier de test du usecase du chargement des données linky', () => {
  it('en donnant un utilisateur valide doit me retourner ses données de consommation electrique', () => {
    // GIVEN
    const obtenirConsommationElectriqueUsecase = new ObtenirConsommationElectriqueUsecase(
      new MockLinkyRepository([
        {
          valeur: 1,
          mois: 'janvier',
          annee: '2023',
        },
        {
          valeur: 1,
          mois: 'janvier',
          annee: '2024',
        },
        {
          valeur: 2,
          mois: 'fevrier',
          annee: '2023',
        },
        {
          valeur: 2,
          mois: 'fevrier',
          annee: '2024',
        },
      ])
    );

    // WHEN
    obtenirConsommationElectriqueUsecase.execute('idUtilisateur', new LinkyPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ConsommationElectriqueViewModel) {
      expect(viewModel).toStrictEqual<ConsommationElectriqueViewModel>({
        libelles: ['janvier', 'fevrier'],
        valeur_courante: [1, 2],
        valeur_precedente: [1, 2],
      });
    }
  });
});
