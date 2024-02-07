import { BibliothequePresenter, BibliothequeViewModel } from '@/bibliotheque/ports/bibliotheque.presenter';
import { Bibliotheque } from '../ports/bibliotheque.repository';
import { buildUrl } from '@/shell/buildUrl';

export class BibliothequePresenterImpl implements BibliothequePresenter {
  constructor(private readonly bibliothequeViewModel: (viewModel: BibliothequeViewModel) => void) {}

  presente(bibliotheque: Bibliotheque): void {
    this.bibliothequeViewModel({
      articles: bibliotheque.ressources.map(ressource => ({
        titre: ressource.titre,
        thematique: ressource.thematique,
        description: ressource.description,
        url: `/article/${buildUrl(ressource.titre)}/${ressource.contentId}`,
        image: ressource.image,
        favoris: ressource.favoris,
      })),
      filtres: bibliotheque.filtresThematiques.map(filtre => ({
        id: filtre.id,
        label: filtre.label,
        checked: false,
      })),
    });
  }
}
