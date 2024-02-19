import { ObtenirConsommationElectriqueAnnuelleUsecase } from '@/linky/obtenirConsommationElectriqueAnnuelle.usecase';
import { LinkyPresenterAnnuelleImpl } from '@/linky/adapters/linkyAnnuelle.presenter.impl';
import { MockLinkyRepository } from './adapters/linky.repository.mock';
import { ConsommationElectriqueViewModel } from '@/linky/ports/linky.presenter';

describe('Fichier de test du usecase du chargement des données annuelle linky', () => {
  it('en donnant un utilisateur valide doit me retourner ses données de consommation electrique annuelle formatées pour le graphique et les commentaires associés', async () => {
    // GIVEN
    const obtenirConsommationElectriqueUsecase = new ObtenirConsommationElectriqueAnnuelleUsecase(
      new MockLinkyRepository({
        commentaires: ['commentaire 1', 'commentaire 2'],
        data: [
          {
            valeur: 1,
            mois: 'janvier',
            annee: '2023',
            date: '2023-01-01T12:00:00.000Z',
          },
          {
            valeur: 1,
            mois: 'janvier',
            annee: '2024',
            date: '2024-01-01T12:00:00.000Z',
          },
          {
            valeur: 2,
            mois: 'fevrier',
            annee: '2023',
            date: '2023-02-01T12:00:00.000Z',
          },
          {
            valeur: 2,
            mois: 'fevrier',
            annee: '2024',
            date: '2024-02-01T12:00:00.000Z',
          },
        ],
      })
    );

    // WHEN
    await obtenirConsommationElectriqueUsecase.execute('idUtilisateur', new LinkyPresenterAnnuelleImpl(expectation));

    // THEN
    function expectation(viewModel: ConsommationElectriqueViewModel) {
      expect(viewModel).toStrictEqual<ConsommationElectriqueViewModel>({
        commentaires: ['commentaire 1', 'commentaire 2'],
        graphique: {
          libelles: ['janvier', 'fevrier'],
          valeur_courante: [1, 2],
          valeur_precedente: [1, 2],
        },
      });
    }
  });
});
