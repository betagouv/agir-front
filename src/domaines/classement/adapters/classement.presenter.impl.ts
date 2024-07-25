import { ClassementPresenter } from '@/domaines/classement/ports/classement.presenter';
import { Classement } from '@/domaines/classement/recupererClassementNational.usecase';

interface ClassementItemViewModel {
  prenom: string;
  rang: number;
  points: number;
}

export interface ClassementViewModel {
  topTrois: ClassementItemViewModel[];
  utilisateursProche: ClassementItemViewModel[];
}

export class ClassementPresenterImpl implements ClassementPresenter {
  constructor(private readonly classementViewModel: (viewModel: ClassementViewModel) => void) {}

  presente(classement: Classement) {
    this.classementViewModel({
      topTrois: classement.topTrois.map(utilisateur => ({
        prenom: utilisateur.prenom,
        rang: utilisateur.rank,
        points: utilisateur.points,
      })),
      utilisateursProche: classement.utilisateursProche.map(utilisateur => ({
        prenom: utilisateur.prenom,
        rang: utilisateur.rank,
        points: utilisateur.points,
      })),
    });
  }
}
