import {
  ChercherCollectivitesPresenter,
  RechercheDeCollectiviteViewModel,
} from '@/domaines/collectivites/ports/chercherCollectivites.presenter';
import { Collectivites } from '@/domaines/collectivites/ports/collectivite.repository';

const LIMITE_COLLECTIVITES = 40;

export class ChercherCollectivitesPresenterImpl implements ChercherCollectivitesPresenter {
  constructor(private _viewModel: (vm: RechercheDeCollectiviteViewModel) => void) {}

  presente(collectivites: Collectivites, recherche: string): void {
    let listeDeCollectivites: Collectivites = this.trier(collectivites, recherche);
    listeDeCollectivites = this.limiter(listeDeCollectivites);

    const message = this.deduireMessage(listeDeCollectivites.length, recherche);

    this._viewModel({ listeDeCollectivites: listeDeCollectivites, message });
  }

  private trier(collectivites: Collectivites, reference: string): Collectivites {
    reference = reference.toLowerCase();
    return collectivites.sort((a, b) => {
      const nomA = a.nom.toLowerCase();
      const nomB = b.nom.toLowerCase();

      if (nomA === reference && nomB !== reference) return -1;
      if (nomB === reference && nomA !== reference) return 1;

      const startsWithA = nomA.startsWith(reference);
      const startsWithB = nomB.startsWith(reference);
      if (startsWithA && !startsWithB) return -1;
      if (startsWithB && !startsWithA) return 1;

      return nomA.localeCompare(nomB);
    });
  }

  private limiter(collectivites: Collectivites): Collectivites {
    return collectivites.slice(0, LIMITE_COLLECTIVITES);
  }

  private deduireMessage(nombreDeCollectivites: number, recherche: string) {
    if (nombreDeCollectivites === 0) {
      return `Il semble qu'aucune collectivité n'ait été trouvé dans notre base de données avec le nom <i>"${recherche}"</i>. Si vous pensez que c'est une erreur, vous pouvez contacter <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
    } else if (nombreDeCollectivites === LIMITE_COLLECTIVITES) {
      return `La recherche <i>"${recherche}"</i> émet beaucoup de résultats. Veuillez préciser votre recherche pour des résultats plus cohérents.`;
    }
    return `Vous ne parvenez pas à trouver votre collectivité ? Vous pouvez nous contacter à l'adresse <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`;
  }
}
