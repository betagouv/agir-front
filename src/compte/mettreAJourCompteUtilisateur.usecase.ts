import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';

export class MettreAJourCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository
  ) {}

  execute(compteUtilisateurInput: CompteUtlisateurViewModel) {
    this.compteUtilisateuRepository.mettreAjour({
      id: compteUtilisateurInput.id,
      nom: compteUtilisateurInput.nom,
      mail: compteUtilisateurInput.mail,
      codePostal: compteUtilisateurInput.codePostal,
      commune: compteUtilisateurInput.commune,
      prenom: compteUtilisateurInput.prenom,
      revenuFiscal: compteUtilisateurInput.revenuFiscal !== '' ? Number(compteUtilisateurInput.revenuFiscal) : null,
    });
    this.sessionRepository.sauvegarderUtilisateur({
      nom: compteUtilisateurInput.nom,
      codePostal: compteUtilisateurInput.codePostal,
      commune: compteUtilisateurInput.commune,
      id: compteUtilisateurInput.id,
      prenom: compteUtilisateurInput.prenom,
      mail: compteUtilisateurInput.mail,
      revenuFiscal: compteUtilisateurInput.revenuFiscal !== '' ? Number(compteUtilisateurInput.revenuFiscal) : null,
    });
  }
}
