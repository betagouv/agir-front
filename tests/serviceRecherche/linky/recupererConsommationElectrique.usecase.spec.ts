import { RecupererConsommationElectriqueUsecase } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';
import { ServiceRechercheConsommationLinkyRepositoryMock } from './adapters/serviceRechercheConsommationLinky.repository.mock';
import {
  ServiceConsommationLinkyViewModel,
  ServiceRechercheConsommationLinkyPresenterImpl,
} from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheConsommationLinky.presenter.impl';

describe('Fichier de tests concernant la récupération de la consommation électrique', () => {
  it("En donnant l'id d'utilisateur doit retourner sa consommation électrique annuelle et de ses 14 derniers jours", async () => {
    // GIVEN
    const serviceRechercheConsommationRepository = new ServiceRechercheConsommationLinkyRepositoryMock({
      consommationAnnuelle: {
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
      },
      consommationQuatorzeJours: {
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
            mois: 'janvier',
            annee: '2023',
            date: '2023-01-02T12:00:00.000Z',
          },
          {
            valeur: 2,
            mois: 'janvier',
            annee: '2024',
            date: '2024-01-02T12:00:00.000Z',
          },
        ],
      },
    });

    // WHEN
    const usecase = new RecupererConsommationElectriqueUsecase(serviceRechercheConsommationRepository);
    await usecase.execute('utilisateurId', new ServiceRechercheConsommationLinkyPresenterImpl(expectation));
  });

  // THEN
  function expectation(serviceConsommationLinkyViewModel: ServiceConsommationLinkyViewModel) {
    expect(serviceConsommationLinkyViewModel).toStrictEqual<ServiceConsommationLinkyViewModel>({
      consommationAnnuelle: {
        id: 'annuelle',
        titre: 'Mois par mois',
        commentaires: ['commentaire 1', 'commentaire 2'],
        couleurValeur1: '#68A532',
        couleurValeur2: '#447049',
        graphique: {
          libelles: ['janvier', 'fevrier'],
          valeur_courante: [1, 2],
          valeur_courante_transcription: ['1 kWh', '2 kWh'],
          valeur_precedente: [1, 2],
          valeur_precedente_transcription: ['1 kWh', '2 kWh'],
        },
      },
      consommationQuatorzeJours: {
        commentaires: ['commentaire 1', 'commentaire 2'],
        couleurValeur1: '#6a6af4',
        couleurValeur2: '#000091',
        graphique: {
          libelles: ['1 janvier', '2 janvier'],
          valeur_courante: [1, 2],
          valeur_courante_transcription: ['1 kWh', '2 kWh'],
          valeur_precedente: [1, 2],
          valeur_precedente_transcription: ['1 kWh', '2 kWh'],
        },
        id: '14jours',
        titre: '14 derniers jours',
      },
    });
  }
});
