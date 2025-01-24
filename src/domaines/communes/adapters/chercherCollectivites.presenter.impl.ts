import {
  ChercherCollectivitesPresenter,
  RechercheDeCollectiviteViewModel,
} from '@/domaines/communes/ports/chercherCollectivites.presenter';
import { Collectivites } from '@/domaines/communes/ports/communeRepository';

const LIMITE_COMMUNES = 40;

export class ChercherCollectivitesPresenterImpl implements ChercherCollectivitesPresenter {
  constructor(
    private _communeRecherche: string,
    private _viewModel: (vm: RechercheDeCollectiviteViewModel) => void,
  ) {}

  presente(communes: Collectivites): void {
    let listeDeCommunes: Collectivites = this.trier(communes);
    listeDeCommunes = this.limiter(listeDeCommunes);

    const message = this.deduireMessage(listeDeCommunes.length);

    this._viewModel({ listeDeCollectivites: listeDeCommunes, message });
  }

  private trier(communes: Collectivites): Collectivites {
    return communes.sort((a, b) => {
      const nomA = a.nom.toLowerCase();
      const nomB = b.nom.toLowerCase();
      const recherche = this._communeRecherche.toLowerCase();

      if (nomA === recherche && nomB !== recherche) return -1;
      if (nomB === recherche && nomA !== recherche) return 1;

      const startsWithA = nomA.startsWith(recherche);
      const startsWithB = nomB.startsWith(recherche);
      if (startsWithA && !startsWithB) return -1;
      if (startsWithB && !startsWithA) return 1;

      return nomA.localeCompare(nomB);
    });
  }

  private limiter(communes: Collectivites): Collectivites {
    return communes.slice(0, LIMITE_COMMUNES);
  }

  private deduireMessage(nombreDeCommunes: number) {
    if (nombreDeCommunes === 0) {
      return `Il semble qu'aucune collectivité n'ait été trouvé dans notre base de données avec le nom <i>"${this._communeRecherche}"</i>. Si vous pensez que c'est une erreur, vous pouvez contacter <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
    } else if (nombreDeCommunes === LIMITE_COMMUNES) {
      return `La recherche <i>"${this._communeRecherche}"</i> émet beaucoup de résultats. Veuillez préciser votre recherche pour des résultats plus cohérents.`;
    }
    return `Vous ne parvenez pas à trouver votre collectivité ? Vous pouvez nous contacter à l'adresse <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
  }
}
