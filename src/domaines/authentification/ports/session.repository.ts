import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void;

  deconnecterUtilisateur(): void;

  getUtilisateurId(): string;

  estConnecte(): boolean;
}
