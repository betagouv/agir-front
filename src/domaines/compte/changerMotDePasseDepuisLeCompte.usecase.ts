import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';

export class ChangerMotDePasseDepuisLeCompteUsecase {
  constructor(private compteUtilisateurRepository: CompteUtilisateurRepository) {}
  async execute(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    await this.compteUtilisateurRepository.mettreAJourLeMotDePasse(idUtilisateur, nouveauMotDePasse);
  }
}
