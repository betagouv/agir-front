import { AxiosFactory } from '@/axios.factory';
import { OnboardingResultat, OnboardingState } from '@/domaines/onboarding/evaluerOnboarding.usecase';
import { OnboardingRepository } from '@/domaines/onboarding/ports/onboardingRepository';

interface OnboardingPhraseCoachResultatApiModel {
  icon: string;
  phrase: string;
}

interface OnboardingResultatApiModel {
  transports: number;
  consommation: number;
  logement: number;
  alimentation: number;
  phrase: string;
  phrase_1: OnboardingPhraseCoachResultatApiModel;
  phrase_2: OnboardingPhraseCoachResultatApiModel;
  phrase_3: OnboardingPhraseCoachResultatApiModel;
  phrase_4: OnboardingPhraseCoachResultatApiModel;
}
export class OnboardingRepositoryAxios implements OnboardingRepository {
  async envoyer(onboarding: OnboardingState): Promise<OnboardingResultat> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<OnboardingResultatApiModel>(`/utilisateurs/evaluate-onboarding`, {
      transports: onboarding.etapeTransport.transports,
      avion: onboarding.etapeTransport.avion,
      code_postal: onboarding.etapeLogement.code_postal,
      commune: onboarding.etapeLogement.commune,
      adultes: onboarding.etapeLogement.adultes,
      enfants: onboarding.etapeLogement.enfants,
      residence: onboarding.etapeLogement.residence,
      proprietaire: onboarding.etapeLogement.proprietaire,
      superficie: onboarding.etapeLogement.superficie,
      chauffage: onboarding.etapeLogement.chauffage,
      repas: onboarding.etapeAlimentation.repas,
      consommation: onboarding.etapeConsommation.consommation,
    });

    return {
      transports: response.data.transports,
      consommation: response.data.consommation,
      logement: response.data.logement,
      alimentation: response.data.alimentation,
      phrase: response.data.phrase,
      phrases: [response.data.phrase_1, response.data.phrase_2, response.data.phrase_3, response.data.phrase_4],
    };
  }
}
