import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { CompteUtilisateurPresenter } from '@/compte/ports/compteUtilisateur.presenter';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { Evenemement, PublierEvenementRepository } from '@/shell/ports/publierEvenement.repository';

export class ChargerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
    private publierEvenementRepository: PublierEvenementRepository
  ) {}

  async execute(utilisateurId: string, compteUtilisateurPresenter: CompteUtilisateurPresenter): Promise<void> {
    this.compteUtilisateuRepository.getCompteUtilisateur(utilisateurId).then(compte => {
      this.publierEvenementRepository.publierEvenement(utilisateurId, Evenemement.COMPTE_CONSULTE);
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
