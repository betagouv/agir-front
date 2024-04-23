import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { CompteUtilisateurPresenter } from '@/compte/ports/compteUtilisateur.presenter';
import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';

export class ChargerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(utilisateurId: string, compteUtilisateurPresenter: CompteUtilisateurPresenter): Promise<void> {
    this.compteUtilisateuRepository.getCompteUtilisateur(utilisateurId).then(compte => {
      compteUtilisateurPresenter.presente(compte);
      this.sessionRepository.sauvegarderUtilisateur({
        nom: compte.nom,
        id: compte.id,
        prenom: compte.prenom,
        mail: compte.mail,
        fonctionnalitesDebloquees: compte.fonctionnalitesDebloquees,
      });
    });
  }
}
