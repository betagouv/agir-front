import { BilanCarboneRepositoryMock } from './adapters/bilanCarbone.repository.mock';
import {
  BilanCarboneAccueilPresenterImpl,
  BilanCarboneCompletAccueilViewModel,
  BilanCarbonePartielAccueilViewModel,
} from '@/domaines/bilanCarbone/adapters/bilanCarboneAccueil.presenter.impl';
import { RecupererBilanCarboneAccueilUsecase } from '@/domaines/bilanCarbone/recupererBilanCarboneAccueil.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe('Fichier de tests concernant le chargement du bilan carbone', () => {
  const bilanCarboneCompletMock = new BilanCarboneRepositoryMock({
    pourcentageCompletionTotal: 100,
    bilanComplet: {
      impactKgAnnuel: 9600,
      univers: [
        {
          clefThematiqueAPI: ClefThematiqueAPI.transports,
          pourcentage: 31,
          impactKgAnnuel: 2796.1001241487393,
          details: [
            {
              label: 'Voiture',
              pourcentage: 23,
              impactKgAnnuel: 2042.1001241487393,
              emoji: '🚅',
            },
            {
              label: 'Avion',
              pourcentage: 8,
              impactKgAnnuel: 754.1001241487393,
              emoji: '✈️',
            },
          ],
          emoji: '🚦',
        },
        {
          clefThematiqueAPI: ClefThematiqueAPI.alimentation,
          pourcentage: 24,
          impactKgAnnuel: 2094.1568221,
          details: [],
          emoji: '🍴',
        },
        {
          clefThematiqueAPI: ClefThematiqueAPI.logement,
          pourcentage: 17,
          impactKgAnnuel: 1477.82343812085,
          details: [],
          emoji: '🏠',
        },
        {
          clefThematiqueAPI: ClefThematiqueAPI.consommation,
          pourcentage: 12,
          impactKgAnnuel: 450.0454437235896,
          details: [],
          emoji: '📦',
        },
      ],
      top3: [
        {
          label: 'Voiture',
          emoji: '🚙',
          pourcentage: '31',
        },
        {
          label: 'Me nourrir',
          emoji: '🍛',
          pourcentage: '24',
        },
        {
          label: 'Me loger',
          emoji: '🏡',
          pourcentage: '17',
        },
      ],
    },
    thematiquesBilan: [
      {
        contentId: 'id1',
        label: 'Me déplacer',
        urlImage: 'url1',
        estTermine: false,
        pourcentageProgression: 80,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.transports,
      },
      {
        contentId: 'id2',
        label: 'Me nourrir',
        urlImage: 'url2',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.alimentation,
      },
      {
        contentId: 'id3',
        label: 'Me loger',
        urlImage: 'url3',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.logement,
      },
      {
        contentId: 'id4',
        label: 'Consommer',
        urlImage: 'url4',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.consommation,
      },
    ],
  });
  const bilanCarboneAFaireMock = new BilanCarboneRepositoryMock({
    pourcentageCompletionTotal: 90,
    thematiquesBilan: [
      {
        contentId: 'id1',
        label: 'Me déplacer',
        urlImage: 'url1',
        estTermine: false,
        pourcentageProgression: 80,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.transports,
      },
      {
        contentId: 'id2',
        label: 'Me nourrir',
        urlImage: 'url2',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.alimentation,
      },
      {
        contentId: 'id3',
        label: 'Me loger',
        urlImage: 'url3',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.logement,
      },
      {
        contentId: 'id4',
        label: 'Consommer',
        urlImage: 'url4',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.consommation,
      },
    ],
  });

  describe("Quand le bilan est chargé sur la page d'accueil", () => {
    it('Bilan complet', async () => {
      // GIVEN
      const usecase = new RecupererBilanCarboneAccueilUsecase(bilanCarboneCompletMock);

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        new BilanCarboneAccueilPresenterImpl(
          bilanCarboneAccueilViewModel => expectation(bilanCarboneAccueilViewModel),
          () => {},
        ),
      );

      // THEN
      function expectation(bilanCarboneViewModel: BilanCarboneCompletAccueilViewModel) {
        expect(bilanCarboneViewModel).toStrictEqual<BilanCarboneCompletAccueilViewModel>({
          pourcentageProgressBar: 80,
          nombreDeTonnesAnnuel: '9,6',
        });
      }
    });
    it('Bilan à faire', async () => {
      // GIVEN
      const usecase = new RecupererBilanCarboneAccueilUsecase(bilanCarboneAFaireMock);

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        new BilanCarboneAccueilPresenterImpl(
          () => {},
          bilanCarboneAccueilViewModel => expectation(bilanCarboneAccueilViewModel),
        ),
      );

      // THEN
      function expectation(bilanCarbonePartielAccueilViewModel: BilanCarbonePartielAccueilViewModel) {
        expect(bilanCarbonePartielAccueilViewModel).toStrictEqual<BilanCarbonePartielAccueilViewModel>({
          pourcentageCompletionTotal: 90,
          thematiquesBilan: [
            {
              contentId: 'id1',
              estTermine: false,
              label: 'Me déplacer',
              nombreTotalDeQuestion: 10,
              clefUnivers: ClefThematiqueAPI.transports,
              pourcentageProgression: 80,
              urlImage: 'url1',
            },
            {
              contentId: 'id2',
              estTermine: true,
              label: 'Me nourrir',
              nombreTotalDeQuestion: 10,
              clefUnivers: ClefThematiqueAPI.alimentation,
              pourcentageProgression: 100,
              urlImage: 'url2',
            },
            {
              contentId: 'id3',
              estTermine: true,
              label: 'Me loger',
              nombreTotalDeQuestion: 10,
              clefUnivers: ClefThematiqueAPI.logement,
              pourcentageProgression: 100,
              urlImage: 'url3',
            },
            {
              contentId: 'id4',
              estTermine: true,
              label: 'Mes achats',
              nombreTotalDeQuestion: 10,
              clefUnivers: ClefThematiqueAPI.consommation,
              pourcentageProgression: 100,
              urlImage: 'url4',
            },
          ],
        });
      }
    });
  });
});
