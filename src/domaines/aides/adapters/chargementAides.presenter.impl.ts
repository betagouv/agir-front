import { Aide, Aides } from '@/domaines/aides/chargementAides.usecase';
import {
  AidesAvecCouvertureViewModel,
  AidesViewModel,
  AideViewModel,
  ChargementAidesPresenter,
} from '@/domaines/aides/ports/chargementAides.presenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagThematique } from '@/domaines/thematiques/TagThematique';

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

      const aideToPush: AideViewModel = {
        id: aide.id,
        titre: aide.titre,
        thematiqueLabel: thematiqueLabel,
        contenu: aide.contenu,
        isSimulateur: aide.isSimulateur,
        url: aide.url,
        montantMaximum: aide.montantMaximum ? this.formatMontantMaximum(aide.montantMaximum) : undefined,
        thematiqueTag: {
          label: MenuThematiques.getThematiqueData(aide.thematique).labelDansLeMenu,
          style: TagThematique.getTagThematiqueUtilitaire(aide.thematique),
        },
        urlCommencerVotreDemarche: aide.urlCommencerVotreDemarche,
        estGratuit: aide.estGratuit,
        partenaire: aide.partenaire
          ? {
              logoUrl: aide.partenaire.logoUrl,
              accessibilite: `proposé par ${aide.partenaire.nom}`,
            }
          : undefined,
      };

      map[thematiqueLabel].push(aideToPush);
    });

    return map;
  };

  private formatMontantMaximum(montantMaximum: number) {
    return `Jusqu'à ${new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumSignificantDigits: 4,
    }).format(montantMaximum)}`;
  }
}
