import {
  BilanCarbonePresenterImpl,
  BilanCarboneViewModel,
} from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
import { RecupererBilanCarboneUsecase } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { BilanCarboneRepositoryMock } from './adapters/bilanCarbone.repository.mock';

describe('Fichier de tests concernant le chargement du bilan carbone', () => {
  it("En donnant l'id utilisateur doit charger son bilan carbone", async () => {
    // GIVEN
    const usecase = new RecupererBilanCarboneUsecase(
      new BilanCarboneRepositoryMock({
        impactKgAnnuel: 8898.031054479543,
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
      }),
    );

    // WHEN
    await usecase.execute('idUtilisateur', new BilanCarbonePresenterImpl(expectation));

    // THEN
    function expectation(bilanCarboneViewModel: BilanCarboneViewModel) {
      expect(bilanCarboneViewModel).toStrictEqual<BilanCarboneViewModel>({
        impactKgAnnuel: {
          unite: 'tonnes',
          valeur: '8.9',
        },
        impactKgHebdomadaire: {
          unite: 'kg',
          valeur: '171 ',
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
      });
    }
  });
});
