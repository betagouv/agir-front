import { OnboardingRepository } from '@/onboarding/ports/onboardingRepository';
import { OnboardingResultatPresenter } from '@/onboarding/ports/onboardingResultat.presenter';

export interface EtapeConsommation {
  consommation: string;
  done: boolean;
}

export interface EtapeAlimentation {
  repas: string;
  done: boolean;
}

export interface EtapeLogement {
  code_postal: string;
  adultes: number;
  enfants: number;
  residence: string;
  proprietaire: boolean;
  superficie: string;
  chauffage: string;
  done: boolean;
}

export interface EtapeTransportState {
  transports: string[];
  avion: number;
  done: boolean;
}

export interface OnboardingState {
  etapeTransport: EtapeTransportState;
  etapeLogement: EtapeLogement;
  etapeAlimentation: EtapeAlimentation;
  etapeConsommation: EtapeConsommation;
}

export interface OnboardingResultat {
  transports: number;
  consommation: number;
  logement: number;
  alimentation: number;
}
export class EvaluerOnboardingUsecase {
  constructor(private onboardinRepository: OnboardingRepository) {}

  async execute(onboarding: OnboardingState, presenter: OnboardingResultatPresenter) {
    const resultat = await this.onboardinRepository.envoyer(onboarding);
    presenter.presente(resultat);
  }
}
