import { InteractionType } from '@/interactions/chargerInteractions.usecase';
import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationsPersonnaliseesPresenter } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';

export interface RecommandationPersonnalisee {
  id: string;
  type: InteractionType;
  titre: string;
  sousTitre: string;
  categorie: string;
  nombreDePointsAGagner: string;
  miseEnAvant: string;
  illustrationURL: string;
  url: string;
  aEteFaite: boolean;
  idDuContenu: string;
  duree: string;
  estBloquee: boolean;
}

export class RecommandationsPersonnaliseesUsecase {
  constructor(private recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository) {}

  async execute(idUtilisateur: string, presenter: RecommandationsPersonnaliseesPresenter): Promise<void> {
    const recommandationsPersonnalisees =
      await this.recommandationsPersonnaliseesRepository.chargerRecommandationsPersonnalisees(idUtilisateur);
    presenter.presente(recommandationsPersonnalisees);
  }
}
