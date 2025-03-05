import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';

export type ProfileAMettreAJour = {
  id: string;
  abonnementTransport: boolean;
  nom: string;
  prenom: string;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  anneeNaissance?: string;
  pseudo: string;
};

export class MettreAJourProfileUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: ProfileUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(compteUtilisateurInput: ProfileAMettreAJour): Promise<void> {
    await this.compteUtilisateuRepository.mettreAjour({
      id: compteUtilisateurInput.id,
      abonnementTransport: compteUtilisateurInput.abonnementTransport,
      nom: compteUtilisateurInput.nom,
      prenom: compteUtilisateurInput.prenom,
      revenuFiscal: compteUtilisateurInput.revenuFiscal,
      nombreDePartsFiscales: compteUtilisateurInput.nombreDePartsFiscales,
      anneeNaissance: compteUtilisateurInput.anneeNaissance ? Number(compteUtilisateurInput.anneeNaissance) : undefined,
      pseudo: compteUtilisateurInput.pseudo,
    });
    this.sessionRepository.sauvegarderUtilisateur({
      id: compteUtilisateurInput.id,
      prenom: compteUtilisateurInput.prenom,
      nom: compteUtilisateurInput.nom,
      pseudo: compteUtilisateurInput.pseudo,
    });
  }
}
