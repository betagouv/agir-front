import { Interaction, InteractionType } from '@/interactions/chargerInteractions.usecase';
import { InteractionsPresenter } from '@/interactions/ports/interactionsPresenter';

export interface InteractionViewModel {
  id: string;
  titre: string;
  sousTitre: string;
  categorie: string;
  nombreDePointsAGagner: string;
  miseEnAvant: string;
  type: string;
  illustrationURL: string;
  url: string;
  isUrlExterne: boolean;
  duree: string;
  estBloquee: boolean;
  idDuContenu: string;
}
export class InteractionsPresenterImpl implements InteractionsPresenter {
  private _viewModels: (interactionViewModels: InteractionViewModel[]) => void;
  constructor(viewModels: (interactionViewModels: InteractionViewModel[]) => void) {
    this._viewModels = viewModels;
  }

  presente(interactions: Interaction[]) {
    const typeInverseMapping: { [key in InteractionType]: string } = {
      [InteractionType.KYC]: 'KYC',
      [InteractionType.QUIZ]: 'QUIZ',
      [InteractionType.ARTICLE]: 'ARTICLE',
      [InteractionType.SUIVIDUJOUR]: 'SUIVI',
    };

    const interactionNonFaites = interactions
      .filter(i => {
        return !i.aEteFaite;
      })
      .map(interaction => {
        return {
          id: interaction.id,
          titre: interaction.titre,
          sousTitre: interaction.sousTitre,
          categorie: interaction.categorie,
          nombreDePointsAGagner: interaction.nombreDePointsAGagner,
          miseEnAvant: interaction.miseEnAvant,
          type: typeInverseMapping[interaction.type],
          illustrationURL: interaction.illustrationURL,
          url: this.determineUrl(interaction),
          isUrlExterne: false,
          duree: interaction.duree,
          estBloquee: interaction.estBloquee,
          idDuContenu: interaction.idDuContenu,
        };
      });
    this._viewModels(interactionNonFaites);
  }

  private determineUrl(interaction: Interaction) {
    switch (interaction.type) {
      case InteractionType.QUIZ:
        return `/coach/quiz/${interaction.idDuContenu}`;
      case InteractionType.ARTICLE:
        return `/article/${interaction.titre}`;
      case InteractionType.KYC:
        return '';
      case InteractionType.SUIVIDUJOUR:
        return '/coach/suivi-du-jour';
    }
  }
}
