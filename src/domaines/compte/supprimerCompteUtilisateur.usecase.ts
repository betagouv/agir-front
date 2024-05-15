import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';

export class SupprimerCompteUtilisateurUsecase {
  constructor(private compteUtilisateuRepository: CompteUtilisateurRepository) {}

  execute(utilisateurId: string) {
    this.compteUtilisateuRepository.supprimerCompteUtilisateur(utilisateurId);
  }
}
