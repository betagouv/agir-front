import { ClassementPresenter } from '@/domaines/classement/ports/classement.presenter';
import { ClassementRepository } from '@/domaines/classement/ports/classement.repository';

// enum PourcentageClassement {
//   pourcent_5 = 'pourcent_5',
//   pourcent_10 = 'pourcent_10',
//   pourcent_25 = 'pourcent_25',
//   pourcent_50 = 'pourcent_50',
// }

interface ClassementItem {
  points: number;
  rank: number;
  prenom: string;
}

export interface Classement {
  utilisateur: ClassementItem;
  pourcentage: string;
  topTrois: ClassementItem[];
  utilisateursProche: ClassementItem[];
}

export class RecupererClassementNationalUsecase {
  constructor(private readonly classementRepository: ClassementRepository) {}

  async execute(utilisateurId: string, presenter: ClassementPresenter): Promise<void> {
    const classement = await this.classementRepository.recupererClassementNational(utilisateurId);
    presenter.presente(classement);
  }
}
