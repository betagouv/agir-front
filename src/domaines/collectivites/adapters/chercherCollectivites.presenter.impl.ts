import {
  ChercherCollectivitesPresenter,
  RechercheDeCollectiviteViewModel,
} from '@/domaines/collectivites/ports/chercherCollectivites.presenter';
import { Collectivites } from '@/domaines/collectivites/ports/collectivite.repository';

export class ChercherCollectivitesPresenterImpl implements ChercherCollectivitesPresenter {
  constructor(private _viewModel: (vm: RechercheDeCollectiviteViewModel) => void) {}

  presente(collectivites: Collectivites, recherche: string): void {
    const listeDeCollectivites: Collectivites = collectivites.trierParNom(recherche);

    const message = this.deduireMessage(listeDeCollectivites, recherche);

    this._viewModel({ listeDeCollectivites: collectivites.getCollectivites(), message });
  }

  private deduireMessage(collectivites: Collectivites, recherche: string) {
    if (collectivites.aucuneCollectiviteTrouvee()) {
      return `Il semble qu'aucune collectivité n'ait été trouvé dans notre base de données avec le nom <i>"${recherche}"</i>. Si vous pensez que c'est une erreur, vous pouvez contacter <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
    }

    if (collectivites.limiteAtteinte()) {
      return `La recherche <i>"${recherche}"</i> émet beaucoup de résultats. Veuillez préciser votre recherche pour des résultats plus cohérents.`;
    }

    return `Vous ne parvenez pas à trouver votre collectivité ? Vous pouvez nous contacter à l'adresse <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
  }
}
