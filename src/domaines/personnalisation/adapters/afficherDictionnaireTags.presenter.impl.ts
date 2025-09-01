import { marked } from 'marked';
import {
  AfficherDictionnaireTagsPresenter,
  DictionnaireTagsViewModel,
} from '@/domaines/personnalisation/ports/afficherDictionnaireTagsPresenter';
import { DefinitionTag } from '@/domaines/personnalisation/ports/personnalisation.repository';
import { RouteActionsName } from '@/router/actions/routes';
import { nettoyerEtGarderContenuTextuel } from '@/shell/nettoyerEtGarderContenuTextuel';

export class AfficherDictionnaireTagsPresenterImpl implements AfficherDictionnaireTagsPresenter {
  constructor(private dictionnaireTagsViewModel: (dictionnaireTagsViewModel: DictionnaireTagsViewModel) => void) {}

  presente(definitionTags: DefinitionTag[]) {
    this.dictionnaireTagsViewModel({
      definitionTags: definitionTags.map(tag => ({
        code: tag.code,
        labelRecommandation: tag.labelRecommandation,
        descriptionInterne: tag.descriptionInterne,
        indicationUser: `<span class="text--bold">${tag.nombreUserAvecTag}</span> usagers concernés (<span class="text--bold">${tag.pourcentageUserAvecTag} %</span>)`,
        type: {
          user_kyc: { titre: 'UTILISATEUR (KYC)', classColor: 'fr-badge--yellow-tournesol' },
          user_computed: { titre: 'UTILISATEUR (CALCULÉ)', classColor: 'fr-badge--orange-terre-battue' },
          editorial: { titre: 'ÉDITORIAL', classColor: 'fr-badge--green-bourgeon' },
        }[tag.type],
        kycCreationTag: tag.kycCreationTag.map(creation => ({
          idCms: creation.idCms,
          code: creation.code,
          question: creation.question,
        })),
        actionsIncluantes: tag.actionsIncluantes.map(action => ({
          routerLinkTo: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: {
              titre: nettoyerEtGarderContenuTextuel(action.titre),
              type: action.type,
              id: action.code,
            },
          },
          titre: marked.parseInline(action.titre) as string,
        })),
        actionsExcluantes: tag.actionsExcluantes.map(action => ({
          routerLinkTo: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: {
              titre: nettoyerEtGarderContenuTextuel(action.titre),
              type: action.type,
              id: action.code,
            },
          },
          titre: marked.parseInline(action.titre) as string,
        })),
        warnings: [
          tag.warnings.estCmsDeclarationManquante ? 'Tag inconnu du CMS' : null,
          tag.warnings.estBackendDeclarationManquante ? 'Tag inconnu du back-end' : null,
          tag.warnings.estActivationFonctionnelleAbsente ? 'Aucune KYC / traitement pour affecter ce tag' : null,
        ].filter((warning): warning is string => warning !== null),
      })),
    });
  }
}
