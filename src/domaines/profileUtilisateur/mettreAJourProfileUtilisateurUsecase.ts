import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { ProfileUtilisateurViewModel } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';

export class MettreAJourProfileUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: ProfileUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(compteUtilisateurInput: ProfileUtilisateurViewModel): Promise<void> {
    await this.compteUtilisateuRepository.mettreAjour({
      id: compteUtilisateurInput.id,
      abonnementTransport: compteUtilisateurInput.abonnementTransport,
      nom: compteUtilisateurInput.nom,
      prenom: compteUtilisateurInput.prenom,
      revenuFiscal: compteUtilisateurInput.revenuFiscal,
      nombreDePartsFiscales: compteUtilisateurInput.nombreDePartsFiscales,
      anneeNaissance: compteUtilisateurInput.anneeNaissance ? Number(compteUtilisateurInput.anneeNaissance) : undefined,
    });
    this.sessionRepository.sauvegarderUtilisateur({
      id: compteUtilisateurInput.id,
      prenom: compteUtilisateurInput.prenom,
      nom: compteUtilisateurInput.nom,
    });
  }
}
