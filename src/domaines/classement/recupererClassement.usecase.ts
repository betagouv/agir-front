import { ClassementPresenter } from '@/domaines/classement/ports/classement.presenter';
import { ClassementRepository } from '@/domaines/classement/ports/classement.repository';

export enum ClassementPourcentage {
  top5 = 'pourcent_5',
  top10 = 'pourcent_10',
  top25 = 'pourcent_25',
  top50 = 'pourcent_50',
}

interface ClassementItem {
  id: string;
  points: number;
  rank: number;
  pseudo: string;
}

export interface Classement {
  pourcentage: ClassementPourcentage;
  topTrois: ClassementItem[];
  utilisateursProche: ClassementItem[];
}

export interface ClassementGlobal {
  utilisateur: ClassementItem;
  commune: string;
  classementLocal: Classement;
  classementNational: Classement;
}

export class RecupererClassementUsecase {
  constructor(private readonly classementRepository: ClassementRepository) {}

  async execute(utilisateurId: string, presenter: ClassementPresenter): Promise<void> {
    const classement = await this.classementRepository.recupererClassementNational(utilisateurId);
    presenter.presente(classement);
  }
}
