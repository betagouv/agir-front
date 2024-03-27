import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';

export class MettreAJourCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  execute(compteUtilisateurInput: CompteUtlisateurViewModel) {
    this.compteUtilisateuRepository.mettreAjour({
      id: compteUtilisateurInput.id,
      abonnementTransport: compteUtilisateurInput.abonnementTransport,
      nom: compteUtilisateurInput.nom,
      mail: compteUtilisateurInput.mail,
      codePostal: compteUtilisateurInput.codePostal,
      commune: compteUtilisateurInput.commune,
      prenom: compteUtilisateurInput.prenom,
      revenuFiscal: compteUtilisateurInput.revenuFiscal,
      nombreDePartsFiscales: compteUtilisateurInput.nombreDePartsFiscales,
      fonctionnalitesDebloquees: compteUtilisateurInput.fonctionnalitesDebloquees,
    });
    this.sessionRepository.sauvegarderUtilisateur({
      nom: compteUtilisateurInput.nom,
      codePostal: compteUtilisateurInput.codePostal,
      commune: compteUtilisateurInput.commune,
      id: compteUtilisateurInput.id,
      abonnementTransport: compteUtilisateurInput.abonnementTransport,
      prenom: compteUtilisateurInput.prenom,
      mail: compteUtilisateurInput.mail,
      revenuFiscal: compteUtilisateurInput.revenuFiscal,
      nombreDePartsFiscales: compteUtilisateurInput.nombreDePartsFiscales,
      fonctionnalitesDebloquees: compteUtilisateurInput.fonctionnalitesDebloquees,
    });
  }
}
