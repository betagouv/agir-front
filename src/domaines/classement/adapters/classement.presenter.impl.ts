import { ClassementPresenter } from '@/domaines/classement/ports/classement.presenter';
import { Classement, ClassementPourcentage } from '@/domaines/classement/recupererClassement.usecase';

interface ClassementItemViewModel {
  prenom: string;
  rang: number;
  points: number;
  style: string;
  medailleTopTrois?: string;
}

export interface ClassementViewModel {
  phraseClassement: string;
  classement: ClassementItemViewModel[];
}

export class ClassementPresenterImpl implements ClassementPresenter {
  constructor(private readonly classementViewModel: (viewModel: ClassementViewModel) => void) {}

  presente(classement: Classement) {
    const topTrois = classement.topTrois.map(utilisateur => ({
      prenom: utilisateur.prenom,
      rang: utilisateur.rank,
      points: utilisateur.points,
      style: 'background--white',
      medailleTopTrois: this.determineMedaille(utilisateur.rank),
    }));

    const utilisateursProche = classement.utilisateursProche
      .filter(utilisateur => utilisateur.rank !== 1 && utilisateur.rank !== 2 && utilisateur.rank !== 3)
      .map((utilisateur, index) => ({
        prenom: utilisateur.prenom,
        rang: utilisateur.rank,
        points: utilisateur.points,
        style: this.determineStyle(
          index,
          classement.utilisateursProche.length,
          utilisateur.id,
          classement.utilisateur.id,
        ),
      }));

    this.classementViewModel({
      classement: [...topTrois, ...utilisateursProche],
      phraseClassement: this.determinePhraseClassement(classement.pourcentage),
    });
  }

  private determineStyle(
    index: number,
    classementLength: number,
    idUtilisateur: string,
    idUtilisateurCourant: string,
  ): string {
    if (idUtilisateur === idUtilisateurCourant) {
      return 'background-bleu-light border--bleu';
    }

    if (index === 0 || index === classementLength - 1) {
      return 'opacity-8';
    }

    return 'background--white';
  }

  private determinePhraseClassement(pourcentage: ClassementPourcentage): string {
    switch (pourcentage) {
      case ClassementPourcentage.top5:
        return 'Wouah ! Vous faites partie du <strong>top 5%</strong> en <strong>France&nbsp;!</strong>';
      case ClassementPourcentage.top10:
        return 'Wouah ! Vous faites partie du <strong>top 10%</strong> en <strong>France&nbsp!</strong>';
      case ClassementPourcentage.top25:
        return 'Wouah ! Vous faites partie du <strong>top 25%</strong> en <strong>France&nbsp!</strong>';
      case ClassementPourcentage.top50:
        return 'Wouah ! Vous faites partie du <strong>top 50%</strong> en <strong>France&nbsp!</strong>';
      default:
        return "Réalisez plus d'actions pour grimper au classement !";
    }
  }

  private determineMedaille(index: number): string {
    switch (index) {
      case 1:
        return '/medaille-or.png';
      case 2:
        return '/medaille-argent.png';
      case 3:
        return '/medaille-bronze.png';
      default:
        return '';
    }
  }
}
