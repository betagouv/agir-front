import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { CompteUtilisateurPresenter } from '@/compte/ports/compteUtilisateur.presenter';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';

export class ChargerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository
  ) {}

  async execute(utilisateurId: string, compteUtilisateurPresenter: CompteUtilisateurPresenter): Promise<void> {
    this.compteUtilisateuRepository.getCompteUtilisateur(utilisateurId).then(compte => {
      compteUtilisateurPresenter.presente(compte);
      this.sessionRepository.sauvegarderUtilisateur({
        nom: compte.nom,
        codePostal: compte.codePostal,
        commune: compte.commune,
        id: compte.id,
        abonnementTransport: compte.abonnementTransport,
        prenom: compte.prenom,
        mail: compte.mail,
        revenuFiscal: compte.revenuFiscal || 0,
        nombreDePartsFiscales: compte.nombreDePartsFiscales,
        fonctionnalitesDebloquees: compte.fonctionnalitesDebloquees,
      });
    });
  }
}
