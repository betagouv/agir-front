import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { ProfileUtilisateurRepository } from '@/profileUtilisateur/ports/profileUtilisateur.repository';

import { ProfileUtilisateurViewModel } from '@/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';

export class MettreAJourProfileUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: ProfileUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  execute(compteUtilisateurInput: ProfileUtilisateurViewModel) {
    this.compteUtilisateuRepository.mettreAjour({
      id: compteUtilisateurInput.id,
      abonnementTransport: compteUtilisateurInput.abonnementTransport,
      nom: compteUtilisateurInput.nom,
      mail: compteUtilisateurInput.mail,
      prenom: compteUtilisateurInput.prenom,
      revenuFiscal: compteUtilisateurInput.revenuFiscal,
      nombreDePartsFiscales: compteUtilisateurInput.nombreDePartsFiscales,
    });
    this.sessionRepository.sauvegarderUtilisateur({
      prenom: compteUtilisateurInput.prenom,
      nom: compteUtilisateurInput.nom,
      mail: compteUtilisateurInput.mail,
    });
  }
}
