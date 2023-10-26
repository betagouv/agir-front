import {
  EvaluerOnboardingUsecase,
  OnboardingResultat,
  OnboardingState,
} from '../../src/onboarding/evaluerOnboarding.usecase';
import { OnboardingRepository } from '../../src/onboarding/ports/onboardingRepository';
import {
  OnboardingResultatPresenterImpl,
  OnboardingResultatViewModel,
} from '../../src/onboarding/adapters/onboarding.presenter.impl';

class OnboardingRespoitoryForTest implements OnboardingRepository {
  envoyer(onboarding: OnboardingState): Promise<OnboardingResultat> {
    return Promise.resolve({
      transports: 4,
      consommation: 1,
      logement: 2,
      alimentation: 3,
      phrase: 'Hello world !',
      phrases: [
        {
          icon: 'icon1',
          phrase: 'phrase 1',
        },
        {
          icon: 'icon2',
          phrase: 'phrase 2',
        },
        {
          icon: 'icon3',
          phrase: 'phrase 3',
        },
        {
          icon: 'icon4',
          phrase: 'phrase 4',
        },
      ],
    });
  }
}
describe("Fichier de tests concernant l'evaluation de l'onboarding", () => {
  it("En donnant des données d'onboarding doit presenter un resultat trié par valeur décroissante", async () => {
    // GIVEN
    const onboardingState = {
      etapeTransport: {
        transports: [],
        avion: 0,
        done: true,
      },
      etapeLogement: {
        code_postal: '',
        adultes: 0,
        enfants: 0,
        residence: '',
        proprietaire: false,
        superficie: '',
        chauffage: '',
        done: true,
      },
      etapeAlimentation: {
        repas: '',
        done: true,
      },
      etapeConsommation: {
        consommation: '',
        done: true,
      },
    };
    // WHEN THEN
    const usecase = new EvaluerOnboardingUsecase(new OnboardingRespoitoryForTest());
    await usecase.execute(
      onboardingState,
      new OnboardingResultatPresenterImpl(resultat => {
        expect(resultat.resultat).toStrictEqual<OnboardingResultatViewModel['resultat']>([
          {
            libelle: '🚗 Transports',
            valeur: 4,
          },
          {
            libelle: '🥦 Alimentation',
            valeur: 3,
          },
          {
            libelle: '🏡 Logement',
            valeur: 2,
          },
          {
            libelle: '🛒 Consommation',
            valeur: 1,
          },
        ]);
      })
    );
  });

  it("En donnant des données d'onboarding doit presenter les phrases personnalisées par le coach", async () => {
    // GIVEN
    const onboardingState = {
      etapeTransport: {
        transports: [],
        avion: 0,
        done: true,
      },
      etapeLogement: {
        code_postal: '',
        adultes: 0,
        enfants: 0,
        residence: '',
        proprietaire: false,
        superficie: '',
        chauffage: '',
        done: true,
      },
      etapeAlimentation: {
        repas: '',
        done: true,
      },
      etapeConsommation: {
        consommation: '',
        done: true,
      },
    };
    // WHEN THEN
    const usecase = new EvaluerOnboardingUsecase(new OnboardingRespoitoryForTest());
    await usecase.execute(
      onboardingState,
      new OnboardingResultatPresenterImpl(resultat => {
        expect(resultat.phrases).toStrictEqual<OnboardingResultatViewModel['phrases']>([
          {
            icon: 'icon1',
            phrase: 'phrase 1',
          },
          {
            icon: 'icon2',
            phrase: 'phrase 2',
          },
          {
            icon: 'icon3',
            phrase: 'phrase 3',
          },
          {
            icon: 'icon4',
            phrase: 'phrase 4',
          },
        ]);
      })
    );
  });
});
