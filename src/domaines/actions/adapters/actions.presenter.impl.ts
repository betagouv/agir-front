import { ActionsPresenter, ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { Action, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagThematique } from '@/domaines/thematiques/TagThematique';
import { RouteActionsName } from '@/router/actions/routes';
import marked from '@/shell/actionMarkdownToHtml';
import { buildUrl } from '@/shell/buildUrl';
import cacherEmojisAuxLecteursDecrans from '@/shell/cacherEmojisAuxLecteursDecrans';
import { MontantAfficheEnFRBuilder } from '@/shell/nombreAfficheEnFRBuilder';
import { gererPluriel } from '@/shell/pluriel';

export class ActionsPresenterImpl implements ActionsPresenter {
  constructor(private readonly viewModel: (viewModel: ActionViewModel[]) => void) {}

  async presente(actions: Action[]): Promise<void> {
    const vm: ActionViewModel[] = await Promise.all(
      actions.map(async (action): Promise<ActionViewModel> => {
        const titre = await this.formaterTitre(action);
        const nombreDeParticipants = await this.formaterNombreParticipants(action);
        const aidesDisponibles = this.formaterAidesDisponibles(action);
        const badges = this.creerBadges(action, aidesDisponibles);
        const label = this.determinerLabel(action);

        return {
          code: action.code,
          titre,
          url: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: { id: action.code, titre: buildUrl(action.titre), type: action.type },
          },
          nombreDeParticipants,
          badges,
          label,
          aidesDisponibles,
          thematiqueTag: {
            label: MenuThematiques.getThematiqueData(action.thematique).labelDansLeMenu,
            style: TagThematique.getTagThematiqueUtilitaire(action.thematique),
          },
        };
      }),
    );

    this.viewModel(vm);
  }

  private async formaterTitre(action: Action): Promise<string> {
    const titreFormate = await marked.parseInline(action.titre);
    const emoji = action.emoji ? `${cacherEmojisAuxLecteursDecrans(action.emoji)} ` : '';
    return `${emoji}${titreFormate}`;
  }

  private async formaterNombreParticipants(action: Action): Promise<string | undefined> {
    if (action.nombreDePersonnes <= 1) return undefined;
    if (action.labelCompteur) return marked.parseInline(action.labelCompteur);
    return `<span class="text--bold">${action.nombreDePersonnes}</span> actions réalisées`;
  }

  private formaterAidesDisponibles(action: Action): string | undefined {
    if (action.nombreAidesDisponibles === 0) return undefined;

    return gererPluriel(
      action.nombreAidesDisponibles,
      `<span class="text--bold">${action.nombreAidesDisponibles}</span> aide`,
      `<span class="text--bold">${action.nombreAidesDisponibles}</span> aides`,
    );
  }

  private creerBadges(action: Action, aidesDisponibles: string | undefined): { text: string; color: string }[] {
    const badges: { text: string; color: string }[] = [];

    if (aidesDisponibles) {
      badges.push({
        text: `<span aria-hidden="true">💰</span> ${aidesDisponibles}`,
        color: 'background--vert-badge text--white',
      });
    }

    if (action.type === TypeAction.SIMULATEUR) {
      badges.push({
        text: 'SIMULATEUR',
        color: 'background-bleu-light text--bleu',
      });
    }

    if (action.type === TypeAction.QUIZZ) {
      badges.push({
        text: 'QUIZ',
        color: 'background-bleu-light text--bleu',
      });
    }

    if (action.type === TypeAction.BILAN) {
      badges.push({
        text: 'BILAN',
        color: 'background-bleu-light text--bleu',
      });
    }

    if (action.montantMaxEconomiesEnEuros > 0) {
      const montantMaxEconomiesEnEuros = MontantAfficheEnFRBuilder.build(action.montantMaxEconomiesEnEuros);
      badges.push({
        text: `<span aria-hidden="true">💶</span> ${montantMaxEconomiesEnEuros} d'économies`,
        color: 'prix-highlight',
      });
    }

    return badges;
  }

  private determinerLabel(action: Action): { text: string; color: string } | undefined {
    if (action.dejaFaite) {
      return { text: 'Réalisée', color: 'fr-label--vert' };
    }

    if (action.explicationsRecommandations.estRecommandee()) {
      return { text: 'Recommandé', color: 'background-bleu-light text--bleu' };
    }

    return undefined;
  }
}
