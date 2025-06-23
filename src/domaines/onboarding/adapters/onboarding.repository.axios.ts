import { AxiosFactory } from '@/axios.factory';
import { OnboardingRepository } from '@/domaines/onboarding/ports/onboarding.repository';

export class OnboardingRepositoryAxios implements OnboardingRepository {
  async validationEtape1(
    idUtilisateur: string,
    pseudo: string,
    dateDeNaissance?: {
      jour: string;
      mois: string;
      annee: string;
    },
  ): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/profile`, {
      pseudo: pseudo,
    });

    if (dateDeNaissance) {
      await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/profile`, {
        annee_naissance: dateDeNaissance.annee,
        mois_naissance: dateDeNaissance.mois,
        jour_naissance: dateDeNaissance.jour,
      });
    }
  }

  async validationEtape2(
    idUtilisateur: string,
    infoCommune: {
      codeEpci: string;
      codePostal: string;
    },
  ): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();

    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/logement`, {
      code_commune: infoCommune.codeEpci,
      code_postal: infoCommune.codePostal,
    });
  }
}
