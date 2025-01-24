import {
  ChercherCollectivitesPresenter,
  RechercheDeCollectiviteViewModel,
} from '@/domaines/collectivites/ports/chercherCollectivites.presenter';
import { Collectivites } from '@/domaines/collectivites/ports/collectivite.repository';

const LIMITE_COLLECTIVITES = 40;

export class ChercherCollectivitesPresenterImpl implements ChercherCollectivitesPresenter {
  constructor(
    private _collectiviteRecherche: string,
    private _viewModel: (vm: RechercheDeCollectiviteViewModel) => void,
  ) {}

  presente(collectivites: Collectivites): void {
    let listeDeCollectivites: Collectivites = this.trier(collectivites);
    listeDeCollectivites = this.limiter(listeDeCollectivites);

    const message = this.deduireMessage(listeDeCollectivites.length);

    this._viewModel({ listeDeCollectivites: listeDeCollectivites, message });
  }

  private trier(collectivites: Collectivites): Collectivites {
    return collectivites.sort((a, b) => {
      const nomA = a.nom.toLowerCase();
      const nomB = b.nom.toLowerCase();
      const recherche = this._collectiviteRecherche.toLowerCase();

      if (nomA === recherche && nomB !== recherche) return -1;
      if (nomB === recherche && nomA !== recherche) return 1;

      const startsWithA = nomA.startsWith(recherche);
      const startsWithB = nomB.startsWith(recherche);
      if (startsWithA && !startsWithB) return -1;
      if (startsWithB && !startsWithA) return 1;

      return nomA.localeCompare(nomB);
    });
  }

  private limiter(collectivites: Collectivites): Collectivites {
    return collectivites.slice(0, LIMITE_COLLECTIVITES);
  }

  private deduireMessage(nombreDeCollectivites: number) {
    if (nombreDeCollectivites === 0) {
      return `Il semble qu'aucune collectivité n'ait été trouvé dans notre base de données avec le nom <i>"${this._collectiviteRecherche}"</i>. Si vous pensez que c'est une erreur, vous pouvez contacter <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
    } else if (nombreDeCollectivites === LIMITE_COLLECTIVITES) {
      return `La recherche <i>"${this._collectiviteRecherche}"</i> émet beaucoup de résultats. Veuillez préciser votre recherche pour des résultats plus cohérents.`;
    }
    return `Vous ne parvenez pas à trouver votre collectivité ? Vous pouvez nous contacter à l'adresse <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
  }
}
