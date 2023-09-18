import { CompteUtilisateurRepository } from "@/compte/ports/compteUtilisateur.repository";

export class SupprimerCompteUtilisateurUsecase {
  private _compteUtilisateuRepository: CompteUtilisateurRepository;

  constructor(compteUtilisateuRepository: CompteUtilisateurRepository) {
    this._compteUtilisateuRepository = compteUtilisateuRepository;
  }

  execute(utilisateurId: string) {
    this._compteUtilisateuRepository.supprimerCompteUtilisateur(utilisateurId);
  }
}
