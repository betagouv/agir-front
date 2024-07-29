import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ClassementRepository } from '@/domaines/classement/ports/classement.repository';
import { Classement, ClassementPourcentage } from '@/domaines/classement/recupererClassement.usecase';

enum PourcentileApiModel {
  pourcent_5 = 'pourcent_5',
  pourcent_10 = 'pourcent_10',
  pourcent_25 = 'pourcent_25',
  pourcent_50 = 'pourcent_50',
}

interface ClassementItemApiModel {
  id: string;
  points: number;
  prenom: string;
  rank: number;
}

interface ClassementApiModel {
  pourcentile: PourcentileApiModel;
  top_trois: ClassementItemApiModel[];
  utilisateur: ClassementItemApiModel;
  classement_utilisateur: ClassementItemApiModel[];
  code_postal: string;
  commune_label: string;
}

export class ClassementRepositoryAxios implements ClassementRepository {
  @intercept401()
  async recupererClassementNational(utilisateurId: string): Promise<Classement> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ClassementApiModel>(`/utilisateurs/${utilisateurId}/classement/national`);

    return {
      utilisateur: response.data.utilisateur,
      topTrois: response.data.top_trois,
      utilisateursProche: response.data.classement_utilisateur,
      pourcentage: this.mapPourcentileToClassement(response.data.pourcentile),
    };
  }

  private mapPourcentileToClassement(apiPourcentile: PourcentileApiModel): ClassementPourcentage {
    switch (apiPourcentile) {
      case PourcentileApiModel.pourcent_5:
        return ClassementPourcentage.top5;
      case PourcentileApiModel.pourcent_10:
        return ClassementPourcentage.top10;
      case PourcentileApiModel.pourcent_25:
        return ClassementPourcentage.top25;
      case PourcentileApiModel.pourcent_50:
        return ClassementPourcentage.top50;
      default:
        return ClassementPourcentage.top50;
    }
  }
}
