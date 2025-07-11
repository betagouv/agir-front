import { ActionsPresenter, ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { Action, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { RouteActionsName } from '@/router/actions/routes';
import marked from '@/shell/actionMarkdownToHtml';
import { buildUrl } from '@/shell/buildUrl';
import cacherEmojisAuxLecteursDecrans from '@/shell/cacherEmojisAuxLecteursDecrans';
import { gererPluriel } from '@/shell/pluriel';

export class ActionsPresenterImpl implements ActionsPresenter {
  constructor(private readonly viewModel: (viewModel: ActionViewModel[]) => void) {}

  async presente(actions: Action[]): Promise<void> {
    const vm: ActionViewModel[] = await Promise.all(
      actions.map(async (action): Promise<ActionViewModel> => {
        const labelCompteur = await marked.parseInline(action.labelCompteur);
        const phraseNombreParticipantsParDefaut = `<span class="text--bold">${action.nombreDePersonnes}</span> actions réalisées`;
        const nombreDeParticipants =
          action.nombreDePersonnes > 1
            ? labelCompteur
              ? labelCompteur
              : phraseNombreParticipantsParDefaut
            : undefined;

        const aidesDisponibles =
          action.nombreAidesDisponibles === 0
            ? undefined
            : gererPluriel(
                action.nombreAidesDisponibles,
                `<span aria-hidden="true">💰</span><span class="text--bold">${action.nombreAidesDisponibles}</span> aide disponible`,
                `<span aria-hidden="true">💰</span><span class="text--bold">${action.nombreAidesDisponibles}</span> aides disponibles`,
              );

        const badges: { text: string; color: string }[] = [];
        if (aidesDisponibles) {
          badges.push({
            text: aidesDisponibles,
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

        let label: { text: string; color: string } | undefined = undefined;
        if (action.explicationsRecommandations.estRecommandee()) {
          label = { text: 'Recommandée pour moi', color: 'background-bleu-light text--bleu' };
        }
        if (action.dejaVue) {
          label = { text: 'Déjà consultée', color: '' };
        }
        if (action.dejaFaite) {
          label = { text: 'Réalisée', color: 'fr-label--vert' };
        }

        const titre = await marked.parseInline(action.titre);
        const emoji = action.emoji ? `${cacherEmojisAuxLecteursDecrans(action.emoji)} ` : '';
        return {
          code: action.code,
          titre: `${emoji}${titre}`,
          url: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: { id: action.code, titre: buildUrl(action.titre), type: action.type },
          },
          nombreDeParticipants,
          badges,
          label,
          aidesDisponibles,
        };
      }),
    );

    this.viewModel(vm);
  }
}
