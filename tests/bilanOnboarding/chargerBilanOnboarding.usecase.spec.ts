import {
  BilanOnboardingPresenterImpl,
  OnboardingBilanViewModel,
} from '@/bilanOnboarding/adapters/bilanOnboarding.presenter.impl';
import { ChargerBilanOnboardingUsecase } from '@/bilanOnboarding/chargerBilanOnboarding.usecase';
import { BilanOnboarding, BilanOnboardingRepository } from '@/bilanOnboarding/ports/bilanOnboarding.repository';

class BilanOnboardingRepositoryTest implements BilanOnboardingRepository {
  recupererBilanOnboarding(_utilisateurId: string): Promise<BilanOnboarding> {
    return Promise.resolve<BilanOnboarding>({
      alimentation: 2,
      transports: 3,
      logement: 1,
      consommation: 4,
    });
  }
}

describe("Fichier de tests concernant la récupération du bilan de l'onboarding", () => {
  it("En donnant l'id d'un utilisateur doit presenter un resultat trié par valeur décroissante", async () => {
    // GIVEN

    // WHEN THEN
    const usecase = new ChargerBilanOnboardingUsecase(new BilanOnboardingRepositoryTest());
    await usecase.execute(
      'utilisateurId',
      new BilanOnboardingPresenterImpl(resultat => {
        expect(resultat.resultat).toStrictEqual<OnboardingBilanViewModel['resultat']>([
          {
            libelle: '🛒 Consommation',
            valeur: 4,
          },
          {
            libelle: '🚗 Transports',
            valeur: 3,
          },
          {
            libelle: '🥦 Alimentation',
            valeur: 2,
          },
          {
            libelle: '🏡 Logement',
            valeur: 1,
          },
        ]);
      })
    );
  });
});
