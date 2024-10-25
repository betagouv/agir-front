import {
  BilanCarbonePresenterImpl,
  BilanCarboneCompletViewModel,
  BilanCarbonePartielViewModel,
} from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
import {
  BilanCompletCarbone,
  BilanPartielCarbone,
  RecupererBilanCarboneUsecase,
} from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { BilanCarboneRepositoryMock } from './adapters/bilanCarbone.repository.mock';
import {
  BilanCarboneAccueilPresenterImpl,
  BilanCarboneCompletAccueilViewModel,
  BilanCarbonePartielAccueilViewModel,
} from '@/domaines/bilanCarbone/adapters/bilanCarboneAccueil.presenter.impl';

describe('Fichier de tests concernant le chargement du bilan carbone', () => {
  const bilanCarboneCompletMock = new BilanCarboneRepositoryMock({
    bilanCompletEstDispo: true,
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
      universBilan: [
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
    },
    bilanPartiel: {} as BilanPartielCarbone,
  });
  const bilanCarbonePartielMock = new BilanCarboneRepositoryMock({
    bilanCompletEstDispo: false,
    pourcentageCompletionTotal: 90,
    bilanComplet: {} as BilanCompletCarbone,
    bilanPartiel: {
      pourcentageCompletionTotal: 90,
      transport: { niveau: 'moyen' },
      alimentation: { niveau: 'fort' },
      logement: { niveau: 'tres_fort' },
      consommation: { niveau: 'faible' },
      universBilan: [
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
    },
  });

  describe("Quand le bilan est chargé sur la page d'accueil", () => {
    it('Bilan complet', async () => {
      // GIVEN
      const usecase = new RecupererBilanCarboneUsecase(bilanCarboneCompletMock);

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
    it('Bilan partiel', async () => {
      // GIVEN
      const usecase = new RecupererBilanCarboneUsecase(bilanCarbonePartielMock);

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

  describe('Quand le bilan est chargé sur la page bilan', () => {
    it('Bilan complet', async () => {
      // GIVEN
      const usecase = new RecupererBilanCarboneUsecase(bilanCarboneCompletMock);

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        new BilanCarbonePresenterImpl(
          bilanCarboneViewModel => expectation(bilanCarboneViewModel),
          () => {},
        ),
      );

      // THEN
      function expectation(bilanCarboneViewModel: BilanCarboneCompletViewModel) {
        expect(bilanCarboneViewModel).toStrictEqual<BilanCarboneCompletViewModel>({
          titre: 'Mon bilan <span class="text--bleu">environnemental</span>',
          impactKgAnnuel: {
            unite: 'tonnes',
            valeur: '9.6',
          },
          top3: [
            {
              emoji: '🚙',
              label: 'Voiture',
              pourcentage: '31',
            },
            {
              emoji: '🍛',
              label: 'En cuisine',
              pourcentage: '24',
            },
            {
              emoji: '🏡',
              label: 'À la maison',
              pourcentage: '17',
            },
          ],
          univers: [
            {
              details: [
                {
                  emoji: '🚗',
                  impactKgAnnuel: {
                    unite: 'tonnes',
                    valeur: '2.0',
                  },
                  label: 'Voiture',
                  pourcentage: 23,
                },
                {
                  emoji: '✈️',
                  impactKgAnnuel: {
                    unite: 'kg',
                    valeur: '754 ',
                  },
                  label: 'Avion',
                  pourcentage: 8,
                },
              ],
              emoji: '🚦',
              impactKgAnnuel: {
                unite: 'tonnes',
                valeur: '2.8',
              },
              label: 'Les transports',
              pourcentage: 31,
            },
            {
              details: [],
              emoji: '🍴',
              impactKgAnnuel: {
                unite: 'tonnes',
                valeur: '2.1',
              },
              label: 'En cuisine',
              pourcentage: 24,
            },
            {
              details: [],
              emoji: '🏠',
              impactKgAnnuel: {
                unite: 'tonnes',
                valeur: '1.5',
              },
              label: 'À la maison',
              pourcentage: 17,
            },
            {
              details: [],
              emoji: '📦',
              impactKgAnnuel: {
                unite: 'kg',
                valeur: '450 ',
              },
              label: 'En courses',
              pourcentage: 12,
            },
          ],
          thematiquesBilan: [
            {
              contentId: 'id1',
              estTermine: false,
              label: 'Les transports',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 80,
              urlImage: 'url1',
              clefUnivers: 'transports',
            },
            {
              contentId: 'id2',
              estTermine: true,
              label: 'En cuisine',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url2',
              clefUnivers: 'alimentation',
            },
            {
              contentId: 'id3',
              estTermine: true,
              label: 'À la maison',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url3',
              clefUnivers: 'logement',
            },
            {
              contentId: 'id4',
              estTermine: true,
              label: 'En courses',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url4',
              clefUnivers: 'consommation',
            },
          ],
          pourcentageProgressBar: 80,
          nombreDeTonnesAnnuel: '9,6',
        });
      }
    });
    it('Bilan partiel', async () => {
      // GIVEN
      const usecase = new RecupererBilanCarboneUsecase(bilanCarbonePartielMock);

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        new BilanCarbonePresenterImpl(
          () => {},
          bilanCarboneViewModel => expectation(bilanCarboneViewModel),
        ),
      );

      // THEN
      function expectation(bilanCarboneViewModel: BilanCarbonePartielViewModel) {
        expect(bilanCarboneViewModel).toStrictEqual<BilanCarbonePartielViewModel>({
          categories: [
            {
              label: '🚙 Transports',
              tag: {
                classes: 'tag-impact-moyen',
                wording: 'Moyen',
              },
              progressBarStyle: 'progress-bar-impact-moyen',
            },
            {
              label: '🥘 Alimentation',
              tag: {
                classes: 'tag-impact-fort',
                wording: 'Fort',
              },
              progressBarStyle: 'progress-bar-impact-fort',
            },
            {
              label: '🏡 Logement',
              tag: {
                classes: 'tag-impact-tres-fort',
                wording: 'Très fort',
              },
              progressBarStyle: 'progress-bar-impact-tres-fort',
            },
            {
              label: '🛍 Consommation',
              tag: {
                classes: 'tag-impact-faible',
                wording: 'Faible',
              },
              progressBarStyle: 'progress-bar-impact-faible',
            },
          ],
          pourcentageCompletionTotal: 90,
          titre: 'Estimez mon <span class="text--bleu">bilan environnemental</span>',
          thematiquesBilan: [
            {
              contentId: 'id1',
              estTermine: false,
              label: 'Les transports',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 80,
              urlImage: 'url1',
              clefUnivers: 'transports',
            },
            {
              contentId: 'id2',
              estTermine: true,
              label: 'En cuisine',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url2',
              clefUnivers: 'alimentation',
            },
            {
              contentId: 'id3',
              estTermine: true,
              label: 'À la maison',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url3',
              clefUnivers: 'logement',
            },
            {
              contentId: 'id4',
              estTermine: true,
              label: 'En courses',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url4',
              clefUnivers: 'consommation',
            },
          ],
        });
      }
    });
  });
});
