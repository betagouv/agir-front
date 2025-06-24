export interface OnboardingRepository {
  validationEtape1(
    idUtilisateur: string,
    pseudo: string,
    dateDeNaissance?: {
      jour: string;
      mois: string;
      annee: string;
    },
  ): Promise<void>;

  validationEtape2(
    idUtilisateur: string,
    infoCommune: {
      codeEpci: string;
      codePostal: string;
    },
  ): Promise<void>;
}
