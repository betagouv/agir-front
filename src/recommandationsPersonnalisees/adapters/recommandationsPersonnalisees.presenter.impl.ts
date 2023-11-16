import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { InteractionType } from '@/interactions/chargerInteractions.usecase';
import { RecommandationsPersonnaliseesPresenter } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';

export interface RecommandationPersonnaliseeViewModel {
  recommandationHighlight: {
    titre: string;
    image: string;
    description: string;
    url: string;
    contentId: string;
  };
  recommandationsList: {
    thematique: string;
    titre: string;
    image: string;
    url: string;
    contentId: string;
  }[];
}

export class RecommandationsPersonnaliseesPresenterImpl implements RecommandationsPersonnaliseesPresenter {
  constructor(
    private viewModel: (recommandationPersonnaliseeViewModels: RecommandationPersonnaliseeViewModel) => void
  ) {}
  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void {
    const recommandationHighlight = recommandationsPersonnalisees.find(
      recommandationPersonnalisee => recommandationPersonnalisee.type === InteractionType.ARTICLE
    );

    if (recommandationHighlight) {
      this.viewModel({
        recommandationHighlight: {
          titre: recommandationHighlight.titre,
          image: recommandationHighlight.illustrationURL,
          description: recommandationHighlight.sousTitre,
          url: this.determineUrl(recommandationHighlight),
          contentId: recommandationHighlight.idDuContenu,
        },
        recommandationsList: recommandationsPersonnalisees
          .filter(reco => reco.id !== recommandationHighlight.id)
          .map(recommandationPersonnalisee => {
            return {
              thematique: recommandationPersonnalisee.categorie,
              titre: recommandationPersonnalisee.titre,
              image: recommandationPersonnalisee.illustrationURL,
              url: this.determineUrl(recommandationPersonnalisee),
              contentId: recommandationPersonnalisee.idDuContenu,
            };
          })
          .slice(0, 3),
      });
    }
  }

  private determineUrl(recommandationPersonnalisee: RecommandationPersonnalisee) {
    switch (recommandationPersonnalisee.type) {
      case InteractionType.QUIZ:
        return `/coach/quiz/${recommandationPersonnalisee.idDuContenu}`;
      case InteractionType.ARTICLE:
        return `/article/${recommandationPersonnalisee.titre}`;
      case InteractionType.KYC:
        return '';
      case InteractionType.SUIVIDUJOUR:
        return '/coach/suivi-du-jour';
    }
  }
}
