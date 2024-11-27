import { BilanCarboneRepositoryMock } from './adapters/bilanCarbone.repository.mock';
import {
  BilanCarboneAccueilPresenterImpl,
  BilanCarboneCompletAccueilViewModel,
  BilanCarbonePartielAccueilViewModel,
} from '@/domaines/bilanCarbone/adapters/bilanCarboneAccueil.presenter.impl';
import { RecupererBilanCarboneAccueilUsecase } from '@/domaines/bilanCarbone/recupererBilanCarboneAccueil.usecase';

describe('Fichier de tests concernant le chargement du bilan carbone', () => {
  const bilanCarboneCompletMock = new BilanCarboneRepositoryMock({
    pourcentageCompletionTotal: 100,
    bilanComplet: {
      impactKgAnnuel: 9600,
      univers: [
        {
          universId: 'transport',
          universLabel: 'Les transports',
          pourcentage: 31,
          impactKgAnnuel: 2796.1001241487393,
          details: [
            {
              label: 'Voiture',
              pourcentage: 23,
              impactKgAnnuel: 2042.1001241487393,
              emoji: '🚗',
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
          universId: 'alimentation',
          universLabel: 'En cuisine',
          pourcentage: 24,
          impactKgAnnuel: 2094.1568221,
          details: [],
          emoji: '🍴',
        },
        {
          universId: 'logement',
          universLabel: 'À la maison',
          pourcentage: 17,
          impactKgAnnuel: 1477.82343812085,
          details: [],
          emoji: '🏠',
        },
        {
          universId: 'consommation',
          universLabel: 'En courses',
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
          label: 'En cuisine',
          emoji: '🍛',
          pourcentage: '24',
        },
        {
          label: 'À la maison',
          emoji: '🏡',
          pourcentage: '17',
        },
      ],
    },
    thematiquesBilan: [
      {
        contentId: 'id1',
        label: 'Les transports',
        urlImage: 'url1',
        estTermine: false,
        pourcentageProgression: 80,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'transports',
      },
      {
        contentId: 'id2',
        label: 'En cuisine',
        urlImage: 'url2',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'alimentation',
      },
      {
        contentId: 'id3',
        label: 'À la maison',
        urlImage: 'url3',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'logement',
      },
      {
        contentId: 'id4',
        label: 'En courses',
        urlImage: 'url4',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'consommation',
      },
    ],
  });
  const bilanCarboneAFaireMock = new BilanCarboneRepositoryMock({
    pourcentageCompletionTotal: 90,
    thematiquesBilan: [
      {
        contentId: 'id1',
        label: 'Les transports',
        urlImage: 'url1',
        estTermine: false,
        pourcentageProgression: 80,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'transports',
      },
      {
        contentId: 'id2',
        label: 'En cuisine',
        urlImage: 'url2',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'alimentation',
      },
      {
        contentId: 'id3',
        label: 'À la maison',
        urlImage: 'url3',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'logement',
      },
      {
        contentId: 'id4',
        label: 'En courses',
        urlImage: 'url4',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: 'consommation',
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
              label: 'Les transports',
              nombreTotalDeQuestion: 10,
              clefUnivers: 'transports',
              pourcentageProgression: 80,
              urlImage: 'url1',
            },
            {
              contentId: 'id2',
              estTermine: true,
              label: 'En cuisine',
              nombreTotalDeQuestion: 10,
              clefUnivers: 'alimentation',
              pourcentageProgression: 100,
              urlImage: 'url2',
            },
            {
              contentId: 'id3',
              estTermine: true,
              label: 'À la maison',
              nombreTotalDeQuestion: 10,
              clefUnivers: 'logement',
              pourcentageProgression: 100,
              urlImage: 'url3',
            },
            {
              contentId: 'id4',
              estTermine: true,
              label: 'En courses',
              nombreTotalDeQuestion: 10,
              clefUnivers: 'consommation',
              pourcentageProgression: 100,
              urlImage: 'url4',
            },
          ],
        });
      }
    });
  });
});
