import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { Score } from '@/domaines/score/ports/score.repository';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void;

  sauvegarderScore(score: Score): void;

  deconnecterUtilisateur(): void;

  getUtilisateurId(): string;

  estConnecte(): boolean;
}
