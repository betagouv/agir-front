import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { ProfileUtilisateurViewModel } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';

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
