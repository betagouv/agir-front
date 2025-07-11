import { ActionsPresenter, ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';
import { RouteActionsName } from '@/router/actions/routes';
import marked from '@/shell/actionMarkdownToHtml';
import { buildUrl } from '@/shell/buildUrl';
import cacherEmojisAuxLecteursDecrans from '@/shell/cacherEmojisAuxLecteursDecrans';
import { gererPluriel } from '@/shell/pluriel';

export class ActionsPresenterImpl implements ActionsPresenter {
  constructor(private readonly viewModel: (viewModel: ActionViewModel[]) => void) {}

  async presente(actions: Action[]): Promise<void> {
    const vm: ActionViewModel[] = await Promise.all(
      actions.map(async action => {
        const nombreDePersonnes =
          action.nombreDePersonnes === 0
            ? undefined
            : gererPluriel(
                action.nombreDePersonnes,
                `<span class="text--bold">${action.nombreDePersonnes}</span> action réalisée`,
                `<span class="text--bold">${action.nombreDePersonnes}</span> actions réalisées`,
              );

        const aidesDisponibles =
          action.nombreAidesDisponibles === 0
            ? undefined
            : gererPluriel(
                action.nombreAidesDisponibles,
                `<span class="text--bold">${action.nombreAidesDisponibles}</span> aide disponible`,
                `<span class="text--bold">${action.nombreAidesDisponibles}</span> aides disponibles`,
              );

        const titre = await marked.parseInline(action.titre);
        const emoji = action.emoji ? `${cacherEmojisAuxLecteursDecrans(action.emoji)} ` : '';
        return {
          code: action.code,
          titre: `${emoji}${titre}`,
          dejaVue: action.dejaVue,
          url: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: { id: action.code, titre: buildUrl(action.titre), type: action.type },
          },
          nombreDePersonnes,
          aidesDisponibles,
        };
      }),
    );

    this.viewModel(vm);
  }
}
