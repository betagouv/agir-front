import {
  BilanCarboneAFaireViewModel,
  BilanCarboneCompletViewModel,
  BilanCarbonePartielViewModel,
  BilanCarbonePresenterImpl,
} from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
import { RecupererBilanCarboneUsecase } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { BilanCarboneRepositoryMock } from './adapters/bilanCarbone.repository.mock';
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
        label: 'Mes achats',
        urlImage: 'url4',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.consommation,
      },
    ],
  });
  const bilanCarbonePartielMock = new BilanCarboneRepositoryMock({
    pourcentageCompletionTotal: 90,
    bilanPartiel: {
      pourcentageCompletionTotal: 90,
      transport: { niveau: 'moyen' },
      alimentation: { niveau: 'fort' },
      logement: { niveau: 'tres_fort' },
      consommation: { niveau: 'faible' },
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
        label: 'Mes achats',
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
        label: 'Mes achats',
        urlImage: 'url4',
        estTermine: true,
        pourcentageProgression: 100,
        nombreTotalDeQuestion: 10,
        clefUnivers: ClefThematiqueAPI.consommation,
      },
    ],
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
              label: 'Me nourrir',
              pourcentage: '24',
            },
            {
              emoji: '🏡',
              label: 'Me loger',
              pourcentage: '17',
            },
          ],
          univers: [
            {
              details: [
                {
                  emoji: '🚅',
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
              label: 'Me déplacer',
              pourcentage: 31,
            },
            {
              details: [],
              emoji: '🍴',
              impactKgAnnuel: {
                unite: 'tonnes',
                valeur: '2.1',
              },
              label: 'Me nourrir',
              pourcentage: 24,
            },
            {
              details: [],
              emoji: '🏠',
              impactKgAnnuel: {
                unite: 'tonnes',
                valeur: '1.5',
              },
              label: 'Me loger',
              pourcentage: 17,
            },
            {
              details: [],
              emoji: '📦',
              impactKgAnnuel: {
                unite: 'kg',
                valeur: '450 ',
              },
              label: 'Mes achats',
              pourcentage: 12,
            },
          ],
          thematiquesBilan: [
            {
              contentId: 'id1',
              estTermine: false,
              label: 'Me déplacer',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 80,
              urlImage: 'url1',
              clefUnivers: 'transport',
            },
            {
              contentId: 'id2',
              estTermine: true,
              label: 'Me nourrir',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url2',
              clefUnivers: 'alimentation',
            },
            {
              contentId: 'id3',
              estTermine: true,
              label: 'Me loger',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url3',
              clefUnivers: 'logement',
            },
            {
              contentId: 'id4',
              estTermine: true,
              label: 'Mes achats',
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
          () => {},
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
              label: 'Me déplacer',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 80,
              urlImage: 'url1',
              clefUnivers: 'transport',
            },
            {
              contentId: 'id2',
              estTermine: true,
              label: 'Me nourrir',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url2',
              clefUnivers: 'alimentation',
            },
            {
              contentId: 'id3',
              estTermine: true,
              label: 'Me loger',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url3',
              clefUnivers: 'logement',
            },
            {
              contentId: 'id4',
              estTermine: true,
              label: 'Mes achats',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url4',
              clefUnivers: 'consommation',
            },
          ],
        });
      }
    });
    it('Bilan à faire', async () => {
      // GIVEN
      const usecase = new RecupererBilanCarboneUsecase(bilanCarboneAFaireMock);

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        new BilanCarbonePresenterImpl(
          () => {},
          () => {},
          bilanCarboneViewModel => expectation(bilanCarboneViewModel),
        ),
      );

      // THEN
      function expectation(bilanCarboneViewModel: BilanCarboneAFaireViewModel) {
        expect(bilanCarboneViewModel).toStrictEqual<BilanCarboneAFaireViewModel>({
          pourcentageCompletionTotal: 90,
          thematiquesBilan: [
            {
              contentId: 'id1',
              estTermine: false,
              label: 'Me déplacer',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 80,
              urlImage: 'url1',
              clefUnivers: 'transport',
            },
            {
              contentId: 'id2',
              estTermine: true,
              label: 'Me nourrir',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url2',
              clefUnivers: 'alimentation',
            },
            {
              contentId: 'id3',
              estTermine: true,
              label: 'Me loger',
              nombreTotalDeQuestion: 10,
              pourcentageProgression: 100,
              urlImage: 'url3',
              clefUnivers: 'logement',
            },
            {
              contentId: 'id4',
              estTermine: true,
              label: 'Mes achats',
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
