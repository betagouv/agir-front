import { CompteUtilisateurRepository } from "@/compte/ports/compteUtilisateur.repository";

export class SupprimerCompteUtilisateurUsecase {
  constructor(private compteUtilisateuRepository: CompteUtilisateurRepository) {}

  execute(utilisateurId: string) {
    this.compteUtilisateuRepository.supprimerCompteUtilisateur(utilisateurId);
  }
}
