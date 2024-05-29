import { ReponseVerification } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';

export interface VerificationMailPresenter {
  presente(reponse: ReponseVerification): void;
}
