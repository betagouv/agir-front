import { ClassementPresenter } from '@/domaines/classement/ports/classement.presenter';
import { Classement, ClassementGlobal, ClassementPourcentage } from '@/domaines/classement/recupererClassement.usecase';

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

export interface ClassementGlobalViewModel {
  commune: string;
  classementNational: ClassementViewModel;
  classementLocal: ClassementViewModel;
}

export class ClassementPresenterImpl implements ClassementPresenter {
  constructor(private readonly classementViewModel: (viewModel: ClassementGlobalViewModel) => void) {}

  presente(classement: ClassementGlobal) {
    const { id: utilisateurId } = classement.utilisateur;
    const { classementNational, classementLocal, commune } = classement;

    this.classementViewModel({
      commune,
      classementNational: {
        phraseClassement: this.determinePhraseClassementNational(classementNational.pourcentage),
        classement: [
          ...this.determineTopTrois(classementNational, utilisateurId),
          ...this.determineUtilisateursProche(classementNational, utilisateurId),
        ],
      },
      classementLocal: {
        phraseClassement: this.determinePhraseClassementLocal(classementLocal.pourcentage, commune),
        classement: [
          ...this.determineTopTrois(classementLocal, utilisateurId),
          ...this.determineUtilisateursProche(classementLocal, utilisateurId),
        ],
      },
    });
  }

  private determineTopTrois(classement: Classement, idUtilisateur: string): ClassementItemViewModel[] {
    return classement.topTrois.map(utilisateur => ({
      prenom: utilisateur.pseudo,
      rang: utilisateur.rank,
      points: utilisateur.points,
      style: utilisateur.id === idUtilisateur ? 'background-bleu-light border--bleu' : 'background--white',
      medailleTopTrois: this.determineMedaille(utilisateur.rank),
    }));
  }

  private determineUtilisateursProche(classement: Classement, utilisateurId): ClassementItemViewModel[] {
    return classement.utilisateursProche
      .filter(utilisateur => utilisateur.rank !== 1 && utilisateur.rank !== 2 && utilisateur.rank !== 3)
      .map((utilisateur, index) => ({
        prenom: utilisateur.pseudo,
        rang: utilisateur.rank,
        points: utilisateur.points,
        style: this.determineStyle(index, classement.utilisateursProche.length, utilisateur.id, utilisateurId),
      }));
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

  private determinePhraseClassementLocal(pourcentage: ClassementPourcentage, commune: string): string {
    switch (pourcentage) {
      case ClassementPourcentage.top5:
        return `Wouah ! Vous faites partie du <strong>top 5%</strong> à <strong>${commune}&nbsp;!</strong>`;
      case ClassementPourcentage.top10:
        return `Wouah ! Vous faites partie du <strong>top 10%</strong> à <strong>${commune}&nbsp!</strong>`;
      case ClassementPourcentage.top25:
        return `Wouah ! Vous faites partie du <strong>top 25%</strong> à <strong>${commune}&nbsp!</strong>`;
      case ClassementPourcentage.top50:
        return `Wouah ! Vous faites partie du <strong>top 50%</strong> à <strong>${commune}&nbsp!</strong>`;
      default:
        return "Continuez à gagner des points en réalisant des actions sur J'agis pour améliorer votre classement.";
    }
  }

  private determinePhraseClassementNational(pourcentage: ClassementPourcentage): string {
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
        return "Continuez à gagner des points en réalisant des actions sur J'agis pour améliorer votre classement.";
    }
  }

  private determineMedaille(index: number): string {
    switch (index) {
      case 1:
        return '/medaille-or.webp';
      case 2:
        return '/medaille-argent.webp';
      case 3:
        return '/medaille-bronze.webp';
      default:
        return '';
    }
  }
}
