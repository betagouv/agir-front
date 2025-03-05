import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';

export type ProfileAMettreAJourInput = {
  id: string;
  abonnementTransport: boolean;
  nom: string;
  prenom: string;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  anneeNaissance?: string;
  pseudo: string;
  nomPrenomModifiables: boolean;
};

export class MettreAJourProfileUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: ProfileUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(compteUtilisateurInput: ProfileAMettreAJourInput): Promise<void> {
    if (compteUtilisateurInput.nomPrenomModifiables) {
      await this.compteUtilisateuRepository.mettreAjour({
        id: compteUtilisateurInput.id,
        abonnementTransport: compteUtilisateurInput.abonnementTransport,
        nom: compteUtilisateurInput.nom,
        prenom: compteUtilisateurInput.prenom,
        revenuFiscal: compteUtilisateurInput.revenuFiscal,
        nombreDePartsFiscales: compteUtilisateurInput.nombreDePartsFiscales,
        anneeNaissance: compteUtilisateurInput.anneeNaissance
          ? Number(compteUtilisateurInput.anneeNaissance)
          : undefined,
        pseudo: compteUtilisateurInput.pseudo,
      });
    } else {
      await this.compteUtilisateuRepository.mettreAjourUtilisateurFranceConnecte({
        id: compteUtilisateurInput.id,
        abonnementTransport: compteUtilisateurInput.abonnementTransport,
        revenuFiscal: compteUtilisateurInput.revenuFiscal,
        nombreDePartsFiscales: compteUtilisateurInput.nombreDePartsFiscales,
        anneeNaissance: compteUtilisateurInput.anneeNaissance
          ? Number(compteUtilisateurInput.anneeNaissance)
          : undefined,
        pseudo: compteUtilisateurInput.pseudo,
      });
    }
    this.sessionRepository.sauvegarderUtilisateur({
      id: compteUtilisateurInput.id,
      prenom: compteUtilisateurInput.prenom,
      nom: compteUtilisateurInput.nom,
      pseudo: compteUtilisateurInput.pseudo,
    });
  }
}
