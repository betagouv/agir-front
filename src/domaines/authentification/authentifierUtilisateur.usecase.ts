import { Utilisateur, UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';
import { Score } from '@/domaines/score/ports/score.repository';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void;
  nouvelleFeatureDebloquee(featureDebloquee: string): void;
  sauvegarderScore(score: Score): void;
}

export class AuthentifierUtilisateurUsecase {
  constructor(private readonly utilisateurRepository: UtilisateurRepository) {}

  async execute(email: string, password: string): Promise<void> {
    await this.utilisateurRepository.authentifierUtilisateur(email, password);
  }
}
