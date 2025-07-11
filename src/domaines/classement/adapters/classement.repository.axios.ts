import { AxiosFactory, intercept40X } from '@/axios.factory';
import { ClassementRepository } from '@/domaines/classement/ports/classement.repository';
import { ClassementGlobal, ClassementPourcentage } from '@/domaines/classement/recupererClassement.usecase';
import { Badge, TypeDeBadge } from '@/domaines/score/ports/score.repository';

enum PourcentileApiModel {
  pourcent_5 = 'pourcent_5',
  pourcent_10 = 'pourcent_10',
  pourcent_25 = 'pourcent_25',
  pourcent_50 = 'pourcent_50',
}

interface ClassementItemApiModel {
  id: string;
  points: number;
  pseudo: string;
  rank: number;
}

interface ClassementApiModel {
  pourcentile: PourcentileApiModel;
  top_trois: ClassementItemApiModel[];
  utilisateur: ClassementItemApiModel;
  classement_utilisateur: ClassementItemApiModel[];
  code_postal: string;
  commune_label: string;
  badges: {
    type: string;
    titre: string;
    description: string;
  }[];
}

export class ClassementRepositoryAxios implements ClassementRepository {
  @intercept40X()
  async recupererClassementNational(utilisateurId: string): Promise<ClassementGlobal> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponseClassementNational = await axiosInstance.get<ClassementApiModel>(
      `/utilisateurs/${utilisateurId}/classement/national`,
    );
    const reponseClassementLocal = await axiosInstance.get<ClassementApiModel>(
      `/utilisateurs/${utilisateurId}/classement/local`,
    );

    return {
      utilisateur: reponseClassementLocal.data.utilisateur,
      commune: reponseClassementLocal.data.commune_label,
      classementLocal: {
        topTrois: reponseClassementLocal.data.top_trois,
        utilisateursProche: reponseClassementLocal.data.classement_utilisateur,
        pourcentage: this.mapPourcentileToClassement(reponseClassementLocal.data.pourcentile),
      },
      classementNational: {
        topTrois: reponseClassementNational.data.top_trois,
        utilisateursProche: reponseClassementNational.data.classement_utilisateur,
        pourcentage: this.mapPourcentileToClassement(reponseClassementNational.data.pourcentile),
      },
      badges: reponseClassementNational.data.badges.map(badge => {
        return new Badge(badge.type as TypeDeBadge, badge.titre, badge.description);
      }),
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
