import { ActionAideViewModel } from '@/domaines/actions/ports/action.presenter';
import { Aide, Aides } from '@/domaines/aides/chargementAides.usecase';
import {
  AidesAvecCouvertureViewModel,
  AidesViewModel,
  ChargementAidesPresenter,
} from '@/domaines/aides/ports/chargementAides.presenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagThematique } from '@/domaines/thematiques/TagThematique';
import { buildUrl } from '@/shell/buildUrl';
import { MontantAfficheEnFRBuilder } from '@/shell/nombreAfficheEnFRBuilder';

export class ChargementAidesPresenterImpl implements ChargementAidesPresenter {
  constructor(private _viewModel: (vm: AidesAvecCouvertureViewModel) => void) {}

  presente(aides: Aides): void {
    const viewModel = this.groupeParCategorie(aides.aides);

    this._viewModel({
      utilisateurEstCouvert: aides.utilisateurEstCouvert,
      aides: viewModel,
    });
  }

  private groupeParCategorie = (aides: Aide[]): AidesViewModel => {
    const map: AidesViewModel = {};

    aides.forEach(aide => {
      const thematiqueLabel = `${TagThematique.getTagThematiqueUtilitaire(aide.thematique).emoji} ${MenuThematiques.getThematiqueData(aide.thematique).labelDansLeMenu}`;

      if (!map[thematiqueLabel]) {
        map[thematiqueLabel] = [];
      }

      const aideToPush: ActionAideViewModel = {
        titre: aide.titre,
        titreUrl: buildUrl(aide.titre),
        id: aide.id,
        partenaireNom: aide.partenaire?.nom ?? '',
        partenaireImg: aide.partenaire?.logoUrl,
        montantMaximum: aide.montantMaximum ? MontantAfficheEnFRBuilder.build(aide.montantMaximum) : undefined,
        estGratuit: aide.estGratuit,
      };

      map[thematiqueLabel].push(aideToPush);
    });

    return map;
  };
}
