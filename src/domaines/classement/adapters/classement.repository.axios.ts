import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ClassementRepository } from '@/domaines/classement/ports/classement.repository';
import { Classement } from '@/domaines/classement/recupererClassementNational.usecase';

enum Pourcentile {
  pourcent_5 = 'pourcent_5',
  pourcent_10 = 'pourcent_10',
  pourcent_25 = 'pourcent_25',
  pourcent_50 = 'pourcent_50',
}

interface ClassementItemApiModel {
  points: number;
  prenom: string;
  rank: number;
}

interface ClassementApiModel {
  pourcentile: Pourcentile;
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
      pourcentage: response.data.pourcentile,
    };
  }
}
