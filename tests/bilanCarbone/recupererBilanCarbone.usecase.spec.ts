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
        details: [
          {
            universId: 'transport',
            universLabel: 'Les transports',
            pourcentage: 31,
            impactKgAnnuel: 2796.1001241487393,
          },
          {
            universId: 'alimentation',
            universLabel: 'En cuisine',
            pourcentage: 24,
            impactKgAnnuel: 2094.1568221,
          },
          {
            universId: 'logement',
            universLabel: 'À la maison',
            pourcentage: 17,
            impactKgAnnuel: 1477.82343812085,
          },
          {
            universId: 'services_societaux',
            universLabel: 'Titre manquant',
            pourcentage: 16,
            impactKgAnnuel: 1450.9052263863641,
          },
          {
            universId: 'consommation',
            universLabel: 'En courses',
            pourcentage: 12,
            impactKgAnnuel: 450.0454437235896,
          },
        ],
      }),
    );

    // WHEN
    await usecase.execute('idUtilisateur', new BilanCarbonePresenterImpl(expectation));

    // THEN
    function expectation(bilanCarboneViewModel: BilanCarboneViewModel) {
      expect(bilanCarboneViewModel).toStrictEqual<BilanCarboneViewModel>({
        impactKgAnnuel: '8.9 tonnes',
        impactKgHebdomadaire: '171 kg',
        details: [
          {
            impactKgAnnuel: '2.8 tonnes',
            pourcentage: 31,
            universLabel: '🚙 Les transports',
          },
          {
            impactKgAnnuel: '2.1 tonnes',
            pourcentage: 24,
            universLabel: '🍛 En cuisine',
          },
          {
            impactKgAnnuel: '1.5 tonnes',
            pourcentage: 17,
            universLabel: '🏡 À la maison',
          },
          {
            impactKgAnnuel: '1.5 tonnes',
            pourcentage: 16,
            universLabel: '🏥 Titre manquant',
          },
          {
            impactKgAnnuel: '450 kg',
            pourcentage: 12,
            universLabel: '👕 En courses',
          },
        ],
      });
    }
  });
});
